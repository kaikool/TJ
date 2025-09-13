
import { useAuthState, useUserTrades } from '@/lib/hooks'
import TradeForm from '@/features/trades/TradeForm'
import TradeList from '@/features/trades/TradeList'

export default function Dashboard(){
  const { user } = useAuthState()
  const trades = useUserTrades(user!.uid)

  const openCount = trades.filter((t:any)=>t.status==='open').length

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div className="card"><div className="text-muted">Open Trades</div><div className="text-2xl font-semibold">{openCount}</div></div>
        <div className="card"><div className="text-muted">Winrate 30d</div><div className="text-2xl font-semibold">—</div></div>
        <div className="card"><div className="text-muted">PnL (Month)</div><div className="text-2xl font-semibold">—</div></div>
      </div>
      <TradeForm ownerId={user!.uid} />
      <TradeList ownerId={user!.uid} />
    </div>
  )
}
