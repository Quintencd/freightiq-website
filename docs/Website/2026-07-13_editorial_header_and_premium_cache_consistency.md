# Editorial header and premium cache consistency

Date: 2026-07-13

## Outcome

The compare, glossary, and use-case page family now follows the premium homepage's editorial hierarchy, spacing rhythm, orange conversion treatment, and connected-card language. The rollout preserves every indexed route and its SEO/analytics contract.

## Root cause

The shared premium stylesheet was loaded dynamically by `assets/js/main.js`, while public HTML pages still requested the immutable `main.js?v=11` asset. A previously cached script could therefore omit the newest premium visual system. The compare, glossary, and use-case resource pages also retained their older centred utility-page composition.

## Implementation

- Bumped the public `main.js` query contract from `v=11` to `v=12` across public HTML pages.
- Bumped the dynamically loaded premium stylesheet contract from version `1` to `2`.
- Added the path-scoped `fiq-editorial-index` body class for compare/glossary hubs and use-case pages.
- Added responsive, family-scoped presentation rules in `assets/css/site-premium.css`.
- Preserved titles, descriptions, canonical URLs, robots directives, structured data, analytics hooks, page copy, CTA destinations, and document order.

## Validation

- 105 tracked HTML files were byte-identical to `HEAD` after normalising only the `main.js` query version.
- All 84 sitemap routes returned HTTP success from the local preview.
- `assets/js/main.js` passed `node --check` and the stylesheet brace balance was zero.
- Desktop checks ran at 1280 x 720; mobile checks ran at 390 x 844.
- Homepage, importer solution, compare, glossary, and use-case pages showed no horizontal overflow or broken images.
- The checked final page state produced no browser console errors.

## Regression controls

The new visual rules are scoped to `fiq-editorial-index`; other site families continue to use their existing premium rules. The cache-version update changes asset freshness only and does not alter URL routing or search metadata.

## Release boundary

No Netlify deploy, Git push, or production release was performed.
