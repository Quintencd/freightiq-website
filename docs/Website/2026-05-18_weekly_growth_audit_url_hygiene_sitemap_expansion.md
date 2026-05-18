# Weekly Growth Audit — URL Hygiene + Sitemap Expansion

Date: 2026-05-18  
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Why this change

Two recurring SEO issues were present:

1) The sitemap covered only a small subset of the site (34 URLs) while the repo contains far more indexable pages.
2) The sitemap included redirecting URLs (301s), which wastes crawl budget and can create indexing ambiguity.

This pass focuses on **URL hygiene** (one canonical winner) and **sitemap completeness** (discoverability) with minimal content churn.

## Changes made

### 1) Expanded sitemap coverage (34 → 50 URLs)

Added high-intent entry pages that were already live and indexable but missing from the sitemap, including:

- Core navigation hubs: `/solutions/`, `/use-cases/`, `/tools/`, `/compare/`, `/glossary/`
- Key conversion pages: `/pricing`, `/who-flowiq-is-for`, `/brochure`
- Core SEO landers: `accounting-software.html`, `bookkeeping-software.html`, `payroll-software.html`, `import-erp-software.html`, `inventory-software-for-importers.html`, `manufacturing-inventory-software.html`, `freight-forwarder-software.html`

Excluded from sitemap intentionally:

- `book-demo.html` (explicit `noindex,follow`)
- `video-preview.html` (explicit `noindex,nofollow`)
- Signup/login routes (not intended for organic discovery)

Files:
- `sitemap.xml`
- `public/sitemap.xml` (kept in sync)

### 2) Removed redirecting URLs from sitemap by fixing route behavior

Adjusted Netlify routing so these canonical URLs no longer rely on redirects:

- `/pricing` now serves content via rewrite, while `/pricing.html` 301s to `/pricing`
- `/who-flowiq-is-for` now serves content via rewrite, while `/who-flowiq-is-for.html` 301s to `/who-flowiq-is-for`
- `/customers` and `/walkthroughs` now serve their index pages via rewrite and enforce no trailing-slash canonical

Files:
- `netlify.toml`

### 3) Added missing SEO head primitives on key pages

Added `robots`, `canonical`, OpenGraph, and Twitter meta tags to improve snippet consistency and reduce indexing ambiguity:

- `who-flowiq-is-for.html`
- `landing.html`
- `brochure.html`

## Regression risks (>10%)

- **10–20%**: Temporary SEO volatility while crawlers reconcile canonical + redirect changes (expected; should settle after re-crawl).
- **10–15%**: Analytics attribution drift if some traffic previously landed on `.html` variants that now 301 to pretty URLs (page_path changes, but content and tracking remain intact).

## Validation performed

- Confirmed sitemap/robots parity between root and `public/` copies.
- Verified sitemap URL count is now 50.
