# Industry Module Recommendations on Pricing

Date: 2026-06-20

## Summary

Added an industry selector above the public pricing add-on grid to reduce pricing-page decision fatigue and help prospects see common FlowIQ module stacks for their business type.

The public pricing page now:

- shows `Find the Right Modules for Your Industry` above modular add-ons;
- uses a compact custom dropdown instead of busy pills;
- highlights recommended add-ons first with a softer green `Most Popular` badge;
- shows the supplied industry explanation and suggested stack;
- lets visitors add or remove any add-on without locking the recommendation;
- keeps the add-on estimate tied only to add-ons the visitor explicitly adds;
- tracks industry selection, accepted recommendations, removed recommendations, and additional add-ons through the existing website analytics globals.
- includes PayrollIQ in every recommending industry stack, with Payroll Pack and AI Auto Capture highlighted as selectable recommendations across every recommending industry.

## Files

- `pricing.html`
- `pricing-data.json`
- `../public/pricing.html`
- `../public/pricing-data.json`
- `../src/config/industryModuleRecommendations.js`
- `../tools/generate-public-pricing-data.mjs`

## Notes

- The industry/module mapping is emitted through generated `pricing-data.json`, so the page renderer does not own the mapping directly.
- The in-app subscription builder can now read active industry rows from Supabase via the `pricing_industry_module_recommendations` table and founder/superadmin admin screen. The static marketing page remains generated JSON until a public runtime endpoint is introduced.
- The static page estimates selected add-on investment only. Base-plan selection remains in the comparison table and signup flow, so the estimate deliberately avoids implying a full plan total before a plan is chosen.
- Industry selection is guidance-only. It reorders and highlights cards, but it does not add recommended modules or change the selected add-on total by itself.
- `Custom / Other` remains the no-recommendation option and still shows the full add-on catalogue without highlighting a stack.
- `business_units` USD marketing override is aligned at `$59/month` to match the existing pricing test contract.
- Website deployment must still go through GitHub. Do not deploy this site directly through Netlify from the local workspace.

## Verification

- Regenerated pricing data with `node tools/generate-public-pricing-data.mjs`.
- Inline executable script syntax passed for `flowiq_website/pricing.html` and `public/pricing.html`.
- `node --test tests/billingSubscriptionBuilder.test.js tests/subscriptionAddOns.test.js tests/marketingWebsiteUsdPricing.test.js`
- `git diff --check` on changed pricing files.

## Regression Risks Above 10%

- 12-18%: New recommendation interaction events will change pricing-page analytics volume. Filter by event type when comparing with older pricing funnels.
- 10-15%: Visitors may read selected add-on investment as total subscription cost. Mitigation: the summary labels it as selected add-on investment and leaves plan pricing in the plan table.
- 10-14%: Pricing page and `pricing-data.json` must deploy together, otherwise the industry selector will render without recommendation options.
- 10-14%: Static website recommendations can drift from DB-managed app recommendations until the generator is rerun and the website is deployed. Mitigation: keep the code fallback and generated JSON aligned whenever changing admin defaults.
