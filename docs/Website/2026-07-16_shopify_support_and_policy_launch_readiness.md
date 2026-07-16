# Shopify App Store Support And Policy Launch Readiness

## Scope

Prepare the public FlowIQ website URLs required by the `FlowIQ Operations` Shopify App Store listing without changing the connector runtime or publishing the website directly through Netlify.

## Customer-facing pages

- `/support.html` provides a permanent public support destination for Shopify installation, account linking, billing-route, import, warehouse-mapping, stock, price, order, and privacy requests.
- `/privacy.html` explains the Shopify data FlowIQ can process, the merchant-selected purposes, server-side token handling, the 365-day customer-data audit retention period, and verified access/redaction handling.
- `/terms.html` records the Shopify connection instruction, disconnect right, and the no-double-charge boundary between Shopify-originated and independently established FlowIQ subscriptions.
- Both sitemap copies include the support page so the live and published static outputs remain aligned.

## Safety boundaries

- Support copy tells merchants never to email passwords, access tokens, API secrets, banking credentials, or unredacted customer records.
- The policy wording does not claim Shopify affiliation, certification, or review approval.
- The no-double-charge statement describes the implemented billing-owner boundary; it does not promise that off-platform billing is available to App Store-acquired merchants.
- Shopify-originated paid subscriptions remain subject to Shopify App Pricing or another Shopify-approved billing route.

## Validation

- Serve the website locally and confirm `support.html`, `privacy.html`, and `terms.html` return HTTP 200.
- Parse `sitemap.xml` and `public/sitemap.xml` as XML.
- Confirm the support, privacy, and terms pages contain their canonical customer-support and Shopify-data wording.
- Do not manually deploy through Netlify. The website owner publishes through the repository-backed release path.

## Regression risk

No identified regression risk exceeds 10%. The new page is additive, policy edits are static content, and both sitemap copies are kept in sync.
