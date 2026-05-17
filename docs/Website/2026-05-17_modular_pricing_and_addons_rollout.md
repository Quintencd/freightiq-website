# Modular Pricing And Add-ons Rollout

Date: 2026-05-17

## Summary

The public pricing page now presents FlowIQ as lower-friction base plans plus modular add-ons.

The pricing comparison keeps the plan table simple, while the add-on section below the table sells the value of AI Auto Capture, AI Agents, Forecasting Intelligence, Ecom, Messaging, Payroll, Commission & Rebate Automation, AI credit packs, and extra users.

## Commercial Updates

- Professional is `R7,900/month` with 5 users.
- Scale is `R12,900/month` with 10 users.
- AI Agents Pack is `R490/month`.
- Messaging Pack is `R390/month`.
- AccountingIQ advanced reconciliation and payment automation are sold as `AccountingIQ Reconciliation Pack` from Growth Lite upward.
- Commission & Rebate Automation Pack is `R590/month`.
- Follow-up alignment now makes Growth Lite eligible for the specialist add-ons, exposes EcomIQ and PayrollIQ add-ons on every plan, and adds `AccountingIQ Reconciliation Pack` from Growth Lite upward.
- AccountingIQ bank feed API connectors are hidden from pricing until that connector surface is live.
- The add-on section now uses buyer-facing copy instead of internal strategy language.
- The public marketing website presents the same commercial model in USD for confidence and international comparison, starting at `$19/month`.
- Website USD display prices are rounded marketing prices; in-app non-South-African billing profiles now see USD-first reference pricing, while PayFast subscription creation and upgrade payloads remain on the canonical ZAR model.
- The app-side static `public/pricing.html` copy was realigned to the website USD presentation so public pricing pages do not mix Rand and dollar subscription messaging.
- The legacy `pricing-new-5-tiers.html` page now redirects to `pricing.html` so prospects do not see the old bundled Rand tiers.
- Website structured data now uses `USD` for subscription offer currency, while South African customer savings and calculator examples remain in Rand because they are local operating examples rather than subscription pricing.

## Files

- `flowiq_website/pricing.html`
- `flowiq_website/pricing-data.json`
- `flowiq_website/pricing-new-5-tiers.html`
- `flowiq_website/index.html`
- `flowiq_website/assets/pricing-currency.js`
- marketing structured-data pages that previously emitted `priceCurrency: ZAR`
- `public/pricing.html`
- `public/pricing-data.json`
- `tools/generate-public-pricing-data.mjs`
- `docs/Billing/2026-05-17_pricing_addon_gate_alignment.md`

## Regression Risks Above 10%

- 10-15%: prospects may compare the lower base price to the old fully bundled tiers unless affiliates explain that specialist automation is now optional.
- 12-18%: add-on copy must stay synchronized with app entitlements and PayFast billing, otherwise the website may sell a capability differently from the in-app billing screen.
- 12-18%: USD-first in-app display can be misread as USD card charging. Mitigation: the app keeps the ZAR billed amount visible and PayFast payload tests assert ZAR-only checkout values.
