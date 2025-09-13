
import { useEffect, useMemo, useState } from 'react'
import { auth, db, googleProvider } from './firebase'
import { signInWithPopup, onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'

export function useAuthState() {
  const [user, setUser] = useState<import('firebase/auth').User | null>(null)
  useEffect(() => onAuthStateChanged(auth, setUser), [])
  return {
    user,
    async signInGoogle(){ await signInWithPopup(auth, googleProvider) },
    async signOut(){ await fbSignOut(auth) }
  }
}

export function useUserTrades(uid?: string) {
  const [docs, setDocs] = useState<any[]>([])
  const q = useMemo(() => uid ? query(
    collection(db, 'trades'),
    where('ownerId','==', uid),
    where('deletedAt','==', null),
    orderBy('openedAt','desc')
  ) : null, [uid])

  useEffect(() => {
    if(!q) return
    return onSnapshot(q, snap => setDocs(snap.docs.map(d=> ({ id: d.id, ...d.data() }))))
  },[q])

  return docs
}
