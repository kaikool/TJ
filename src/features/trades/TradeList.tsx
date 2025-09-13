
import { collection, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc, where, onSnapshot } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { db } from '@/lib/firebase'
import { calcPnL } from '@/lib/utils'
import { captureChart } from '@/services/capture'

export default function TradeList({ ownerId }: { ownerId: string }){
  const [rows, setRows] = useState<any[]>([])
  const q = useMemo(() => query(
    collection(db,'trades'),
    where('ownerId','==', ownerId),
    where('deletedAt','==', null),
    orderBy('openedAt','desc')
  ), [ownerId])

  useEffect(()=> onSnapshot(q, s=> setRows(s.docs.map(d=>({ id:d.id, ...d.data()})))), [q])

  async function closeTrade(r:any){
    const closePriceStr = prompt('Close price?', String(r.entryPrice))
    if(!closePriceStr) return
    const closePrice = Number(closePriceStr)
    if(Number.isNaN(closePrice)) return
    const realized = calcPnL(r.side, r.entryPrice, closePrice, r.size)
    await updateDoc(doc(db,'trades', r.id),{
      status: 'closed',
      closePrice,
      realizedPnL: realized,
      closedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  }

  async function softDelete(id:string){
    await updateDoc(doc(db,'trades', id),{ deletedAt: serverTimestamp(), updatedAt: serverTimestamp() })
  }

  async function hardDelete(id:string){
    await deleteDoc(doc(db,'trades', id))
  }

  async function doCapture(r:any){
    const payload = await captureChart()
    await updateDoc(doc(db,'trades', r.id),{
      capture: {
        last: payload,
        history: (r.capture?.history ?? []).concat({ createdAt: serverTimestamp(), raw: payload })
      },
      updatedAt: serverTimestamp()
    } as any)
  }

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted">
          <tr>
            <th className="text-left p-2">Symbol</th>
            <th className="text-left p-2">Side</th>
            <th className="text-right p-2">Entry</th>
            <th className="text-right p-2">Size</th>
            <th className="text-right p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r=> (
            <tr key={r.id} className="border-t border-border">
              <td className="p-2">{r.symbol}</td>
              <td className="p-2">{r.side}</td>
              <td className="p-2 text-right">{r.entryPrice}</td>
              <td className="p-2 text-right">{r.size}</td>
              <td className="p-2 text-right">{r.status}</td>
              <td className="p-2 flex gap-2 justify-end">
                {r.status==='open' && <button className="btn" onClick={()=>closeTrade(r)}>Close</button>}
                <button className="btn" onClick={()=>doCapture(r)}>Capture</button>
                <button className="btn" onClick={()=>softDelete(r.id)}>Delete</button>
                <button className="btn btn-danger" onClick={()=>hardDelete(r.id)}>Hard del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
