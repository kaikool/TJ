
export default function SettingsPage(){
  function toggleTheme(){
    const html = document.documentElement
    const current = html.getAttribute('data-theme') || 'dark'
    const next = current === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <div className="card space-y-3 max-w-lg">
      <h2 className="text-lg font-semibold">Settings</h2>
      <button className="btn" onClick={toggleTheme}>Toggle Dark/Light</button>
      <p className="text-muted">Timezone default: Asia/Bangkok (UTC+7).</p>
    </div>
  )
}
