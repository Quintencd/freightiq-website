# Extra SKU Capacity Pricing Sync

## Change

The generated website pricing payload now reflects the app's updated Extra SKU Capacity packaging:

- R150 per month per 100 extra SKUs.
- Maximum 2 packs per eligible plan.
- SKU packs are positioned as short-term catalogue headroom, with larger SKU growth handled by upgrading to the next package.

## Files

- `pricing.html`
- `pricing-data.json`

## Website Presentation

The generated pricing payload still stays aligned with the app, but the public pricing page does not display operational capacity or credit add-ons such as Extra SKU Capacity, import/export job packs, price-list packs, ProjectsIQ media storage, or AI Pack credits. Extra User Seat remains visible because it is a simple buying signal that does not bypass package upgrade pressure.

## Validation

- Regenerated from the app canonical pricing source with `npm run -s sync:pricing`.
- Confirmed `pricing.html` omits `extra_skus`, `extra_shipments`, `extra_price_lists`, `projectsiq_storage_20gb`, and `agentsiq_usage_pack` from the visible add-on card order.

## Regression Risk

- 10-12% pricing-copy risk if the public site is deployed without the matching app and Supabase billing changes. The app config, generated pricing payloads, Supabase billing metadata, and database migration were updated together to avoid split pricing behavior.
