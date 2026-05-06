# C&E Legal Case Study and Professional Services Proof

## Summary

Added a public C&E Legal customer proof page to show FlowIQ value outside import-heavy operations, specifically for legal, accounting and professional services workflows.

## What Changed

- Added `flowiq_website/customers/ce-legal-case-study.html`.
- Mirrored the same case study into `public/customers/ce-legal-case-study.html`.
- Added the C&E Legal uploaded organization logo to:
  - `flowiq_website/assets/img/customers/ce-legal-logo.jpg`
  - `public/assets/img/customers/ce-legal-logo.jpg`
- Added C&E Legal to the homepage proof section alongside Biomek.
- Split homepage case-study links into dedicated scannable review cards for Biomek and C&E Legal, instead of leaving them as inline links in the proof-pill row.
- Added a dedicated `/customers` reviews page with separate Biomek and C&E Legal customer proof cards.
- Added public/customer-reported trust badges to both case-study pages.
- Added before/after comparison sections to both case-study pages.
- Added customer-result disclaimers to both case-study pages and the `/customers` page.
- Updated Biomek attribution to Founder rather than Director.
- Added Netlify redirect coverage for `/customers/ce-legal-case-study`.
- Added Netlify redirect coverage for `/customers`.
- Added the C&E Legal case-study URL to the generated sitemap source and current sitemap output.
- Updated `tools/generate-flowiq-ai-seo-pages.mjs` so future sitemap and `_redirects` generation preserves the customers page and both customer case-study routes.

## Production Verification

- Deployed live marketing site to Netlify site `flowiq-website`, deploy `69fb31cac79949331ca749eb`.
- Deployed credibility follow-up to Netlify site `flowiq-website`, deploy `69fb3a09c7994951d2a75487`.
- Verified `https://www.flowiq.info/customers` returns the dedicated customer reviews page with Biomek and C&E Legal review cards.
- Verified `https://www.flowiq.info/customers/ce-legal-case-study` returns the public C&E Legal case study with:
  - 5/5 review schema
  - five disconnected apps replaced language
  - 18 AccountingIQ HQ client workflows
  - shared FlowIQ marketing navigation script
  - C&E Legal logo asset
- Verified `https://www.flowiq.info/assets/img/customers/ce-legal-logo.jpg` returns HTTP 200.
- Verified homepage includes the C&E Legal proof card and case-study link.
- Verified `https://www.flowiq.info/sitemap.xml` includes `/customers`, `/customers/biomek-case-study` and `/customers/ce-legal-case-study`.
- Verified both case-study pages include verified-customer proof labels, before/after sections and customer-reported results disclaimers.

## Public Proof Points

- Public customer name: C&E Legal.
- Country: South Africa.
- Package: FlowIQ Growth Plan.
- Team size: six staff.
- AccountingIQ HQ client workflows: 18.
- Rating: 5/5.
- Replaced five disconnected subscriptions and apps with one FlowIQ ecosystem.
- Modules used: SalesIQ, WorkIQ, InvoiceIQ, TaskIQ, AccountingIQ, AccountingIQ HQ and PayrollIQ.
- Primary outcome: better visibility across staff work, client financial workflows, payroll, accounting, invoicing, cash-flow follow-up and business bottlenecks.

## Copy Guardrails

- Do not say "roughly five apps" because the customer confirmed five apps were replaced.
- Do not name the legacy apps until C&E Legal confirms which app names can be used publicly.
- Frame staffing outcomes as improved capacity to take on more clients, reduced follow-up burden and better work allocation visibility.
- Use C&E Legal as the public brand name, even though the organization settings record includes a fuller legal/trading profile.

## Regression Risks

- 10-15%: The homepage proof section now balances Biomek and C&E Legal instead of focusing only on Biomek's import-heavy proof. Mitigation: Biomek ROI remains visible, and C&E Legal expands trust for professional services buyers.
- 10-15%: The C&E Legal page includes customer-reported qualitative improvements without exact time reductions yet. Mitigation: the page labels the app-name/time detail as pending and uses only confirmed numeric claims: five apps, six staff, 18 AccountingIQ HQ clients and 5/5 rating.
- 10-15%: The C&E Legal logo is sourced from the uploaded app org asset and may change if the customer updates branding later. Mitigation: the website now stores a local static copy for stable public rendering.
- 10-15%: Larger homepage review cards take more vertical space than inline links. Mitigation: the cards make customer proof much easier to scan and stack cleanly on mobile.
- 10-15%: Adding a `/customers` page creates another public page that must stay current as new reviews are added. Mitigation: it is a short proof hub with links to canonical case-study pages and is included in the generator-owned sitemap.
- 10-15%: Trust badges can sound too promotional if overdone. Mitigation: badges use concrete language: public customer case study, founder-attributed review, customer-reported results and live FlowIQ usage.
