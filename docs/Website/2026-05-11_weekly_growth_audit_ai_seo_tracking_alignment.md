# Weekly Growth Audit — AI-SEO Conversion + Tracking Alignment

Date: 2026-05-11  
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## What was reviewed (evidence-based)

- Repo ownership and workflow notes in `README.md`.
- Latest website growth docs under `docs/Website/`.
- AI-SEO landing templates (industry, comparisons, articles) and the shared CTA patterns.
- Tracking scripts and wiring:
  - `/website-analytics.js`
  - `/assets/website-analytics.js`
  - `/assets/growth-analytics.js`
- Sitemap and robots parity (root vs `public/` copies).

## Data gaps (not available in this run)

- No Google Search Console query/click/impression data available.
- No GA4 dashboard access or event counts available.
- No Microsoft Clarity session data available.

This report therefore prioritizes code/content correctness + tracking coverage improvements that should be positive regardless of exact traffic mix.

## Highest-impact findings (ranked)

1) **Misleading conversion routing on AI-SEO pages**
   - Multiple AI-SEO pages showed a primary CTA labeled **“Book Demo”** but linked to `/signup` (trial signup).
   - This is a trust + friction risk: intent mismatch increases bounce and misclassifies funnel behavior.

2) **AI-SEO pages were using legacy tracking**
   - Many AI-SEO pages loaded `/website-analytics.js` (legacy) and did not set `window.FlowIQAnalyticsConfig`.
   - That prevented consistent GA4/GTM/Clarity wiring and reduced funnel comparability vs the rest of the site.

3) **AI-SEO pages were not tagged as `seo-landing` for funnel analytics**
   - The AI-SEO pages did not set `data-page-template="seo-landing"`, so `seo_landing_view` logic in `assets/growth-analytics.js` never fired.

## Implemented this cycle (top 3 safest improvements)

### 1) Fix “Book Demo” CTA links to route to the demo form

- Updated primary “Book Demo” CTAs on AI-SEO pages (and the two customer case studies) from `/signup` → `/book-demo.html`.
- Keeps the label and routing consistent, reducing bounce and improving funnel intent clarity.

### 2) Make `/website-analytics.js` a bootstrapper for canonical tracking

- Replaced the legacy `/website-analytics.js` implementation with a small bootstrapper that:
  - sets a default `window.FlowIQAnalyticsConfig` if missing, and
  - loads `/assets/website-analytics.js` and then `/assets/growth-analytics.js`.
- This fixes tracking drift without touching every AI-SEO page template.

### 3) Tag AI-SEO pages as `seo-landing` for funnel analytics

- Added:
  - `data-page-template="seo-landing"`
  - `data-page-intent="seo_landing"`
  to all pages with `data-landing-variant="ai-seo"`.
- Enables `seo_landing_view` instrumentation and improves reporting segmentation.

## Files changed

- Tracking:
  - `website-analytics.js`
  - `assets/website-analytics.js`
- AI-SEO pages (conversion + analytics tagging):
  - `consolidated-shipment-management.html`
  - `container-cost-allocation.html`
  - `erp-for-distributors.html`
  - `erp-for-importers.html`
  - `erp-for-manufacturers.html`
  - `erp-for-wholesalers.html`
  - `flowiq-vs-cargowise.html`
  - `flowiq-vs-cin7.html`
  - `flowiq-vs-netsuite.html`
  - `flowiq-vs-odoo.html`
  - `flowiq-vs-spreadsheets.html`
  - `forecasting-for-distributors.html`
  - `how-importers-lose-margin-without-knowing.html`
  - `how-to-allocate-freight-costs-correctly.html`
  - `how-to-forecast-inventory-properly.html`
  - `import-cost-management.html`
  - `inventory-forecasting-software.html`
  - `inventory-planning-for-importers.html`
  - `landed-cost-calculator.html`
  - `stock-shortage-prevention.html`
  - `the-hidden-cost-of-manual-erp-processes.html`
  - `the-real-cost-of-stockouts.html`
  - `true-landed-cost-software.html`
  - `why-multi-supplier-containers-create-costing-errors.html`
  - `why-spreadsheet-landed-costs-fail.html`
- Case studies (CTA routing only):
  - `customers/biomek-case-study.html`
  - `customers/ce-legal-case-study.html`

## Validation performed

- `node --check website-analytics.js`
- `node --check assets/website-analytics.js`
- `node --check assets/growth-analytics.js`
- `git diff --check`
- Confirmed parity:
  - `sitemap.xml` == `public/sitemap.xml`
  - `sitemap-index.xml` == `public/sitemap-index.xml`
  - `robots.txt` == `public/robots.txt`

## Regression risks (>10%)

- **12–18%**: Some AI-SEO traffic that previously entered via trial signup (despite a “Book Demo” label) will now correctly route to demo booking; this can change the trial-vs-demo split and downstream conversion attribution.
- **10–15%**: AI-SEO pages will now load the same analytics stack as the rest of the site via the `/website-analytics.js` bootstrapper (GTM/GA4/Clarity if not explicitly configured elsewhere). This may slightly increase third-party requests and should be reviewed against any consent/compliance expectations for those routes.

## Next recommended experiment (next weekly cycle)

Build a single “buyer-intent” landing test for **Importers** (or **Distributors**) that:

- focuses on one painful workflow (e.g. *true landed cost accuracy → price/margin control*),
- includes one calculator entry point,
- includes 1 demo CTA and 1 trial CTA,
- routes comparison links to 1–2 most common alternatives,
- and uses a single primary conversion goal (demo request) with a secondary (trial start).

This isolates learning more cleanly than broad homepage changes.

