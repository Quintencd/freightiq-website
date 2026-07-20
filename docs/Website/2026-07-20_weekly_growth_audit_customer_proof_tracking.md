# Weekly Growth Audit: Customer-Proof Tracking Parity

Date: 2026-07-20
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`
Deployment: not deployed

## Summary

This weekly pass implemented the three safest high-confidence improvements found in the audit: completing growth tracking on the customer hub, the Biomek case study, and the C&E Legal case study. No visible customer copy, claims, layout, CTA destination, canonical URL, or structured data changed.

## Evidence and Prioritized Findings

1. **Customer-proof journeys were only partially measurable.** The three public customer routes loaded `/assets/website-analytics.js` but not `/assets/growth-analytics.js`, so page views reached internal reporting while scroll depth and the growth layer's demo/trial intent events did not.
2. **Live data confirmed the measurement gap.** A read-only production query at `2026-07-20 07:08:42 UTC` against database host `10.106.5.114` found 14 page views for `/customers/`, 13 for `/customers/biomek-case-study`, and 9 for `/customers/ce-legal-case-study` over the preceding 30 days. The family had no recorded scroll-depth events and only one CTA click.
3. **Demo-start measurement remains unusually low sitewide.** The same 30-day production slice contained 1,084 page views, 572 signup starts, 261 CTA clicks, 133 scroll-depth events, 12 demo submissions, and only 1 demo-start event. Trust-heavy case studies should therefore use the established demo-intent tracking layer before visible CTA experiments are evaluated.
4. **The root SEO bootstrap already loads both canonical analytics files.** Apparent static-script gaps on root SEO pages were false positives because `/website-analytics.js` loads `/assets/website-analytics.js` and then `/assets/growth-analytics.js`.
5. **Tailwind remains loaded from its public CDN on many indexed pages.** This is a pre-existing page-speed and external-dependency risk; it was not expanded into this week's three-change scope.
6. **Search and behavior-platform exports were unavailable.** No Google Search Console, GA4 dashboard/export, Clarity/Smartlook session export, ranking history, heatmap, or click-depth report was available.

## Top Three Improvements Implemented

### 1) Customer hub growth tracking

Added the established growth analytics layer to `/customers`. This enables scroll-depth and future explicit conversion-event reporting on the main customer-proof discovery page without changing visible content.

### 2) Biomek case-study growth tracking

Added the same layer to `/customers/biomek-case-study`. The existing final demo link is now covered by the shared demo-intent classifier, while page content and customer-reported claims remain untouched.

### 3) C&E Legal case-study growth tracking

Added the same layer to `/customers/ce-legal-case-study`, completing a consistent measurement contract across the customer-proof family.

## Sitemap Handling

Updated `lastmod` to `2026-07-20` for the three changed routes in both sitemap copies. Root and public sitemaps remain identical; no URL was added or removed.

## Files Changed

- `customers/index.html`
- `customers/biomek-case-study.html`
- `customers/ce-legal-case-study.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-07-20_weekly_growth_audit_customer_proof_tracking.md`

## Validation

- `node --check assets/website-analytics.js`
- `node --check assets/growth-analytics.js`
- assertions for canonical, robots, structured data, body reporting metadata, and single-load analytics scripts on all three pages
- JSON-LD parsing on all three pages
- root/public sitemap parity, URL uniqueness, local-file coverage, and changed-route `lastmod` checks
- local HTTP smoke checks for all three routes and both analytics assets
- mobile browser/render and horizontal-overflow checks on representative customer pages
- `git diff --check`

## Regression Risks Over 10%

- **10-20% analytics baseline shift:** customer-proof scroll-depth and demo-intent counts should increase because these events were previously absent from this family. Mitigation: the existing event names, classifiers, and page metadata are reused.
- **10-15% page-load/network risk:** each page now requests the established growth analytics file and sends non-blocking telemetry. Mitigation: no render, navigation, or conversion behavior depends on analytics success.
- **10-12% crawl-refresh risk:** refreshed sitemap timestamps may prompt recrawling. Mitigation: canonical URLs, robots directives, schema, and visible content are unchanged.

## Data Gaps

- Google Search Console query, page, impression, CTR, and indexing exports were unavailable.
- GA4 dashboard/export access was unavailable.
- Clarity and Smartlook session, heatmap, and click-depth exports were unavailable.
- No external ranking-history or Core Web Vitals field-data export was available.
- No production deployment verification was performed because this is an approval-only workflow.

## Next Recommended Growth Experiment

After deployment, collect at least two weeks of customer-page scroll and demo-intent data. If the customer hub continues to produce page views but little downstream intent, test one restrained, trust-led `Book a Demo` action after the case-study cards and compare customer-hub-to-demo-start rate against the pre-test baseline.
