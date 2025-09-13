
import { addDoc, arrayUnion, collection, doc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuthState } from '@/lib/hooks'

export default function BalancePage(){
  const { user } = useAuthState()
  const [starting, setStarting] = useState<number>(1000)
  const [amount, setAmount] = useState<number>(0)
  const [type, setType] = useState<'deposit'|'withdraw'|'fee'|'adjust'>('deposit')
  const [sheetId, setSheetId] = useState<string | null>(null)

  useEffect(()=>{(async()=>{
    const q = query(collection(db,'balances'), where('ownerId','==', user!.uid))
    const s = await getDocs(q)
    if(s.empty){
      const ref = await addDoc(collection(db,'balances'),{ ownerId: user!.uid, startingBalance: starting, operations: [], createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
      setSheetId(ref.id)
    }else{
      setSheetId(s.docs[0].id)
    }
  })()}, [user])

  async function addOp(){
    if(!sheetId) return
    await updateDoc(doc(db,'balances', sheetId),{
      operations: arrayUnion({ id: crypto.randomUUID(), type, amount: Number(amount), at: serverTimestamp() }),
      updatedAt: serverTimestamp()
    } as any)
    setAmount(0)
  }

  return (
    <div className="space-y-3">
      <div className="card grid md:grid-cols-4 gap-3">
        <div>
          <label className="label">Type</label>
          <select className="input" value={type} onChange={e=>setType(e.target.value as any)}>
            <option>deposit</option>
            <option>withdraw</option>
            <option>fee</option>
            <option>adjust</option>
          </select>
        </div>
        <div>
          <label className="label">Amount</label>
          <input type="number" className="input" value={amount} onChange={e=>setAmount(+e.target.value)} />
        </div>
        <div className="flex items-end">
          <button className="btn btn-primary w-full" onClick={addOp}>Add Operation</button>
        </div>
      </div>
      <p className="text-muted">Equity is computed client‑side from startingBalance + operations + closed trades PnL (left minimal here to keep example concise).</p>
    </div>
  )
}
