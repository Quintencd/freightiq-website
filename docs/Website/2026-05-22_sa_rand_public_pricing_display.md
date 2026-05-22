# South African Rand public pricing display

## Summary
- Public pricing now auto-selects Rand pricing for South African visitors and USD pricing for international visitors.
- Initial detection uses browser locale/timezone, then refreshes from IP country when available.
- The pricing table and add-on cards both use the selected regional display so AI Pack pricing no longer stays USD for South African visitors.
- Starter Lite hero copy no longer ships a hard-coded dollar amount before the pricing data loads.

## Regression risk
- Below 10%. The change is limited to pricing-page display rendering and does not change signup, checkout, analytics, or canonical pricing data.
