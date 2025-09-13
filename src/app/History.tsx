
import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { useAuthState } from '@/lib/hooks'
import Papa from 'papaparse'

export default function HistoryPage(){
  const { user } = useAuthState()
  const [rows,setRows] = useState<any[]>([])
  const q = useMemo(()=> query(
    collection(db,'trades'),
    where('ownerId','==', user!.uid),
    where('status','==','closed'),
    orderBy('openedAt','desc')
  ), [user])

  useEffect(()=> onSnapshot(q, s=> setRows(s.docs.map(d=>({ id:d.id, ...d.data()})))), [q])

  function exportCSV(){
    const csv = Papa.unparse(rows)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'history.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Closed Trades</h2>
        <button className="btn" onClick={exportCSV}>Export CSV</button>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-muted">
            <tr><th className="p-2 text-left">Symbol</th><th className="p-2 text-left">Side</th><th className="p-2 text-right">Entry</th><th className="p-2 text-right">Close</th><th className="p-2 text-right">Size</th><th className="p-2 text-right">PnL</th></tr>
          </thead>
          <tbody>
            {rows.map(r=> (
              <tr key={r.id} className="border-t border-border">
                <td className="p-2">{r.symbol}</td>
                <td className="p-2">{r.side}</td>
                <td className="p-2 text-right">{r.entryPrice}</td>
                <td className="p-2 text-right">{r.closePrice}</td>
                <td className="p-2 text-right">{r.size}</td>
                <td className="p-2 text-right">{r.realizedPnL}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
