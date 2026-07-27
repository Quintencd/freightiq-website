# Weekly Growth Audit: Buyer-Journey Visibility and Tracking

Date: 2026-07-27  
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`  
Deployment: not deployed

## Outcome

This weekly pass implemented the three safest high-confidence improvements found
in the audit:

1. restored the brochure cover and page content that the shared premium-light
   runtime was recolouring dark-on-dark;
2. completed the Support page's SEO and measurement contract;
3. completed the Who FlowIQ Is For page's SEO and measurement contract.

The brochure improvement also adds the same measurement contract and a missing
meta description because the page is an indexed product-evaluation surface.
Visible claims, CTA destinations, forms, pricing, and customer proof remain
unchanged.

## Prioritized Growth Findings

1. **Critical — the brochure's core value proposition was visually hidden.**
   The shared runtime added `premium-light-page` to every page and its
   high-priority light-theme text rules overrode the brochure's intentionally
   dark page design. The cover title and subtitle computed as dark text on a
   dark background. This blocks product evaluation and weakens trust.
2. **High — three indexed buyer-journey pages were outside the canonical
   analytics stream.** Support, Who FlowIQ Is For, and Brochure loaded neither
   `/assets/website-analytics.js` nor `/assets/growth-analytics.js`. Page views,
   scroll depth, CTA intent, trial clicks, and brochure engagement could not be
   measured in Founder Console.
3. **High — the affected pages lacked consistent structured-data contracts.**
   Support and Who FlowIQ Is For had no JSON-LD. Brochure had no JSON-LD and no
   standard meta description despite having Open Graph copy.
4. **Medium — the current demo funnel needs better evidence before a visible
   CTA experiment.** Since the prior run, production analytics recorded 370
   page views, 52 CTA clicks, 57 signup starts, 33 scroll events, and no
   demo-start or demo-submit events. The three pages in this pass had no events
   because their analytics stack was absent.
5. **Medium — public-CDN dependencies remain a page-speed and resilience risk.**
   Tailwind CDN, Google Fonts, and/or Lucide CDN are still used by multiple
   indexed pages. This pass did not expand into a sitewide build-system change.
6. **Medium — Search Console and behavioral evidence remain unavailable.**
   Query-level search demand, CTR, rankings, field Core Web Vitals, heatmaps,
   and session recordings could not be used to rank copy experiments.

## Top Three Improvements Implemented

### 1. Brochure visibility, SEO, and measurement

- Added a narrow `data-preserve-page-theme` contract.
- Updated the shared shell to skip only the automatic premium-light theme when
  a page explicitly owns its own visual theme.
- Restored the brochure's white/copper cover title and readable light copy
  without removing shared navigation or changing the brochure layout.
- Added the canonical analytics scripts, reporting metadata, a standard meta
  description, and `WebPage` JSON-LD.

Why it helps: buyers can once again read the primary product promise and the
brochure becomes measurable as a product-evaluation journey.

### 2. Support page SEO and measurement

- Added `ContactPage` JSON-LD.
- Added support-specific reporting metadata.
- Added the canonical website and growth analytics scripts.

Why it helps: support, login, privacy, and Shopify-help intent can be measured
without changing the support workflow or collecting new form data.

### 3. Audience-fit page SEO and measurement

- Added `WebPage` JSON-LD.
- Added audience-fit reporting metadata.
- Added the canonical website and growth analytics scripts.

Why it helps: FlowIQ can now measure how qualified-fit research progresses to
trial intent while retaining the existing direct qualification copy.

## Audit Flow and Visual Evidence

1. **Support — healthy.** Clear task entry, direct email/open-product actions,
   readable hierarchy, and no desktop or mobile horizontal overflow.
   Screenshot: `weekly-growth-audit-captures/2026-07-27/01-support.png`.
2. **Who FlowIQ Is For — healthy with a future polish opportunity.** Qualification
   criteria are explicit and the trial action is clear. The page is long and
   visually repetitive, but changing its layout without behavior data was not
   justified this week. Screenshot:
   `weekly-growth-audit-captures/2026-07-27/02-audience-fit.png`.
3. **Brochure — restored and healthy in the first viewport.** The cover promise,
   supporting copy, shared navigation, and print action are visible after the
   scoped theme opt-out. Screenshot:
   `weekly-growth-audit-captures/2026-07-27/03-brochure.png`.

Screenshot review cannot prove complete WCAG conformance. Keyboard order, screen
reader announcements, color contrast across every brochure spread, zoom to
400%, and reduced-motion behavior still require dedicated accessibility testing.

## Files Changed

- `assets/js/main.js`
- `support.html`
- `who-flowiq-is-for.html`
- `brochure.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-07-27_weekly_growth_audit_buyer_journey_visibility_and_tracking.md`
- `docs/Website/weekly-growth-audit-captures/2026-07-27/01-support.png`
- `docs/Website/weekly-growth-audit-captures/2026-07-27/02-audience-fit.png`
- `docs/Website/weekly-growth-audit-captures/2026-07-27/03-brochure.png`

## Production Evidence

Read-only query time: 2026-07-27 07:04:28 UTC  
Database host: `10.106.5.114`  
Window: 2026-07-20 07:01:35 UTC through query time

- 370 `web_page_view`
- 205 `web_module_engagement`
- 57 `web_signup_start`
- 52 `web_cta_click`
- 33 `web_scroll_depth`
- 15 `web_pricing_view`
- 14 `web_signup_error`
- 13 `web_onboarding_start`
- 13 `web_onboarding_complete`
- no events for the three corrected page families because their tracking stack
  was absent

No database write, migration, repair, or deployment was performed.

## Validation

- JavaScript syntax checks for the changed shared runtime and both analytics files
- JSON-LD parsing and page-contract assertions for all three pages
- root/public sitemap parity, uniqueness, and changed-route `lastmod` checks
- local HTTP smoke checks for all three pages and both analytics assets
- desktop browser render checks with accepted screenshots
- mobile 375 px reflow and horizontal-overflow checks for all three pages
- browser console-error inspection
- `git diff --check`

## Regression Risks Above 10%

- **12-18% brochure-theme risk:** the brochure now opts out of the automatic
  premium-light content recolouring. Mitigation: the opt-out is explicit on one
  page, shared navigation remains enabled, and desktop/mobile render checks
  verify the intended dark brochure theme.
- **10-20% analytics baseline shift:** these page families will begin producing
  page-view, scroll, CTA, trial, and engagement events that were previously
  absent. Mitigation: existing event names and the canonical production-aware
  analytics stack are reused.
- **10-15% page-load/network risk:** three pages now request two established
  non-blocking analytics assets. Mitigation: rendering, navigation, support
  email, printing, and signup do not depend on analytics success.
- **10-12% crawl-refresh risk:** refreshed sitemap timestamps may prompt
  recrawling. Mitigation: canonicals and route locations are unchanged, and the
  new metadata accurately describes existing visible content.

## Data Gaps

- Google Search Console query, impression, CTR, position, and indexing exports
- GA4 report/dashboard or raw export access
- Clarity or Smartlook recordings, heatmaps, rage-clicks, and scroll maps
- external ranking history
- field Core Web Vitals and real-user performance traces
- production server/CDN request logs for pages that previously lacked analytics
- a post-release baseline for these newly measurable pages

## Next Recommended Growth Experiment

After approval, deployment, and at least two weeks of clean page-family data,
test one restrained outcome-led secondary CTA on Who FlowIQ Is For: compare
`Book a tailored demo` with the current trial-only end state. Use audience-fit
page sessions as the denominator and measure demo starts, trial clicks, and
qualified completions without changing the page's qualification criteria.

## Release Boundary

No Netlify deployment, Git push, commit, branch creation, database write, or
application/admin-console change was performed. The user must approve these
website-only changes before any live release.
