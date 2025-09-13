
export type CaptureOptions = { method?: 'GET'|'POST', body?: any }

const ENDPOINT = 'https://tradingviewcapture-721483185057.asia-southeast1.run.app/'

export async function captureChart(options: CaptureOptions = {}) {
  const method = options.method ?? 'GET'
  const res = await fetch(ENDPOINT, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
    body: method === 'POST' ? JSON.stringify(options.body ?? {}) : undefined,
  })
  if(!res.ok) throw new Error(`Capture failed: ${res.status}`)
  return await res.json().catch(async () => ({ raw: 'non-json', text: await res.text() }))
}
