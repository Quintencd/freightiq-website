# Pricing New Account Module Promo Banner

## Summary

- Added a green promotional banner near the top of `pricing.html`, directly below the hero call-to-action buttons and above the pricing path cards.
- The banner states that new account sign-ups get 3 months free access to specialist modules.
- Listed the promoted modules in compact pills: ForecastIQ, ImportIQ, DeliveryIQ, ManufacturingIQ, ProjectsIQ, PayrollIQ, Ecom Pack, Messaging Pack, AI Automation Suite, and Accounting Reconciliation.
- Added a dedicated signup CTA with pricing analytics metadata at `pricing_new_account_module_promo`.

## Validation

- Confirmed the previous promo copy was absent from both the local marketing website and the live `https://www.flowiq.info/pricing` HTML before the fix.
- Kept the change scoped to the marketing website pricing page and this documentation note.
- No Netlify deploy was run.

## Regression Risk

- No regression risk identified above 10%. This is a static pricing-page content addition that does not alter pricing data, plan rendering, currency detection, checkout/signup payloads, or module activation logic.
