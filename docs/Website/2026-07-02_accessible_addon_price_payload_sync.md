# Accessible Add-on Price Payload Sync

## Context

The app billing catalogue lowered several add-on prices to reduce adoption resistance and improve module activation in price-sensitive markets. The marketing website consumes generated `pricing-data.json` from the app's canonical subscription config.

## Change

- Regenerated `pricing-data.json` after the app-side add-on repricing.
- Synced the lower Growth and Professional import/export job pack prices.
- Synced lower AccountingIQ Reconciliation, POSIQ, Ecom, Messaging, and Payroll add-on prices.
- Commission & Rebate Automation remains unchanged.
- No public pricing page layout or public module-price visibility behavior changed.
- No Netlify deploy was run.

## Regression Risk

- Below 10% for the public website because this only syncs generated data and the public pricing page remains benefit-led rather than module-price-led.
- 10-15% if app billing, generated website data, Supabase SQL pricing helpers, and PayFast Edge billing functions are deployed out of sync. The app-side rollout updates those surfaces together.

## Validation

- `npm run -s sync:pricing`
- Confirmed generated payload values for `extra_shipments`, `accounting_reconciliation_pack`, `posiq_till_integration_pack`, `ecom_pack`, `messaging_pack`, and `payroll_pack`.

