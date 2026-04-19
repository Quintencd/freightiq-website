# Module Preview And Pricing Header Cleanup

## Summary

- Replaced the `EcomIQ` and `AccountingIQ` module placeholder thumbnails with branded UI-style preview assets based on the supplied app screenshots.
- Removed the top-left `FlowIQ` wordmark from `pricing.html` navigation so the pricing page header feels cleaner and less repetitive.
- Tightened pricing table plan headers so prices read more cleanly on one line.
- Changed monthly and annual suffixes in plan headers from `/month` and `/year` to `/m` and `/yr`.

## Files Updated

- `modules.html`
- `pricing.html`
- `assets/img/modules/thumb-ecomiq-ui.svg`
- `assets/img/modules/thumb-accountingiq-ui.svg`

## Verification

- Confirmed local `/modules` markup now references `thumb-ecomiq-ui.svg` and `thumb-accountingiq-ui.svg`.
- Confirmed local `/pricing` markup no longer includes the top-left `FlowIQ` wordmark in nav.
- Confirmed pricing header template now renders compact `R.../m` and `R.../yr` suffixes.
- Rasterized both new SVG preview assets locally to sanity-check thumbnail readability.

## Regression Risk Notes (>10%)

- **12%**: SVG preview assets are illustrative UI previews rather than exported full screenshots, so if the app UI changes significantly these thumbnails can drift and should be refreshed.
- **11%**: Removing the pricing-page top-left brand mark slightly reduces repeated brand presence above the fold, but it also lowers visual clutter.
