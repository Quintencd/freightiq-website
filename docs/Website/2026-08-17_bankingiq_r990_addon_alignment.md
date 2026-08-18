# BankingIQ R990 Marketing Alignment

Date: 2026-08-17

> Historical record: superseded on 2026-08-18 by the R790 BankingIQ positioning. See `2026-08-18_bankingiq_r790_price_repositioning.md`.

- The pricing page now presents BankingIQ at `R990/month` instead of selling Auto Accounting Reconciliation as a separate R450 product.
- The add-on value copy covers bank accounts and statements, beneficiaries, payment preparation, maker-checker approvals, scheduled queues, reconciliation automation, anomaly controls, cash-flow intelligence, and audit history.
- Direct bank feeds and payment execution are described as separately approved provider integrations; the marketing copy does not claim they activate with the software subscription.
- The module directory now links to `/modules/bankingiq.html`; the generated detail page and both sitemaps use the BankingIQ name and capability set.
- `/modules/accounting-reconciliation` and `/modules/accounting-reconciliation.html` permanently redirect to the BankingIQ detail page.
- Canonical pricing data is generated from `src/config/subscriptionPlans.js` into both `public/pricing-data.json` and `flowiq_website/pricing-data.json`.
- No Netlify deployment was performed by Codex.
