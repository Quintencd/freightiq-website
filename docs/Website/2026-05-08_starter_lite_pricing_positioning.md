# 2026-05-08 - Starter Lite Pricing Positioning

## Purpose

Shift the public website from an enterprise-heavy first impression to a small-business-friendly land-and-expand message.

## Changes

- Homepage hero now leads with:
  - `Start simple. Scale smarter.`
  - `The business platform that grows with you.`
- Primary homepage CTA is now `Start Free Trial`.
- Secondary homepage CTA points visitors to the pricing scale path.
- Pricing page now explains:
  - Starter Lite starts at `R299/month`.
  - Starter remains available as the stronger operational entry package above Starter Lite.
  - businesses can start with accounting and light operations.
  - FlowIQ grows beyond Xero, Sage, QuickBooks, and Pastel without a later system migration.
- Added pricing-page messaging for free migration assistance from Xero, Sage, QuickBooks, and Pastel.
- Added upgrade-trigger rows for multi-warehouse, import costing, forecasting, delivery management, operational dashboards, and inventory intelligence.
- Regenerated `pricing-data.json` from the app's canonical subscription config.
- Updated marketing signup plan labels to include both `Starter Lite` and `Starter`.

## Positioning Notes

The website avoids leading with ERP/enterprise language on the first impression and instead frames FlowIQ as an approachable business operating platform that can start with accounting and grow into operational control.

## Regression Risks

- `12-18%`: conversion attribution may shift because the homepage primary CTA now points directly to trial signup instead of demo-first intent.
- `10-14%`: older cached pricing pages may briefly show old Starter copy while the regenerated JSON and HTML propagate through deployment.
- `10-12%`: users may need clearer comparison copy between Starter Lite and Starter after launch if both entry packages receive similar trial traffic.
- `10-12%`: some SEO landing pages still use ERP language by page intent. Those were not broadly rewritten in this pass to avoid changing unrelated search-targeted pages.

## Verification

- Pricing data regenerated with `npm run sync:pricing`.
- No Netlify deploy was run.
