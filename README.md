
# Trading Journal (Firebase Spark)

## Dev
pnpm i
pnpm dev

## Build & Deploy
pnpm build
firebase deploy

## Notes
- Uses Firestore realtime listeners for trades.
- "Capture chart" calls the provided endpoint and stores raw JSON under trade.capture (last + history).
- Theme preserved via CSS variables and data-theme attribute.
