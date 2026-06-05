# AI Auto Capture Voice Note Pricing Copy

## Summary
- Updated the marketing pricing page so AI Auto Capture is described as document and voice-note automation, not only document scanning.
- Updated fallback pricing copy to mention invoices, purchase orders, bills, slips, imports, and SalesIQ voice notes.
- Synced `pricing-data.json` from the app's canonical `src/config/subscriptionPlans.js` metadata.

## Files Changed
- `pricing.html`
- `pricing-data.json`

## Regression Risk (>10%)
- **Low-medium (~10-12%)**: cached public pricing data can temporarily show the older AI Auto Capture wording until the website deploy/CDN refresh occurs.

## Validation
- `npm run -s sync:pricing` from the main app repo.
