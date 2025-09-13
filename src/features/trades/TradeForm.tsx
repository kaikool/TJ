
import { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function TradeForm({ ownerId }: { ownerId: string }){
  const [symbol, setSymbol] = useState('XAUUSD')
  const [side, setSide] = useState<'LONG'|'SHORT'>('LONG')
  const [size, setSize] = useState(1)
  const [entry, setEntry] = useState<number>(0)
  const [sl, setSl] = useState<number | undefined>()
  const [tp, setTp] = useState<number | undefined>()
  const [notes, setNotes] = useState('')

  async function submit(e: React.FormEvent){
    e.preventDefault()
    await addDoc(collection(db,'trades'),{
      ownerId,
      symbol,
      side,
      size: Number(size),
      entryPrice: Number(entry),
      stopLoss: sl ? Number(sl) : null,
      takeProfit: tp ? Number(tp) : null,
      status: 'open',
      openedAt: serverTimestamp(),
      deletedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    setNotes('');
  }

  return (
    <form onSubmit={submit} className="card grid md:grid-cols-3 gap-3">
      <div>
        <label className="label">Symbol</label>
        <input className="input" value={symbol} onChange={e=>setSymbol(e.target.value.toUpperCase())} />
      </div>
      <div>
        <label className="label">Side</label>
        <select className="input" value={side} onChange={e=>setSide(e.target.value as any)}>
          <option>LONG</option>
          <option>SHORT</option>
        </select>
      </div>
      <div>
        <label className="label">Size</label>
        <input type="number" className="input" value={size} onChange={e=>setSize(+e.target.value)} />
      </div>
      <div>
        <label className="label">Entry</label>
        <input type="number" className="input" value={entry} onChange={e=>setEntry(+e.target.value)} />
      </div>
      <div>
        <label className="label">Stop Loss</label>
        <input type="number" className="input" value={sl ?? ''} onChange={e=>setSl(e.target.value? +e.target.value: undefined)} />
      </div>
      <div>
        <label className="label">Take Profit</label>
        <input type="number" className="input" value={tp ?? ''} onChange={e=>setTp(e.target.value? +e.target.value: undefined)} />
      </div>
      <div className="md:col-span-3">
        <label className="label">Notes</label>
        <textarea className="input min-h-[80px]" value={notes} onChange={e=>setNotes(e.target.value)} />
      </div>
      <div className="md:col-span-3 flex gap-2">
        <button className="btn btn-primary" type="submit">Add Trade</button>
      </div>
    </form>
  )
}
