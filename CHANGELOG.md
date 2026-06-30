# FlowIQ Marketing Website Changelog

## [1.3.15] - June 29, 2026

### Weekly Growth Sitemap, Pricing Trust, and CTA Tracking

- Expanded `sitemap.xml` and `public/sitemap.xml` with canonical, indexable high-intent detail pages for tools/calculators, solutions, use cases, comparisons, glossary entries, and module pages.
- Fixed the remaining pricing-page trust badge from `30-Day Free Trial` to `14-Day Free Trial`.
- Mapped newer pricing and module preview events into the canonical website analytics stream so pricing CTA clicks, base-plan visibility, and module-preview engagement reach internal reporting.
- Added documentation under `docs/Website/2026-06-29_weekly_growth_audit_sitemap_pricing_tracking.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: Organic crawl and impression distribution can shift as newly listed detail pages become easier for search engines to discover.
- **10-12%**: Pricing/module engagement reporting can increase because existing events now reach the canonical internal analytics stream.

## [1.3.14] - June 25, 2026

### Accountant Signup Email-Only Registration

- Removed the public `/signup` accountant-firm professional body and practitioner/registration number fields.
- Accountant firms now register with their FlowIQ email/password and complete firm-code activation inside Accountant HQ after login.
- Updated the signup notification payload so support emails no longer expect accountant registration values.
- Updated `public-signup` so accountant firm signup no longer fails when those registration values are absent.
- Added documentation under `docs/Website/2026-06-25_signup_accountant_email_only_hq_activation.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-12%**: Existing accountant visitors who expected to enter a professional registration number during public signup may look for that field. Mitigation: the public form is shorter, and the firm code is now captured in the authenticated Accountant HQ activation flow where the profile is actually managed.

## [1.3.13] - June 24, 2026

### Signup Duplicate-Submit Guard

- Added an in-flight guard to `/signup` so repeat clicks do not send parallel `public-signup` requests.
- This supports the backend `public-signup` duplicate-email guard deployed on the same date.
- No Netlify deploy was run.

### Signup Accountant Registration Restore

- Restored the accountant-firm registration block on `/signup` so selecting `Accountant Firm` reveals professional body and practitioner/registration number fields.
- Wired those fields into accountant-only validation and the `public-signup` payload using the backend's canonical field names plus existing aliases.
- Added the same registration values to the signup support notification.
- Added documentation under `docs/Website/2026-06-24_signup_accountant_registration_restore.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: Accountant-firm completion may drop for firms that do not have registration details ready, but the backend already requires these values, so the page now prevents hidden server-side failures.

## [1.3.12] - June 8, 2026

### Tracking Trust + Demo CTA + Sitemap Cleanup

- Updated `assets/growth-analytics.js` so demo CTA clicks are captured from the real website patterns, including `data-analytics-cta` demo labels and `/book-demo` links that previously fired the wrong event shape.
- Fixed 25 final CTAs that said `Book a FlowIQ Demo` but still routed to `/signup`; they now route to `/book-demo.html`.
- Changed `landing.html` to `noindex,follow` with the homepage as canonical and removed it from both sitemap copies.
- Removed the duplicate `why-spreadsheet-landed-costs-fail` sitemap entry and refreshed `lastmod` on the URLs updated in this pass.
- Added documentation under `docs/Website/2026-06-08_tracking_trust_demo_cta_and_sitemap_cleanup.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **15-25%**: Demo-start reporting will likely rise because previously missed demo clicks are now captured.
- **15-25%**: Trial-vs-demo mix can shift because demo-labeled final CTAs now route to the demo form instead of signup.
- **10-20%**: `landing.html` may lose any standalone search footprint after the duplicate-indexing cleanup.

## [1.3.11] - May 17, 2026

### Pricing Add-on Alignment

- Rewrote the modular add-on pricing copy so it reads as customer-facing buying guidance instead of internal packaging strategy.
- Updated the pricing page to show Growth Lite as eligible for specialist add-ons.
- Hid AccountingIQ bank feed API connector pricing until the connector surface is live.
- Regenerated canonical website pricing data from the app subscription config.

### Regression Risk Notes (>10%)

- **10-14%**: Cached pricing data can briefly show the previous Growth-only add-on availability after deployment.
- **12-18%**: Visitors comparing older screenshots or proposals may notice advanced reconciliation moving from bundled Growth+ wording to an add-on path.

## [1.3.10] - May 17, 2026

### Source Attribution + Journey Tracking

- Fixed the canonical website analytics sender to use authenticated `fetch` requests to Supabase instead of unauthenticated `sendBeacon`.
- Added session-level journey tracking: anonymous visitor id, per-session id, landing page, previous page, page-view count, session age, and compact journey path.
- Expanded attribution into first-touch and last-touch fields for UTM, paid click IDs, source category, source platform, search engines, social referrers, and AI assistant referrals.
- Routed 50% and 90% scroll milestones into Supabase `web_scroll_depth` events.
- Added documentation under `docs/Website/2026-05-17_source_attribution_and_journey_tracking_hardening.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: Supabase event volume may increase because scroll depth now reaches the internal event table.
- **10-12%**: Session counts will not be directly comparable to the older persistent local-storage session baseline.

## [1.3.9] - May 11, 2026

### AI-SEO Conversion + Tracking Alignment

- Fixed AI-SEO primary “Book Demo” CTAs that incorrectly routed to `/signup` by updating them to point to `/book-demo.html`.
- Tagged AI-SEO pages with `data-page-template="seo-landing"` and `data-page-intent="seo_landing"` so `seo_landing_view` funnel tracking can fire.
- Converted `/website-analytics.js` into a small bootstrapper that loads the canonical tracking stack (`/assets/website-analytics.js` + `/assets/growth-analytics.js`) and sets a default `FlowIQAnalyticsConfig` when missing.
- Added documentation under `docs/Website/2026-05-11_weekly_growth_audit_ai_seo_tracking_alignment.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **12–18%**: AI-SEO demo-vs-trial attribution may shift because “Book Demo” now routes to the demo form instead of trial signup.
- **10–15%**: AI-SEO pages now load the canonical analytics stack (GTM/GA4/Clarity if not explicitly configured), potentially increasing third-party requests on those routes.

## [1.3.8] - May 10, 2026

### Weekly Growth Conversion Tracking Pass

- Updated homepage SEO and hero copy to lead with ERP-style operating platform positioning for importers, distributors, manufacturers, and scaling teams.
- Added a direct homepage hero demo CTA while preserving the trial CTA as primary and keeping pricing-path access.
- Hardened growth analytics mapping for demo clicks, pricing CTA clicks, pricing billing toggles, module engagement, and product-video engagement.
- Added video open/play/progress/complete tracking for homepage product overview videos.
- Expanded pricing FAQ schema for upgrade path, migration assistance, and plan-fit walkthrough questions.
- Added documentation under `docs/Website/2026-05-10_weekly_growth_conversion_tracking_pass.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-14%**: Homepage CTA attribution may shift because demo is now visible above the fold beside trial.
- **10-12%**: Module visibility tracking may increase analytics event volume on module-heavy pages.

## [1.3.7] - May 9, 2026

### AccountingIQ Payment Automation Pricing Visibility

- Added `AccountingIQ customer/supplier payment automation` to the pricing comparison under `Intelligence & Automation`.
- Growth+ plans show the feature as included; Starter Lite, Starter, and Growth Lite route to upgrade.
- Kept the distinction between Growth Lite bank-feed connectors and Growth+ auto-payment allocation clear.

### Regression Risk Notes (>10%)

- **10-12%**: Growth Lite customers may see bank-feed API connectors included while payment automation remains upgrade-only.

## [1.3.6] - May 8, 2026

### Starter Lite Positioning

- Updated homepage messaging to lead with `Start simple. Scale smarter.` and the business-platform growth path.
- Updated pricing page messaging around `Starter Lite` at `R299/month`, natural upgrades, competitor outgrowth, and free migration assistance from Xero, Sage, QuickBooks, and Pastel.
- Kept the existing `Starter` package available above Starter Lite as the stronger operational entry plan.
- Added pricing comparison upgrade triggers for multi-warehouse, import costing, forecasting, delivery management, operational dashboards, and inventory intelligence.
- Updated marketing signup labels to include both `Starter Lite` and `Starter`.
- Regenerated `pricing-data.json` from the canonical app pricing config.

### Regression Risk Notes (>10%)

- **12-18%**: Homepage CTA attribution may shift because trial signup is now primary instead of demo-first.
- **10-14%**: Cached pricing data can briefly show older Starter values until deployment/cache refresh.

## [1.3.5] - April 22, 2026

### Repo Ownership Hardening

- Documented the live marketing workspace as `/Users/quintenmac/dev/FreightIQ/flowiq_website`.
- Added repo routing notes so public-site work stays in the marketing repo, app flow work stays in `FreightIQ`, and founder console UI stays in `flowiq-admin-console`.
- Added canonical website pass notes under `docs/Website/` to avoid future wrong-folder edits.

### Regression Risk Notes (>10%)

- **15%**: If another local clone of the same GitHub repo is edited instead of this workspace, documentation and live-site work can drift again.

## [1.3.4] - April 19, 2026

### Module Preview Swap + Pricing Header Cleanup

- Replaced the `EcomIQ` and `AccountingIQ` module placeholder cards with branded UI preview assets based on the supplied app screenshots.
- Updated `modules.html` to use the new preview assets instead of placeholder SVGs.
- Removed the top-left `FlowIQ` wordmark from the pricing-page navigation to reduce clutter.
- Tightened pricing table plan headers and shortened plan suffixes from `/month` to `/m` and `/year` to `/yr`.
- Verified the local marketing site now serves the new module asset references and compact pricing header labels.

### Regression Risk Notes (>10%)

- **12%**: Module preview SVGs may drift from the live app UI if app screens evolve and the website previews are not refreshed with them.
- **11%**: Shortening price suffixes improves scan speed, but a small subset of visitors may find `/m` and `/yr` slightly less explicit on first glance.

## [1.3.3] - April 19, 2026

### Homepage Clarity + Mobile UX Pass

- Reworked `index.html` into an overview-first structure to reduce cognitive overload.
- Removed duplicated high-density homepage sections:
  - `The Tension`
  - `The FlowIQ System`
  - long screenshot-heavy module deep-dives
- Added clearer conversion flow:
  - concise hero copy
  - `What Changes Fast`
  - `Choose Your Path` cards (`Who it's for`, `Modules`, `Pricing`)
  - compact module snapshot cards
  - trust/integration summary
- Removed non-essential interaction complexity on homepage:
  - screenshot modal/lightbox markup + JS
  - magnetic hover movement script
- Performed visual checks in Chrome:
  - desktop pass
  - mobile pass via responsive device mode
  - pricing page mobile verification to confirm table-only model still holds
- Confirmed clean local route behavior (`/pricing`, `/modules`, etc.) when served with `npx serve` on `:5180`.

### Regression Risk Notes (>10%)

- **18%**: Reduced homepage internal-link density may slightly lower long-tail SEO discovery from the homepage.
- **14%**: Some visitors wanting detailed module copy above the fold may need one extra click.
- **12%**: Removed motion/lightbox effects may reduce perceived interactivity for a subset of users.

## [1.3.2] - April 19, 2026

### App Pricing Matrix Parity + TimeIQ Display Removal

- Aligned `pricing.html` comparison matrix rows and bundle logic to match app billing matrix semantics.
- Synced `pricing-data.json` from app canonical source (`src/config/subscriptionPlans.js`).
- Removed `TimeIQ` module mention from pricing module bundle display:
  - Now shown as `Execution (ProjectsIQ/WorkIQ)`.

## [1.3.1] - April 19, 2026

### Pricing UX Simplification (Cards Removed)

- Removed the top pricing snapshot card strip from `pricing.html`.
- Kept the pricing comparison table as the single pricing surface.
- Updated billing toggle behavior to refresh table only.
- Updated error fallback rendering to target the pricing table wrapper.

### App Parity Pricing Visibility

- Synced `pricing-data.json` from app canonical source (`src/config/subscriptionPlans.js`).
- Added explicit plan price display in the pricing table header for Monthly/Annual views.
- Annual mode now shows discount labels directly in header cells (matching app pricing values).

## [1.3.0] - April 19, 2026

### ✅ Marketing Workspace Separation + Correct Site Baseline Restore

- Set up dedicated local marketing folder at `flowiq_website/` (separate from app code workflows).
- Confirmed git remote points to marketing repo:
  - `https://github.com/Quintencd/freightiq-website`
- Re-linked Netlify in this folder to the correct marketing site:
  - `flowiq-website` (`e6a1f747-13f1-4856-83c1-b69104047578`)
- Restored the approved full-site variant (Landed Cost / editorial layout family) into this folder for homepage and core marketing pages.
- Added explicit deploy scripts in `package.json`:
  - `npm run deploy:preview`
  - `npm run deploy:prod`
- Updated `README.md` with the canonical local/GitHub/Netlify workflow.

### Regression Risk Notes (>10%)

- **18%**: If deployment is triggered from app workspace instead of `flowiq_website/`, mixed content can reappear.
  - Mitigation: only deploy marketing from `flowiq_website/`.
- **14%**: If route aliases are edited without matching redirects, pretty URLs can diverge from `.html` pages.
  - Mitigation: keep `netlify.toml` redirects aligned with page files.

## [1.2.0] - October 11, 2025

### 🎨 Major UX Enhancements

#### Interactive Plan Selection
- Added visual plan selection chips to contact form
- Implemented active state highlighting with smooth transitions
- Added real-time feedback for selected plans
- Plan selection persists across pages via sessionStorage

**Files:**
- `index.html` - Enhanced contact form with plan chips
- `pricing.html` - Updated CTAs to use data-plan attributes

**CSS Added:**
```css
.plan-chip - Interactive button styling
.plan-chip:hover - Hover state with border color change
.plan-chip.is-active - Active state with orange glow
details[open] .faq-toggle-icon - FAQ accordion animation
```

#### Implementation Roadmap Section
- New 3-step onboarding showcase
- Customer success metrics highlighted
- "What customers notice first" callout box
- ROI messaging for stakeholder buy-in

**Layout:**
- 2-column grid layout (roadmap steps | customer benefits)
- Numbered step indicators with orange accent
- Stats: 18% faster reconciliations, better visibility

#### Resources & FAQ Section
- Replaced old contact form with comprehensive resources
- Decision toolkit (ROI calculator, stakeholder deck, 30-day plan)
- Rollout checklist for implementation leads
- Collapsible FAQ with smooth animations
- Vendor comparison CTA

**Features:**
- 4 interactive FAQ accordions
- Chevron icon rotation on expand/collapse
- Links to contact form with plan pre-selection

#### Plan Comparison Table (Pricing Page)
- Side-by-side feature comparison table
- 5 key capabilities compared across all plans
- Responsive design with overflow scrolling
- Professional styling with semantic HTML

**Rows:**
1. Users & warehouses
2. Shipments / month
3. ForecastIQ scenarios
4. Automation capabilities
5. Support levels

### 🔧 Technical Improvements

#### Enhanced JavaScript
- Complex plan state management with UI synchronization
- SessionStorage persistence across navigation
- Backward compatibility with ?plan= hash URLs
- Plan state cleanup on form submission

**Key Functions:**
```javascript
syncPlanUI(plan) - Updates UI based on selected plan
hydrateFromHash() - Backward compatible with old URLs
setPlan(plan) - Central state setter with storage
```

#### Better Error Handling
- Plan description fallbacks
- Storage access wrapped in try/catch
- Graceful degradation if sessionStorage unavailable

### 📊 Analytics Integration
- Added `data-analytics="cta-pricing-demo"` to new CTA
- Plan selection tracked via sessionStorage
- Form submission clears tracking data

---

## [1.1.0] - Previous Release

### Plan Selection via URL Hash
- Initial implementation with ?plan= query parameters
- Basic sessionStorage for plan persistence
- CTA links updated to use data-plan attributes

---

## [1.0.0] - Initial Release

- Landing page with hero section
- Module showcase
- Pricing page with Growth, Pro, Enterprise plans
- Contact form with Netlify integration
- Responsive design

---

## Migration Notes

### For Netlify Forms
The contact form now includes a hidden `selected-plan` field:
```html
<input type="hidden" name="selected-plan" id="selectedPlan" value="" />
```

**Netlify Dashboard → Forms:** You'll see submissions with plan data populated.

### For Analytics
Track plan selection events:
```javascript
// Already implemented
gtag('event', 'click_cta', { 'plan': plan });
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required APIs:**
- sessionStorage (graceful degradation if unavailable)
- URLSearchParams (modern browsers)
- CSS custom properties

---

**Last Updated:** October 11, 2025  
**Version:** 1.2.0  
**Deployed:** www.flowiq.info
