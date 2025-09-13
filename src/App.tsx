
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Dashboard from '@/app/Dashboard'
import TradesPage from '@/app/Trades'
import HistoryPage from '@/app/History'
import BalancePage from '@/app/Balance'
import SettingsPage from '@/app/Settings'
import SignIn from '@/app/SignIn'
import { useAuthState } from '@/lib/hooks'

export default function App() {
  const { user, signOut } = useAuthState()

  if (!user) {
    return <SignIn />
  }

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto flex items-center gap-3 p-3">
          <Link to="/" className="font-semibold">Trading Journal</Link>
          <div className="ml-auto flex items-center gap-2">
            <Link className="btn" to="/trades">Trades</Link>
            <Link className="btn" to="/history">History</Link>
            <Link className="btn" to="/balance">Balance</Link>
            <Link className="btn" to="/settings">Settings</Link>
            <button className="btn" onClick={signOut}>Sign out</button>
          </div>
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades" element={<TradesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/balance" element={<BalancePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  )
}
