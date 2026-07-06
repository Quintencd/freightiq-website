# Weekly Growth Audit: Module SEO and Tracking Completion

Date: 2026-07-06
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

This weekly website growth pass implemented the top three safest high-confidence improvements from the audit:

- completed indexable SEO metadata and structured data for the remaining live module draft pages;
- added module-detail analytics metadata and the shared website tracking stack to those pages;
- synchronized root and public sitemap coverage for the newly self-canonical module pages.

No Netlify deploy, push, or commit was performed.

## Audit Findings Ranked by Expected Impact

1. **Module demo-intent pages were discoverable through site navigation but incomplete for organic discovery and reporting.** `JournalIQ`, `Manufacturing`, and `TaskIQ` had live demo CTAs, but no self-canonical tag, robots directive, structured data, body-level reporting metadata, shared website analytics, or sitemap entries.
2. **Some comparison and use-case pages still lack the shared analytics stack.** These pages remain in the sitemap and have demo CTAs, so future passes should normalize tracking there.
3. **Redirecting duplicate solution pages remain excluded from sitemap expansion.** This is correct for now because they canonicalize to the importer/distributor page or immediately redirect.
4. **No GSC, GA4, Clarity, rank-tracking, heatmap, or click-depth exports were available.** This run used code, docs, sitemap, metadata, and local static checks only.

## What Changed

### 1) Module SEO metadata

Added indexable robots tags, self-canonical URLs, and JSON-LD `WebPage`, `BreadcrumbList`, and `SoftwareApplication` schema to:

- `modules/journaliq.html`
- `modules/manufacturing.html`
- `modules/taskiq.html`

### 2) Module tracking metadata

Added `data-page-template="module-detail"`, `data-page-intent="module_demo_intent"`, and module-specific `data-page-topic` values to the same pages. Added:

- `/assets/website-analytics.js`
- `/assets/growth-analytics.js`

This brings demo clicks, module views, scroll depth, and page metadata into the shared website analytics stream.

### 3) Sitemap synchronization

Added the three now-self-canonical module pages to both:

- `sitemap.xml`
- `public/sitemap.xml`

The root and public sitemap copies remain synchronized.

## Files Changed

- `modules/journaliq.html`
- `modules/manufacturing.html`
- `modules/taskiq.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-07-06_weekly_growth_audit_module_seo_tracking.md`

## Validation

- `node --check assets/website-analytics.js`
- `node --check assets/growth-analytics.js`
- JSON-LD parse checks for the three changed module pages
- sitemap parity check: `sitemap.xml` matches `public/sitemap.xml`
- sitemap duplicate and local-file existence checks
- local static HTTP smoke checks for the three changed module routes and `/sitemap.xml`
- `git diff --check`

## Regression Risks Over 10%

- **10-15% SEO discovery/reporting shift**: Adding three module pages to the sitemap can change crawl allocation and impression distribution across module pages. Mitigation: only self-canonical, indexable pages with visible module content and demo CTAs were added.
- **10-12% analytics baseline shift**: Module-detail page views, scroll depth, and CTA events may increase because these pages now load the shared analytics stack. Mitigation: no existing event names were removed or collapsed.

## Data Gaps

- No live Google Search Console query/page data was available in this run.
- No GA4, Clarity, rank-tracking, heatmap, or click-depth export was available in this run.
- No production log or Netlify deploy verification was run because this was a no-deploy approval workflow.

## Next Recommended Growth Experiment

Normalize tracking on the comparison and use-case pages that remain in the sitemap but still lack the shared website analytics stack. This should improve demo-intent attribution from high-intent SEO pages without changing visible content.
