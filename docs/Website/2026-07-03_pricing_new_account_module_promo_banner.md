# Pricing New Account Module Promo Banner

## Summary

- Added a green promotional banner near the top of `pricing.html`, directly below the hero call-to-action buttons and above the pricing path cards.
- The banner states that new account sign-ups get 2 months free access to specialist modules.
- Narrowed the visible module pills to the actual bonus modules only: AI Automation Suite, Auto Accounting Reconciliation, and PayrollIQ.
- Synced generated public pricing payloads after renaming the accounting add-on card from `AccountingIQ Reconciliation Pack` to `Auto Accounting Reconciliation`.
- Added a dedicated signup CTA with pricing analytics metadata at `pricing_new_account_module_promo`.

## Validation

- Confirmed the previous promo copy was absent from both the local marketing website and the live `https://www.flowiq.info/pricing` HTML before the fix.
- Kept the change scoped to the marketing website pricing page and this documentation note.
- No Netlify deploy was run.

## July 17 Offer Update

- Shortened the public Welcome Bonus Pack term from three billing months to two.
- Kept the same eligible specialist modules and signup route; no plan or add-on price changed.

## Regression Risk

- No regression risk identified above 10%. This is a static pricing-page copy correction and generated-payload sync that does not alter pricing amounts, add-on keys, plan rendering, currency detection, checkout/signup payloads, or module activation logic.
