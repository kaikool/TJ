
import { useAuthState } from '@/lib/hooks'
import TradeForm from '@/features/trades/TradeForm'
import TradeList from '@/features/trades/TradeList'

export default function TradesPage(){
  const { user } = useAuthState()
  return (
    <div className="space-y-4">
      <TradeForm ownerId={user!.uid} />
      <TradeList ownerId={user!.uid} />
    </div>
  )
}
