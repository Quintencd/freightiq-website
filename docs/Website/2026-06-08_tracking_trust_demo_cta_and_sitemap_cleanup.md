# Tracking Trust, Demo CTA Routing, and Sitemap Cleanup

Date: 2026-06-08
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

This pass fixed three related website-conversion issues found in the weekly growth audit:

- demo-intent clicks were undercounted on many SEO/comparison pages,
- multiple final CTAs said `Book a FlowIQ Demo` but still linked to trial signup,
- and the sitemap/canonical setup still exposed `landing.html` as an indexable duplicate while the sitemap also carried a duplicate URL entry.

## Changes

### 1) Demo click tracking now covers the real page patterns

- Updated `assets/growth-analytics.js` so demo CTA clicks are tracked when pages use:
  - `data-analytics-event="demo_click"`
  - `data-analytics-event="demo_request"` on links to `/book-demo`
  - `data-analytics-cta="...Book demo..."`
  - plain `/book-demo` links with demo wording
- Preserved `demo_request` as the submit-stage event for actual form submissions.

This keeps the funnel split clearer:

- demo CTA click -> `web_demo_request_start`
- demo form submit -> `web_demo_request_submit`

### 2) Final demo CTAs now route to the demo form

- Updated 25 SEO/comparison landing pages where the final CTA copy said `Book a FlowIQ Demo` but linked to `/signup`.
- Those links now go to `/book-demo.html`, matching visitor intent and reducing attribution drift between demo and trial paths.

### 3) Landing-page duplicate indexing was reduced

- Changed `landing.html` from self-indexing to:
  - `noindex,follow`
  - canonical to `https://www.flowiq.info/`
  - `og:url` aligned to the homepage
- Removed `landing.html` from both sitemap copies.
- Removed the duplicate `why-spreadsheet-landed-costs-fail` sitemap entry.
- Refreshed `lastmod` to `2026-06-08` for the URLs changed in this pass.

## Validation

- `node --check assets/growth-analytics.js`
- Confirmed the old mismatched final-demo pattern no longer exists:
  - `rg -l 'href="/signup"[^\\n>]*>Book a FlowIQ Demo' ...` -> `0`
- Confirmed sitemap parity remains intact:
  - `sitemap.xml` == `public/sitemap.xml`
- Confirmed no duplicate sitemap URLs remain.

## Regression Risks (>10%)

- **15-25%**: Demo-start reporting will likely increase because many previously untracked demo clicks now map into the canonical funnel.
- **15-25%**: Trial-vs-demo mix can shift because 25 final CTAs now send demo-labeled intent to the demo form instead of signup.
- **10-20%**: `landing.html` may lose any standalone index footprint after the noindex/canonical cleanup, which is intentional to reduce duplicate-page ambiguity.

## Deployment Note

- No Netlify deploy was run.
- The user requested website deploys continue through GitHub rather than direct Netlify publishing.
