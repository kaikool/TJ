
export type Side = 'LONG'|'SHORT'
export function calcPnL(side: Side, entry: number, close: number, size: number) {
  return side === 'LONG' ? (close - entry) * size : (entry - close) * size
}
export function suggestSize(equity: number, riskPercent: number, entry: number, stop: number) {
  const risk = equity * riskPercent
  const perUnitLoss = Math.abs(entry - stop)
  return perUnitLoss > 0 ? risk / perUnitLoss : 0
}
