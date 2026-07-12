# Site-wide premium visual-system rollout

Date: 2026-07-12
Scope: all public FlowIQ marketing-site page families
Deployment: not deployed

## Outcome

Extended the approved homepage visual direction across the marketing website through one shared, runtime-loaded design-system stylesheet. The rollout covers every public page that uses the canonical `assets/js/main.js` website shell while leaving email templates, verification files, internal previews, and generated dependency HTML untouched.

The shared layer is `assets/css/site-premium.css`. `assets/js/main.js` loads the versioned stylesheet after the legacy light-theme layer and assigns each route its established `fiq-family-*` class.

## Design contract

The site-wide system standardizes:

- warm-white and stone surfaces;
- charcoal editorial typography with lighter headline weights;
- FlowIQ orange as the controlled brand accent;
- quiet header trial buttons and refined dropdown surfaces;
- thin borders and reduced shadows;
- consistent hero, content-card, form, pricing-table, and footer treatments;
- strong FlowIQ-orange conversion bands with dark primary actions;
- compact solution CTA controls matching the homepage: charcoal primary actions and light secondary actions with black text and icons;
- responsive typography, spacing, and stacked solution layouts.

## Solution artwork

The existing solution imagery remains intact. Importer, retail/ecommerce, manufacturing, and multi-branch hero images keep their original files, source sets, dimensions, alt text, eager loading, and fetch priority. The new visual system presents them in a larger editorial split layout with a restrained border, tighter radius, and controlled shadow.

## Page-family coverage

The shared system covers:

- homepage;
- solutions;
- modules and module detail pages;
- walkthroughs;
- pricing;
- customers and case studies;
- signup, login, book-demo, and thank-you conversion pages;
- tools and calculators;
- comparison pages;
- glossary pages;
- use cases;
- long-tail accounting, inventory, import, ERP, payroll, freight, forecasting, and landed-cost articles;
- legal and standard marketing pages.

## SEO, GEO, and analytics preservation

This rollout does not rename or remove public routes, canonical URLs, metadata, robots directives, visible search copy, JSON-LD, sitemaps, `llms.txt`, analytics scripts, or established conversion attributes.

The homepage prototype had temporarily replaced the established visible H1 and lead paragraph. Those exact indexed strings were restored before closing this rollout:

- `The ERP-style business platform that grows with you.`
- the existing accounting, stock, purchasing, sales, operations, reporting, importer, distributor, manufacturer, and scaling-team lead copy.

The automatic product-screen carousel changes only presentation. Its images use existing FlowIQ-owned product screenshots, dedicated optimized 2048px WebP sources, and descriptive alt text.

## Validation contract

Release checks include:

1. Compare live and local sitemap routes for exact title, description, canonical, robots, JSON-LD count, and analytics-script presence.
2. Confirm root/public sitemap, sitemap-index, and robots parity.
3. Confirm all sitemap routes respond locally.
4. Parse every JSON-LD block that is present on public HTML pages.
5. Confirm the premium shared stylesheet loads at runtime across representative page families.
6. Check representative page families for broken images, horizontal overflow, console errors, and preserved solution artwork.
7. Confirm homepage and conversion CTA analytics attributes remain present.

## Pre-existing production issue discovered

`https://www.flowiq.info/erp-for-multi-branch-businesses` is listed in the sitemap but returned HTTP 404 during the live/local parity audit. The local page and the matching canonical rewrite already exist in `netlify.toml`, so this appears to be production deploy drift rather than a missing repository rule. The next GitHub-driven website deployment should be checked specifically for this route. No Netlify deployment was run from Codex.

## Regression risks and mitigation

- **20-30% cross-template cascade risk:** 100+ public pages include legacy utility and page-specific styling. Mitigation: the new layer is centralized, page-family scoped, loaded after the legacy system, and leaves page markup and search contracts unchanged.
- **15-20% conversion-control risk:** shared button rules can unintentionally restyle navigation or form controls. Mitigation: header, primary CTA, secondary action, and form selectors have separate explicit contracts.
- **15-20% image-composition risk:** solution artwork could be cropped or displaced across breakpoints. Mitigation: original assets, aspect ratios, alt text, source sets, and loading priorities are preserved; solution heroes stack below 960px.
- **10-15% analytics risk:** visual CTA changes can lose event attributes. Mitigation: no existing analytics scripts were changed, and established homepage/downstream attributes remain in the markup.
- **10-15% search-presentation risk:** changing visible hero copy can alter page relevance. Mitigation: the homepage H1 and lead were restored; other indexed page copy was not edited.

## Deployment boundary

No production deployment, Netlify publish, Git commit, or push was performed. The user will release the marketing site through the existing GitHub workflow after local review.
