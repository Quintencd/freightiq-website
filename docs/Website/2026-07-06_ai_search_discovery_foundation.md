# AI Search Discovery Foundation

Date: 2026-07-06
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

Implemented the first live-site foundation for AI search and chat discovery.

This rollout makes FlowIQ easier for search-oriented AI crawlers and traditional search engines to crawl, classify, quote, and connect to the right solution pages. It does not guarantee placement in AI answers, but it improves the technical and content foundation for discovery.

## What Changed

### 1) `llms.txt`

Added:

- `llms.txt`
- `public/llms.txt`

The file gives AI/search systems a concise canonical summary of FlowIQ, priority URLs, module summaries, direct answers, and contact details.

### 2) AI/Search Crawler Rules

Updated both:

- `robots.txt`
- `public/robots.txt`

Added explicit allow rules for:

- `OAI-SearchBot`
- `ChatGPT-User`
- `PerplexityBot`
- `ClaudeBot`
- `Googlebot`
- `Bingbot`

The existing default `User-agent: *` allow behavior and sitemap declarations remain.

### 3) Sitemap Discovery

Added `https://www.flowiq.info/llms.txt` to both:

- `sitemap.xml`
- `public/sitemap.xml`

Root and public sitemap copies remain synchronized.

### 4) Homepage Structured Data

Strengthened homepage JSON-LD with:

- `Organization`
- `WebSite`
- `WebPage`
- `SoftwareApplication`
- `FAQPage`

The new FAQ schema directly answers:

- What is FlowIQ?
- Who is FlowIQ best for?
- Is FlowIQ an ERP?

### 5) Homepage Answer Copy

Added a compact, polished homepage section using existing `fresh-section` and `proof-card` patterns. The section gives visitors and AI crawlers direct, visible answers about FlowIQ without changing the page's visual system or introducing a new design language.

## Files Changed

- `llms.txt`
- `public/llms.txt`
- `robots.txt`
- `public/robots.txt`
- `sitemap.xml`
- `public/sitemap.xml`
- `index.html`
- `CHANGELOG.md`
- `docs/Website/2026-07-06_ai_search_discovery_foundation.md`

## Safety Boundary

No pricing, signup, checkout, analytics event names, lead forms, Netlify deploy, database schema, Supabase function, or app code changed.

## Validation

Recommended validation for this rollout:

- parse homepage JSON-LD;
- confirm root/public `robots.txt` parity;
- confirm root/public `sitemap.xml` parity;
- confirm root/public `llms.txt` parity;
- smoke-test `/`, `/llms.txt`, `/robots.txt`, and `/sitemap.xml`;
- visually check the homepage at desktop and mobile widths;
- run `git diff --check`.

## Regression Risks Over 10%

- **10-15% SEO/AI discovery shift**: Search and AI crawler behavior can change because FlowIQ is now easier to classify through `llms.txt`, explicit crawler rules, homepage FAQ schema, and direct answer copy.
- **10-12% homepage snippet interpretation shift**: Search engines may choose different snippets because the homepage now includes clearer answer blocks and FAQ schema.

## Risk Mitigation

- Kept claims conservative and aligned with existing module and solution positioning.
- Used existing homepage card styling instead of a new visual system.
- Kept root and public SEO files synchronized.
- Did not add broad new indexable landing pages in this pass.
- Did not deploy to Netlify.
