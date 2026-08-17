# Weekly Growth Audit: Research Directory Schema

Date: 2026-08-17  
Scope: FlowIQ marketing website only  
Release state: implemented for local review; not deployed

## Outcome

This weekly pass implemented the three safest high-confidence improvements found
in the audit:

1. converted the use-case hub from generic product schema to a page-specific
   `CollectionPage` with its two visible use cases;
2. converted the tools hub to a `CollectionPage` with all seven visible
   calculators in their displayed order;
3. converted the comparison hub to a `CollectionPage` with all three visible
   comparison routes in their displayed order.

The changes are metadata-only. Visible copy, claims, CTAs, forms, navigation,
analytics event names, runtime behavior, and layout are unchanged.

## Prioritized Growth Findings

1. **High - three research directories described the product, not the page.**
   The use-case, calculator, and comparison hubs were indexable, canonical, and
   internally linked, but their JSON-LD identified each page only as the FlowIQ
   software product. Search systems therefore received no explicit directory or
   child-page relationship.
2. **Medium-high - visible hub links were not represented in structured data.**
   The two use cases, seven calculators, and three comparisons were discoverable
   in HTML but absent from an `ItemList` contract.
3. **Medium - the current traffic mix does not justify a visible CTA test.**
   Production analytics since the prior run recorded 383 page views, of which
   327 were on the homepage. The tools hub recorded two page views; neither the
   use-case hub nor comparison hub recorded a page view. Only one demo start was
   recorded and no demo submission appeared.
4. **Medium - several calculator detail pages still have incomplete accessibility
   and reporting metadata in this checkout.** Those changes were addressed in a
   prior isolated audit but are not present across every calculator in this
   canonical folder. Repeating that larger patch was intentionally avoided in
   this cycle pending review of the earlier work.
5. **Medium - public CDN dependencies remain a performance and resilience risk.**
   Tailwind, Google Fonts, and Lucide remain externally loaded on multiple
   indexed pages. Local bundling is broader than this safe metadata pass.

## Top Three Improvements Implemented

### 1. Use-case directory contract

- Added `CollectionPage` meaning for `/use-cases/`.
- Added a two-item `ItemList` matching True Landed Cost Per SKU and Supplier
  Price Creep.

Why it helps: the page and its visible problem-led destinations now have an
explicit search relationship without changing conversion behavior.

### 2. Calculator directory contract

- Added `CollectionPage` meaning for `/tools/`.
- Added a seven-item `ItemList` matching the visible calculator order.

Why it helps: search systems can interpret the tools hub as a curated calculator
directory rather than a duplicate description of the FlowIQ product.

### 3. Comparison directory contract

- Added `CollectionPage` meaning for `/compare/`.
- Added a three-item `ItemList` matching the visible comparisons.

Why it helps: the evaluation journey and its child comparisons now have
page-specific structured meaning with no new or unsupported competitor claim.

## Production Evidence

Read-only query time: 2026-08-17 07:14:17 UTC  
Database host: `10.106.5.114`, port 5432  
Window: 2026-08-10 07:00:19.505 UTC through query time

- 383 `web_page_view` events across 199 identified sessions
- 294 module engagements across 31 identified sessions
- 65 scroll-depth events across 35 identified sessions
- 59 CTA clicks across 40 identified sessions
- 15 onboarding starts and 2 signup completions
- 7 pricing views across 4 identified sessions
- 4 video engagements from 1 identified session
- 1 demo start and no demo submission
- 327 homepage page views, 12 pricing page views, and 2 tools-hub page views
- no recorded use-case-hub or comparison-hub page views

The query was direct, read-only PostgreSQL using `DATABASE_URL` from the main
app's local environment. No database write, migration, repair, or deployment was
performed.

## Files Changed

- `use-cases/index.html`
- `tools/index.html`
- `compare/index.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-08-17_weekly_growth_audit_research_directory_schema.md`

## Validation

- parse each changed JSON-LD block as JSON
- assert `CollectionPage`, canonical URL, description parity, `ItemList` count,
  position order, and visible-link parity on all three hubs
- run shared analytics JavaScript syntax checks
- run the module marketing validator
- verify sitemap URL uniqueness and root/public sitemap, robots, and index parity
- run local HTTP final-200 smoke checks for the three hubs and sitemap files
- run `git diff --check`

## Regression Risks Above 10%

- **10-12% crawl-refresh risk:** refreshed `lastmod` values may prompt search
  engines to revisit the three hubs. Mitigation: URLs, canonicals, visible copy,
  and links remain unchanged; every schema item matches a visible directory
  link, and root/public sitemap copies remain synchronized.

No runtime or visual regression risk above 10% was identified because the patch
does not change JavaScript, CSS, forms, navigation, pricing, or visible content.

## Data Gaps

- Google Search Console queries, impressions, CTR, position, and indexing data
- GA4 reports or raw export
- Microsoft Clarity/Smartlook recordings, heatmaps, rage clicks, and scroll maps
- external keyword ranking history
- field Core Web Vitals and real-user performance traces
- production CDN/request logs
- enough research-hub traffic to support a visible conversion experiment

## Next Recommended Growth Experiment

After approval, deployment, and enough research-hub traffic, test a restrained
result-adjacent `See this calculation in FlowIQ` CTA on the highest-volume
calculator. Measure calculator completion, CTA click, signup start, and demo
start by calculator ID without changing the underlying formula.

## Release Boundary

No Netlify deployment, Git push, commit, branch creation, database write,
migration, app change, or admin-console change was performed. The user must
approve these website-only changes before any live release.
