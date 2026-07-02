# Extra Price Lists R200 Pricing Payload Sync

## Context

The app billing catalogue repriced the Growth extra price-list add-on from R990/month to R200/month. The marketing website consumes the generated `pricing-data.json` payload from the app's canonical subscription config.

## Change

- Regenerated `pricing-data.json` after the app-side price change.
- The Growth `extra_price_lists` add-on now emits `price: 200` for three additional custom price lists.
- No pricing page layout or public module-price visibility behavior changed.
- No Netlify deploy was run.

## Regression Risk

- Below 10% for the public website because this only syncs generated data and the public pricing page remains benefit-led rather than module-price-led.
- 10-15% if the app, website payload, Supabase SQL pricing function, and PayFast Edge functions are deployed out of sync. Mitigation: all four billing surfaces were updated and validated in the app rollout.

## Validation

- `npm run -s sync:pricing`
- Confirmed `flowiq_website/pricing-data.json` reports `plans.growth.add_ons.extra_price_lists.price = 200`.

