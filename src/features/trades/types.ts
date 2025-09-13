
import type { Timestamp } from 'firebase/firestore'
export type Trade = {
  id: string
  ownerId: string
  symbol: string
  side: 'LONG'|'SHORT'
  size: number
  entryPrice: number
  stopLoss?: number
  takeProfit?: number
  status: 'open'|'closed'
  openedAt: Timestamp
  closedAt?: Timestamp
  closePrice?: number
  realizedPnL?: number
  notes?: string
  deletedAt?: Timestamp | null
  capture?: { last?: any; history?: { createdAt: Timestamp; raw: any }[] }
  createdAt: Timestamp
  updatedAt: Timestamp
}
