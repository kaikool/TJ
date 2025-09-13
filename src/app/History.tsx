
import { useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import Papa from 'papaparse'

export default function HistoryPage(){
  const [rows,setRows] = useState<any[]>([])
  const q = useMemo(()=> query(
    collection(db,'trades'),
    where('status','==','closed'),
    orderBy('openedAt','desc')
  ), [])

  useEffect(()=> onSnapshot(q, s=> setRows(s.docs.map(d=>({ id:d.id, ...d.data()})))), [q])

  function exportCSV(){
    const csv = Papa.unparse(rows as any)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'history.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return <button onClick={exportCSV}>Export CSV</button>
}
