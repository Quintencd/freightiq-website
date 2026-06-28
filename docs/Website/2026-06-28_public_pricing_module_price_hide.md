# Public Pricing Module Price Hide

Date: 2026-06-28

## Summary

The public marketing pricing page now shows only base plan pricing. Add-on/module pricing is hidden publicly and remains visible inside the FlowIQ workspace billing area before activation.

The module section now:

- uses `Add the modules your business needs` as the section title;
- keeps module names, descriptions, industry/category tags and recommendation badges;
- removes monthly prices, setup-style pricing copy and the public add-on stack calculator;
- routes module preview CTAs to signup/trial;
- shows reassurance copy that module pricing is transparent inside the workspace before confirmation;
- adds the `Build FlowIQ around how your business actually works.` CTA block.

## Tracking

The pricing page now emits:

- `pricing_base_plan_view`
- `pricing_start_trial_click`
- `pricing_book_demo_click`
- `module_preview_view`
- `module_preview_click`

`module_preview_click` includes `module_name`, `module_category`, and `source: public_pricing_page`.

## App Billing Boundary

The app subscription/billing area was not changed. Module prices still belong inside the app through the existing subscription builder and add-on management flows.

## Verification

- Inline pricing page scripts parsed for the marketing and app-public pricing templates.
- `node --test tests/subscriptionAddOns.test.js tests/billingSubscriptionBuilder.test.js tests/marketingWebsiteUsdPricing.test.js`
- Desktop and 390px mobile checks on `http://localhost:3333/pricing.html`.
- Module preview CTA verified to route to `/signup`.

