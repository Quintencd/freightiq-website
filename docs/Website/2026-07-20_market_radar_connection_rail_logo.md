# Market Radar Connection Rail Logo

Date: 2026-07-20
Scope: FlowIQ marketing website homepage
Deployment: not deployed

## Objective

Add the user-supplied Market Radar brand mark to the existing scrolling commerce-and-banking connection rail without changing FlowIQ's integration claims, rail structure, or premium visual system.

## Changes

- Added Market Radar after Takealot in both duplicated rail sets, keeping the continuous marquee loop visually complete.
- Used `Market Radar logo` alternative text in the primary set and an empty alternative in the `aria-hidden` duplicate set so assistive technology does not announce the same mark twice.
- Created `assets/img/integrations/market-radar-logo.webp` from the supplied 2172 x 724 PNG.
- Resized the local asset to 600 x 200 and encoded it as a 12 KB WebP while retaining the supplied logo composition and white background.
- Added the Market Radar class to the existing equal-width transparent mark group. The shared image rules continue to constrain the rendered mark within the fixed-height rail.
- Updated the homepage `lastmod` to `2026-07-20` in both sitemap copies.

## Files Changed

- `index.html`
- `assets/css/homepage-premium.css`
- `assets/img/integrations/market-radar-logo.webp`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-07-20_market_radar_connection_rail_logo.md`

## Validation

- The optimized asset decodes as a 600 x 200 WebP and is 12 KB.
- HTML contract checks confirmed exactly one Market Radar mark in each duplicated rail set, descriptive alternative text on the primary mark, empty alternative text on the hidden duplicate, and structurally identical sequences.
- Browser checks confirmed the asset loads at 600 x 200, renders at 105 x 35 within the mobile rail, remains contained without page overflow, and produces no console errors.
- The active `integration-rail-scroll` animation and equal 1,117 px duplicated desktop set widths were preserved.
- Root/public sitemap parity and the `2026-07-20` homepage `lastmod` passed.
- Local HTTP smoke checks passed for the homepage, homepage stylesheet, and Market Radar asset.
- `git diff --check` passed.

## Regression Risks Over 10%

- **10-15% brand-positioning risk:** visitors may interpret a named brand mark as an endorsement or certified partnership. Mitigation: the rail is labelled as connection solutions and retains the explicit statement that brand marks do not imply affiliation, endorsement, or certified partnership.
- **10-12% rail-cadence risk:** the additional wide logo increases the sequence length and can alter the perceived speed. Mitigation: it uses the rail's existing fixed footprint, the same duplicated ordering, and the established constant-duration animation.

## Release Boundary

No application integration code, credentials, pricing, customer onboarding, or Netlify configuration changed. No deployment was performed; release remains through the user's GitHub workflow.
