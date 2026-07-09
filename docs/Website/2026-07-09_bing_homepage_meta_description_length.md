# Bing Homepage Meta Description Length

Date: 2026-07-09
Scope: FlowIQ marketing website homepage in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Context

Bing Webmaster Tools URL Inspection confirmed `https://www.flowiq.info/` is indexed successfully and can appear on Bing, but reported one SEO/GEO issue: `Meta Description too long or too short`.

The homepage meta description was 205 characters, which is longer than the practical search-snippet range Bing expects.

## Change

Shortened the homepage `<meta name="description">` in `index.html` to 149 characters:

`FlowIQ connects accounting, inventory, purchasing, sales, operations, payroll, reporting, and automation for importers, distributors, and growing teams.`

The new copy keeps the core positioning and high-value keywords while fitting a safer search-snippet length.

## Validation

- Confirmed the homepage meta description is now 149 characters.
- Confirmed root and public `robots.txt` files remain in parity.
- Confirmed root and public `sitemap.xml` files remain in parity.

## Regression Risk

No identified regression risk above 10%.

The change only adjusts homepage search metadata. It does not change visible homepage content, sitemap entries, redirects, analytics, structured data, or deployment configuration.
