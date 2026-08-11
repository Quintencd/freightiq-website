# Weekly Growth Audit: Solution Discovery Schema

Date: 2026-08-10  
Scope: FlowIQ marketing website only  
Release state: implemented and locally verified; not deployed

## Outcome

This weekly pass implemented the three safest high-confidence improvements found
in the audit:

1. added a `CollectionPage` schema contract and reporting metadata to the
   solutions directory;
2. added page-specific `WebPage` schema and reporting metadata to the four
   primary solution detail pages that lacked them;
3. added page-specific `WebPage` schema to the true-landed-cost use case and
   FlowIQ-versus-spreadsheets comparison page.

The patch changes only document metadata and matching sitemap timestamps.
Visible copy, claims, CTAs, forms, pricing, navigation, analytics event names,
tracking runtime behavior, and layout are unchanged.

## Prioritized Growth Findings

1. **High — solution discovery pages lacked explicit search meaning.** The
   solutions directory and the importer, manufacturing, multi-branch, and
   retail pages were indexable and canonical but had no JSON-LD. These pages
   are the clearest industry-fit paths between generic website traffic and a
   trial or tailored demo.
2. **High — solution reporting fell back to generic metadata.** The same five
   pages loaded the canonical analytics stack but did not declare a page
   template, buyer intent, or topic. Existing events therefore used generic
   fallback values instead of distinguishing solution discovery from other
   marketing traffic.
3. **Medium-high — the core landed-cost research journey had an incomplete
   structured-data contract.** The true-landed-cost explainer and the
   spreadsheet comparison page were indexable, internally linked, canonical,
   and tracked, but lacked page-specific JSON-LD.
4. **Medium — current traffic is too concentrated to justify a visible CTA or
   copy test.** Production analytics since the previous weekly run recorded 267
   page views, with 221 on the homepage. The four primary solution detail pages
   recorded eight page views in total, and the true-landed-cost page recorded
   one. No demo-start, demo-submit, signup-start, signup-complete, calculator-use,
   or video-engagement events appeared in the bounded production results.
5. **Medium — public-CDN dependencies remain a performance and resilience
   risk.** Tailwind, Google Fonts, and Lucide are still loaded from public CDNs
   on multiple indexed pages. Moving them into a local build is larger than a
   safe metadata-focused weekly pass.

## Top Three Improvements Implemented

### 1. Solution directory discovery contract

- Added `CollectionPage` JSON-LD using the existing title, canonical URL, and
  meta description.
- Added `solution-hub`, `solution_discovery`, and `flowiq solutions` reporting
  metadata to the body.

Why it helps: search systems receive explicit page purpose, while the existing
analytics stream can segment visits to the solution directory without a new
event name or runtime change.

### 2. Industry solution detail contracts

- Added page-specific `WebPage` JSON-LD to importer and distributor,
  manufacturing and assembly, multi-branch, and retail and ecommerce pages.
- Added `solution-detail`, `industry_solution_research`, and page-specific topic
  metadata to each page body.

Why it helps: industry-fit pages become easier for search systems to classify,
and future event evidence can distinguish each operating-model journey.

### 3. Landed-cost research contracts

- Added page-specific `WebPage` JSON-LD to the true-landed-cost use case and the
  FlowIQ-versus-spreadsheets comparison page.
- Reused each page's existing canonical URL and meta description; no new claim
  was introduced.

Why it helps: the linked problem-to-comparison journey now has explicit,
consistent page meaning without changing its conversion experience.

## Production Evidence

Read-only query time: 2026-08-10 07:03:53 UTC  
Database host: `10.106.5.114`, port 5432  
Window: 2026-08-03 07:01:20.493 UTC through query time

- 267 `web_page_view` events across 152 identified sessions
- 178 `web_module_engagement` events across 19 identified sessions
- 40 `web_scroll_depth` events across 19 identified sessions
- 37 `web_cta_click` events across 37 identified sessions
- 12 onboarding starts and 2 onboarding completions
- 2 pricing views across 1 identified session
- 8 page views across the four updated solution detail pages
- 1 page view on `/use-cases/true-landed-cost.html`
- no demo, signup, calculator-use, or video-engagement events in the bounded
  production result

The query was direct, read-only PostgreSQL using `DATABASE_URL` from the main
app's local environment. No database write, migration, repair, or deployment was
performed.

## Files Changed

- `solutions/index.html`
- `solutions/importers.html`
- `solutions/manufacturers.html`
- `solutions/multi-branch.html`
- `solutions/retail-outlets.html`
- `use-cases/true-landed-cost.html`
- `compare/flowiq-vs-spreadsheets.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-08-10_weekly_growth_audit_solution_discovery_schema.md`

Unrelated existing changes to `privacy.html`, `terms.html`, and the Meta/WhatsApp
legal-readiness note were not modified as part of this audit.

## Validation

- parsed every new JSON-LD block as JSON
- asserted one page-specific JSON-LD block, canonical URL, description, and
  canonical analytics stack on all seven affected pages
- asserted reporting metadata on the five solution discovery pages
- verified 104 unique sitemap URLs and root/public sitemap parity
- verified root/public sitemap-index and robots parity
- local HTTP smoke checks for all seven changed routes and both sitemap copies
- `git diff --check`

No visual styles or rendered content changed, so a new screenshot set was not
required for this metadata-only pass.

## Regression Risks Above 10%

- **10-12% crawl-refresh risk:** refreshed `lastmod` values may prompt search
  engines to revisit the seven pages. Mitigation: URLs, canonicals, visible
  copy, and claims remain unchanged; each JSON-LD description matches existing
  metadata and root/public sitemap copies remain synchronized.

No runtime or visual regression risk above 10% was identified because the patch
does not change JavaScript, CSS, forms, navigation, pricing, or visible content.

## Data Gaps

- Google Search Console query, impression, CTR, position, and current indexing
  data for the affected URLs
- GA4 reports or raw export
- Microsoft Clarity/Smartlook recordings, heatmaps, rage clicks, and scroll maps
- external keyword ranking history
- field Core Web Vitals and real-user performance traces
- production CDN/request logs
- enough post-release solution-page sessions to support a visible CTA test

## Next Recommended Growth Experiment

After approval, deployment, and enough solution-page traffic, test an
audience-specific demo label on the highest-volume industry page—for example,
`Book an importer workflow demo`—against the current generic `Book Demo` label.
Measure demo starts and qualified submissions by `page_topic`, while keeping the
trial path and underlying form unchanged.

## Release Boundary

No Netlify deployment, Git push, commit, branch creation, database write,
migration, app change, or admin-console change was performed. The user must
approve these website-only changes before any live release.
