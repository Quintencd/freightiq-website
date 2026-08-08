# Search Console Indexing Canonicalization

Date: 2026-08-08  
Scope: FlowIQ marketing website only  
Release state: implemented and locally verified; not deployed

## Outcome

The live Google Search Console page-indexing report was reviewed before code
changes. The actionable code defect was isolated to attribution-decorated signup
URLs. The signup document did not declare either an indexing policy or a
canonical URL, so Google grouped 26 parameter variants under "Duplicate without
user-selected canonical".

The signup page now declares:

- `robots: noindex, follow`, consistent with the existing policy that signup is
  a conversion route and is intentionally excluded from the sitemap;
- `canonical: https://www.flowiq.info/signup`;
- a matching Open Graph URL.

Attribution query parameters remain intact for the signup flow and analytics.
No redirect, form, provisioning, Shopify claim, or tracking behavior changed.

## Live Search Console Triage

Search Console last updated the report on 2026-08-05. It showed 62 excluded
URLs across six active reasons:

- 26 duplicate URLs: tracking-decorated `/signup?...` variants. This was the
  actionable missing-canonical gap fixed here.
- 11 redirect URLs: expected canonical redirects.
- 9 alternative pages with proper canonical tags: extensionless aliases whose
  documents already point to the intended `.html` canonical. These are healthy
  exclusions and were not made independently indexable.
- 2 noindex URLs: intentional exclusions.
- 1 404 URL: `/m`, an unknown path with no valid site destination. It remains a
  correct 404 rather than being redirected to unrelated content.
- 13 crawled but not indexed URLs: a mixed group containing self-canonical,
  sitemap-listed content, one signup parameter variant, XML resources, an app
  favicon request, and known aliases. The listed crawl dates were March-June
  2026, before later sitemap/content passes for several pages.

## Validation

- Confirmed exactly one canonical, robots directive, and Open Graph URL on the
  signup page.
- Confirmed the canonical and Open Graph URL match `/signup`.
- Confirmed root and `public/` sitemap copies remain identical and do not list
  signup.
- Confirmed the signup attribution decorator remains unchanged.
- Ran HTML metadata assertions, sitemap parity checks, and `git diff --check`.

Search Console validation was not started because this workspace is not
deployed directly. Validation should be started only after the change reaches
production through the normal GitHub-driven release and the live HTML is
verified.

## Regression Risks Over 10%

No identified regression risk exceeds 10%. The patch changes only static head
metadata on a route already excluded from the sitemap. Query parameters,
registration behavior, analytics, and user-visible content are unchanged.

## Expected Search Console Movement

After deployment and recrawl, signup query variants should stop appearing as
duplicates without a user-selected canonical. Because signup is intentionally
not an organic landing page, those variants may remain reported as excluded by
`noindex`; that is the correct end state and does not suppress any intended SEO
landing page.
