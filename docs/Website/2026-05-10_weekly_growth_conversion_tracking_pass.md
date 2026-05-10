# Weekly Growth Conversion Tracking Pass

Date: 2026-05-10
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Audit Summary

Reviewed the static marketing-site structure, README ownership notes, existing Website docs, homepage, pricing page, demo page, shared navigation, sitemap copies, and analytics scripts.

Highest-impact observations:

- Homepage already has strong product proof, customer proof, walkthrough access, and trial CTA, but above-the-fold positioning could be clearer for importer, distributor, manufacturer, and scaling operational buyers.
- Existing analytics covers page views, CTA clicks, scroll depth, calculator inputs, form submissions, pricing views, and module pages, but some homepage demo/video interactions were not cleanly mapped into growth events.
- Pricing page has a strong comparison table and plan-selection CTA, but FAQ schema did not yet cover plan-fit, migration help, and upgrade-path questions that search and paid visitors commonly need.
- Root `sitemap.xml` and `public/sitemap.xml` are currently in sync. No sitemap edit was needed in this pass.

## Implemented In This Cycle

1. Homepage positioning and CTA clarity
   - Updated homepage title, meta description, Open Graph/Twitter copy, and JSON-LD to lead with ERP-style operating platform positioning for importers, distributors, manufacturers, and growing teams.
   - Updated hero H1/supporting copy to make the target buyer clearer without changing the existing visual structure.
   - Added a direct hero demo CTA while keeping trial primary and preserving a pricing-path link.

2. Growth analytics hardening
   - Mapped `demo_click`, `view_pricing`, `pricing_toggle`, `module_engagement`, and `video_engagement` into the website analytics event stream.
   - Added video open/play/progress/complete tracking for product overview videos.
   - Added module engagement visibility tracking for module cards and module links.
   - Added explicit analytics labels to homepage walkthrough, video, demo, and pricing CTAs.

3. Pricing conversion and SEO clarity
   - Added FAQ schema entries for upgrading plans, migration assistance, and plan-fit walkthroughs.
   - Added billing interval toggle tracking through the existing pricing toggle function.

## Files Changed

- `index.html`
- `pricing.html`
- `assets/growth-analytics.js`
- `CHANGELOG.md`
- `docs/Website/2026-05-10_weekly_growth_conversion_tracking_pass.md`

## Why This Helps

- Demo intent is easier to express above the fold without removing the lower-commitment trial path.
- Analytics can now distinguish pricing curiosity, demo intent, product-video engagement, and module engagement more cleanly.
- Pricing page FAQ schema better matches bottom-funnel search questions around migration, plan fit, and scaling without inventing claims or testimonials.

## Regression Risks

- 10-14%: Homepage CTA attribution may shift because the hero now has a visible demo CTA alongside trial and pricing. Mitigation: trial remains the primary orange CTA, pricing remains available as a tertiary link, and events are now labeled by position.
- 10-12%: New visibility tracking can slightly increase analytics event volume on module-heavy pages. Mitigation: module engagement uses IntersectionObserver, a 55% visibility threshold, and a per-label session guard on each page.

## Next Recommended Growth Experiment

Create one focused importer/distributor landing-page experiment that routes paid and organic traffic into:

- industry-specific pain framing,
- one product-flow proof section,
- one credible customer proof block,
- one calculator or workflow self-assessment,
- one demo CTA and one trial CTA,
- clear comparison links against spreadsheets, Cin7, Odoo, Sage, Xero, and NetSuite.

This is likely a better next step than another broad homepage rewrite because it isolates conversion learning by buyer type.
