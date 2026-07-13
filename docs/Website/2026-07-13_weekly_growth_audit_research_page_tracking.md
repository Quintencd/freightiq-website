# Weekly Growth Audit: Research-Page Tracking Parity

Date: 2026-07-13
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`
Deployment: not deployed

## Summary

This weekly website growth pass implemented the top three safest high-confidence improvements from the audit:

1. completed conversion and engagement tracking across the comparison-page family;
2. completed conversion and engagement tracking across the use-case family;
3. completed conversion and engagement tracking across the glossary family.

The changes preserve all visible content, navigation, CTAs, canonical URLs, schema already present, and the premium visual system. No Netlify deploy, Git push, or commit was performed.

## Evidence and Audit Findings Ranked by Expected Impact

1. **High-intent research pages had no production-visible page, CTA, demo-intent, trial-intent, or scroll events.** The comparison and use-case hubs and detail pages were in the sitemap and linked to demo, trial, and calculator routes, but did not load either shared analytics script.
2. **Glossary acquisition pages had the same measurement gap.** Six indexable glossary routes included demo and trial CTAs but did not load the canonical website or growth analytics stack.
3. **The missing scripts were visible in live production data, not only static code.** A read-only query at `2026-07-13 07:02:50 UTC` against database host `10.106.5.114` found 941 production `web_page_view` events over the preceding 30 days, but no page-view rows for `/compare%`, `/use-cases%`, or `/glossary%`. The same window contained 214 CTA clicks, 354 signup starts, 113 scroll-depth events, 6 demo submissions, and only 2 demo-start events.
4. **High-intent root SEO pages still lack the shared analytics stack.** Multiple sitemap routes such as the root comparison and landed-cost SEO pages remain measurable only if another script or external platform captures them. They are the strongest candidate for the next bounded tracking pass.
5. **The audited page families still load Tailwind through the public CDN.** Local browser checks showed the standard production-use warning from `cdn.tailwindcss.com`. This is a pre-existing page-speed and external-dependency risk and was not expanded into this week's three-change scope.
6. **No Google Search Console, GA4 dashboard/export, Clarity/Smartlook session export, ranking history, heatmap, or click-depth report was available.** Search and UX conclusions therefore remain code-, route-, live-event-, and local-render-based.

## Top Three Improvements Implemented

### 1) Comparison tracking parity

Updated the comparison hub and three detail pages with:

- explicit indexable robots directives;
- `data-page-template`, `data-page-intent`, and `data-page-topic` reporting metadata;
- `/assets/website-analytics.js` for page views, CTA clicks, attribution, and signup-source decoration;
- `/assets/growth-analytics.js` for demo starts, trial starts, scroll depth, calculator links, and reporting context.

This closes the highest-intent measurement gap because comparison visitors are actively evaluating alternatives and already see demo/trial CTAs.

### 2) Use-case tracking parity

Applied the same reporting contract to the use-case hub, supplier-price-creep page, and true-landed-cost page. This makes problem-aware organic traffic and its downstream demo, trial, and calculator engagement measurable without changing copy or CTA destinations.

### 3) Glossary tracking parity

Applied the same reporting contract to the glossary hub and five term pages. This connects top-of-funnel educational discovery to demo/trial intent and scroll depth while preserving the existing glossary content and internal links.

## Sitemap Handling

Updated `lastmod` to `2026-07-13` for all 13 changed research pages in both sitemap copies. Root and public sitemaps remain identical; no URLs were added or removed.

## Files Changed

- `compare/index.html`
- `compare/flowiq-vs-legacy-erp.html`
- `compare/flowiq-vs-odoo.html`
- `compare/flowiq-vs-spreadsheets.html`
- `use-cases/index.html`
- `use-cases/supplier-price-creep.html`
- `use-cases/true-landed-cost.html`
- `glossary/index.html`
- `glossary/cbm.html`
- `glossary/customs-duty.html`
- `glossary/fifo.html`
- `glossary/incoterms.html`
- `glossary/landed-cost.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-07-13_weekly_growth_audit_research_page_tracking.md`

## Validation

- `node --check assets/website-analytics.js`
- `node --check assets/growth-analytics.js`
- automated assertions for robots, canonical, body reporting metadata, and single-load analytics scripts across all 13 changed pages
- root/public sitemap parity, uniqueness, local-file, and changed-route `lastmod` checks
- local HTTP 200 smoke checks for all 13 changed routes and both shared analytics assets
- in-app browser checks at 390 x 844 for `/compare/`, `/use-cases/`, and `/glossary/`
- mobile horizontal-overflow checks for the three representative hubs
- browser console error check; no errors found
- `git diff --check`

## Regression Risks Over 10%

- **10-20% analytics baseline shift:** page views, CTA clicks, demo starts, trial starts, and scroll-depth events will increase for these 13 routes because they were previously absent from the canonical stream. Mitigation: existing event names and click/submit separation are preserved.
- **10-15% page-load/network risk:** each changed page now loads the two established analytics files and sends non-blocking telemetry. Mitigation: scripts are bottom-loaded, analytics failures are caught, and no rendering or form code depends on telemetry success.
- **10-12% crawl-refresh risk:** explicit robots directives and refreshed sitemap timestamps may prompt search engines to revisit these pages. Mitigation: directives preserve their existing indexable state, canonical URLs are unchanged, and only materially updated routes received a new `lastmod`.

## Data Gaps

- Google Search Console query, page, impression, CTR, and indexing exports were unavailable.
- GA4 dashboard/export access was unavailable even though GA4 identifiers exist in parts of the site code.
- Clarity and Smartlook session, heatmap, and click-depth exports were unavailable.
- No external ranking-history or Core Web Vitals field-data export was available.
- No production deployment verification was performed because this is an approval-only workflow.

## Next Recommended Growth Experiment

Normalize the shared analytics stack and page metadata on the highest-intent root SEO landing pages still missing canonical website tracking, starting with the root FlowIQ comparison, landed-cost, import-cost, inventory-planning, and ERP-intent routes. Measure their page-to-demo and page-to-trial rates for at least two weeks before changing visible copy.

