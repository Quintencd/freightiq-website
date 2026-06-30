# Weekly Growth Audit: Sitemap, Pricing Trust, and CTA Tracking

Date: 2026-06-29
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

This weekly website growth pass implemented the top three safest high-confidence improvements from the audit:

- expanded sitemap coverage for canonical, indexable high-intent detail pages;
- fixed the remaining public pricing-page trial-duration mismatch from `30-Day Free Trial` to `14-Day Free Trial`;
- mapped newer pricing/module CTA events into the canonical website analytics stream.

No Netlify deploy, push, or commit was performed.

## What Changed

### 1) Sitemap coverage for high-intent detail pages

Added canonical, indexable detail pages to both `sitemap.xml` and `public/sitemap.xml`:

- calculator pages under `/tools/`;
- canonical solution detail pages;
- use-case detail pages;
- comparison detail pages under `/compare/`;
- glossary detail pages;
- canonical module detail pages.

Pages intentionally excluded:

- `book-demo.html`, because it is marked `noindex,follow`;
- legacy or duplicate solution pages that canonicalize to `/solutions/importers.html`;
- module draft pages without a self-canonical tag;
- email templates, backups, login pages, and verification files.

### 2) Pricing trial-duration trust copy

Updated the pricing-page trust badge from `30-Day Free Trial` to `14-Day Free Trial`, matching the current public signup copy and backend trial contract.

### 3) Pricing and module engagement analytics mapping

Updated `assets/growth-analytics.js` so newer pricing-page events also reach the canonical Supabase-backed website analytics stream:

- `pricing_start_trial_click` -> `web_signup_start`;
- `pricing_book_demo_click` -> `web_demo_request_start`;
- `pricing_base_plan_view` -> `web_pricing_view`;
- `module_preview_view` and `module_preview_click` -> `web_module_engagement`.

This keeps GA/dataLayer event names intact while improving Founder Console website reporting coverage.

## Files Changed

- `assets/growth-analytics.js`
- `pricing.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-06-29_weekly_growth_audit_sitemap_pricing_tracking.md`

## Validation

- `node --check assets/growth-analytics.js`
- `node --check` for the inline scripts extracted from `pricing.html`
- sitemap parity check: `sitemap.xml` matches `public/sitemap.xml`
- sitemap duplicate and local-file existence checks
- JSON-LD parsing checks for changed/smoked HTML pages
- local static HTTP smoke checks for representative changed pages
- `git diff --check`

## Regression Risks Over 10%

- **10-15% SEO discovery/reporting shift**: Adding omitted canonical detail pages to the sitemap can change crawl priority and impression distribution across modules, calculators, glossary, and solution pages. Mitigation: only self-canonical, indexable growth pages were added.
- **10-12% analytics baseline shift**: Pricing/module engagement counts may rise because existing pricing events now also map to canonical internal events. Mitigation: event names were not collapsed; click, view, demo-start, and signup-start semantics remain separate.

## Data Gaps

- No live Google Search Console query/page data was available in this run.
- No GA4, Clarity, rank-tracking, heatmap, or click-depth export was available in this run.
- The audit used current code, docs, metadata, sitemap, and local static checks only.

## Next Recommended Growth Experiment

Add self-canonical tags and consistent `data-page-*` metadata to the remaining module draft pages (`journaliq`, `manufacturing`, `taskiq`) before adding them to the sitemap. This would reduce crawl ambiguity and make module-level reporting more complete without changing the visible page experience.
