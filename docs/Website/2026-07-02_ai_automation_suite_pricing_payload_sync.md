# AI Automation Suite Pricing Payload Sync

## Summary

The app billing catalogue now presents `ai_auto_capture` as **AI Automation Suite** at the existing `R519/month` price, with AgentsIQ included and the old separate AI Agents Pack removed from saleable pricing payloads.

The website pricing shell and generated `pricing-data.json` were updated so public pricing no longer advertises AI Agents Pack or ChatIQ as paid AI module value.

## Files

- `pricing.html`
- `pricing-data.json`
- `../public/pricing.html`
- `../public/pricing-data.json`

## Validation

- Regenerated pricing data with `node tools/generate-public-pricing-data.mjs`.

## Regression Risk

- `10-15%`: cached pricing pages can briefly show stale add-on copy until the next website deploy/cache refresh.
- Mitigation: both static fallback copy and generated pricing payloads were updated together.
