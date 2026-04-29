# AgentsIQ Pricing Grid Visibility

Date: 2026-04-29

## Summary
- Updated the public FlowIQ pricing page to show AgentsIQ in the comparison grid.
- The grid now states:
  - `AgentsIQ automation desk (Growth+)`
  - `AI runs require AgentsIQ credits`
- Hero, meta, social, and FAQ copy now state that AgentsIQ is available from Growth upward and AI runs require usage credits.
- The marketing `pricing-data.json` is now regenerated from the app's canonical `src/config/subscriptionPlans.js` source alongside the app static pricing data.

## Files Changed
- `flowiq_website/pricing.html`
- `flowiq_website/pricing-data.json`
- `tools/generate-public-pricing-data.mjs`
- `src/config/subscriptionPlans.js`

## Regression Risk (>10%)
- **10-14%:** public pricing cards and comparison rows now depend on the regenerated canonical pricing snapshot; if the generator is not run after future plan changes, website copy can drift again.
- **10-12%:** Scale's included AgentsIQ credit line depends on the static pricing payload including the plan `key`; older cached `pricing-data.json` files may briefly show only generic credit wording until CDN refresh.
