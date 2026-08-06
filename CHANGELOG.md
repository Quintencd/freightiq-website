# FlowIQ Marketing Website Changelog

## [Unreleased] - August 4, 2026

### Signup password security

- Aligned the public signup checklist and validation with FlowIQ's 12-character,
  uppercase, lowercase, number, special-character and common-pattern policy.
- Kept billing, legal acceptance, analytics and provisioning unchanged.
- No Netlify deployment was performed.

### Regression Risk Notes (>10%)

- **10-15% stronger-policy friction:** passwords that previously met the
  eight-character rule are now rejected. Matching browser and server guidance
  prevents contradictory failures.

## [Unreleased] - August 3, 2026

### Weekly calculator accessibility and measurement

- Separated calculator navigation intent from completed calculator uses and
  restored the canonical `web_calculator_use` event with stable calculator IDs.
- Removed duplicate calculate-button tracking.
- Added persistent visible labels and accessible names across the seven tools
  calculators without replacing existing labels.
- Added polite atomic status semantics to calculated results.
- Refreshed the tools-family timestamps in both synchronized sitemap copies and
  saved current-run desktop/mobile audit captures under `docs/Website`.
- No Netlify deployment, Git push, commit, database write, app, or admin-console
  change was performed.

### Regression Risk Notes (>10%)

- **10-20% analytics baseline shift:** calculator navigation and completed-use
  events are now intentionally separated.
- **10-15% calculator layout risk:** persistent labels add compact vertical
  height; mitigated by calculator-only scoping and desktop/mobile checks.
- **10-12% shared-runtime risk:** mitigated by a strict `#calc-submit` gate and a
  seven-route calculator contract sweep.
- **10-12% crawl-refresh risk:** tool URLs may be revisited after sitemap
  timestamp refresh; URLs, canonicals, formulas, and claims are unchanged.

## [Unreleased] - July 27, 2026

### Module detail page visual polish

- Rebuilt the shared module-detail H1 hierarchy so the module name is a compact
  identifier and the buyer-facing outcome is the primary headline.
- Reduced the desktop hero from an oversized 1,018-1,186px presentation to a
  compact 626-657px layout on DashboardIQ and AI Auto Capture.
- Tightened shared detail-section heading scale and mobile hero media height.
- Completed a screenshot and layout-metric sweep of all 32 module pages at
  1440x900 and 390x844, including a compact exception for the longest
  Commission & Rebate Automation outcome.
- Updated the canonical generator, generated all 32 detail pages, and extended
  validation to protect the new semantic H1 structure.
- Added before/after desktop and mobile audit captures under
  `docs/Website/audits/2026-07-27-module-detail-polish`.
- No Netlify deployment, Git push, commit, database write, or app/admin-console
  change was performed.

### Regression Risk Notes

- No identified regression risk exceeds 10%. The change is limited to the
  canonical module generator and dedicated module-detail stylesheet, with
  sitemap, metadata, content, links, analytics, and module claims unchanged.
  All 64 final desktop/mobile captures passed overflow, containment, stacking,
  image-load, and primary-action visibility checks.

### Weekly buyer-journey visibility and measurement

- Restored the brochure's dark-theme cover and page copy by adding a narrow
  page-owned-theme opt-out to the shared premium shell.
- Added canonical website and growth analytics coverage to Support, Who FlowIQ
  Is For, and Brochure.
- Added page-family reporting metadata and structured data to all three pages,
  plus the missing standard brochure meta description.
- Refreshed the three route timestamps in both synchronized sitemap copies.
- Added the audit report and accepted render captures under `docs/Website`.
- No Netlify deployment, Git push, commit, database write, or app/admin-console
  change was performed.

### Regression Risk Notes (>10%)

- **12-18% brochure-theme risk:** mitigated by a one-page explicit theme opt-out
  with desktop and mobile render verification.
- **10-20% analytics baseline shift:** these previously unmeasured page families
  will begin contributing canonical funnel events.
- **10-15% network risk:** each corrected page now loads two established,
  non-blocking analytics assets.
- **10-12% crawl-refresh risk:** mitigated by stable canonicals and accurate
  structured metadata.

## [Unreleased] - July 24, 2026

### Premium modules directory and dedicated module pages

- Replaced the limited module grid with a premium searchable directory covering 32 connected modules and add-ons across operating, specialist, and automation workflows.
- Added a categorized Modules mega-menu on desktop and an expandable Modules group in the mobile navigation.
- Added or consolidated 32 dedicated module pages with buyer value, features, workflow, outcomes, real/product imagery, connected modules, CTAs, self-canonicals, social metadata, and structured data.
- Expanded AI Auto Capture marketing to cover customer-order and supplier-document email intake, attachment-level auto-split, pending queues, bell notifications, source-linked mapping, reviewed mapping memory, and explicit approval before draft creation.
- Kept Auto Capture claims review-first and documented the Google restricted-scope and real-document certification boundaries.
- Added one canonical module catalog, a repeatable page/sitemap generator, a module validation command, and synchronized root/public sitemap entries.
- Details: `docs/Website/2026-07-24_premium_modules_directory_and_detail_pages.md`.
- No Netlify deployment, Git push, commit, database change, or app runtime change was performed.

### Regression Risk Notes (>10%)

- **15-20% public-claim drift:** mitigated by one canonical catalog and explicit provider/certification boundaries.
- **12-18% indexed-page replacement:** mitigated by stable canonicals, unique crawlable content, JSON-LD, sitemap parity, and automated validation.
- **10-15% shared-navigation footprint:** mitigated through the existing keyboard dropdown contract, a bounded desktop mega-menu, and a separate mobile accordion.
- **10-15% email-intake expectation risk:** mitigated by stating that intake creates review items and cannot post commercial documents automatically.

## [Unreleased] - July 22, 2026

### Canonical no-plan signup and clearer 14-day journey

- Kept the full business-data signup form while removing six upfront plan cards; customers choose and activate a plan in app Billing instead.
- Preserved Shopify install claims and safe return paths when the app `/signup` route hands registration to the canonical marketing site.
- Moved existing homepage product proof higher into the first viewport without replacing the approved premium design system.
- Reframed pricing as one chronological 14-day trial-to-activation journey and kept Welcome Bonus modules explicitly separate.
- Corrected signup funnel analytics so first meaningful form interaction is counted once and CTA clicks no longer inflate `web_signup_start`.
- Details: `docs/Website/2026-07-22_trial_signup_and_first_viewport_conversion.md`.
- No Netlify deployment, Git push, or commit was performed.

### Regression Risk Notes (>10%)

- **10-15% Shopify signup handoff risk:** mitigated by preserving the full query/hash and forwarding `shopify_install_claim` through the canonical form.
- **10-15% analytics baseline risk:** signup-start totals intentionally fall to a truthful first-interaction count.
- **10-12% responsive hero risk:** mitigated through existing breakpoints and desktop/mobile visual QA before release.

## [Unreleased] - July 20, 2026

### Market Radar connection rail logo

- Added the supplied Market Radar logo to both sets of the homepage commerce-and-banking connection rail so the continuous loop remains seamless.
- Stored an optimized 600 x 200 WebP asset locally instead of relying on a temporary or third-party URL.
- Preserved the existing equal-footprint containment, accessibility pattern, connection-pathway positioning and non-affiliation notice.
- Refreshed the homepage `lastmod` in both synchronized sitemap copies and added the owning website documentation.
- No Netlify deployment, Git push, or commit was performed.

### Regression Risk Notes (>10%)

- **10-15% brand-positioning risk:** Market Radar could be interpreted as an endorsement or certified partnership. Mitigation: it appears inside the existing connection-solutions rail directly above the explicit non-affiliation notice.
- **10-12% rail-cadence risk:** adding another wide mark changes the loop length. Mitigation: the logo uses the same fixed footprint and image containment rules as the existing marks and is present once in each duplicated set.

### Weekly Growth Customer-Proof Tracking Parity

- Added the established growth analytics layer to the customer hub and both public customer case studies.
- Completed scroll-depth and demo/trial-intent coverage across the customer-proof page family without changing claims, layouts, or CTA destinations.
- Refreshed the three changed-route `lastmod` values in both synchronized sitemap copies.
- Added documentation under `docs/Website/2026-07-20_weekly_growth_audit_customer_proof_tracking.md`.
- No Netlify deploy, Git push, or commit was performed.

### Regression Risk Notes (>10%)

- **10-20%**: customer-proof analytics baselines can increase because scroll-depth and demo-intent events now enter the canonical stream.
- **10-15%**: the added growth script introduces a small non-blocking network and telemetry cost on three routes.
- **10-12%**: refreshed sitemap timestamps may prompt crawlers to revisit the unchanged customer content.

## [Unreleased] - July 17, 2026

### Two-month Welcome Bonus Pack

- Updated the pricing launch offer and CTA from a three-month to a two-month specialist-module bonus.
- Kept the eligible modules, signup route, analytics metadata, and all published plan and add-on prices unchanged.
- Updated the owning website documentation. No Netlify deployment was run.

### Commerce and bank integration positioning

- Added a premium homepage section for Shopify and Takealot commerce operations, paired with clearly qualified direct bank integration solution pathways for FNB, Standard Bank, Nedbank, Absa and Investec.
- Added conversion instrumentation to the EcomIQ exploration action so Founder Console reporting can measure commerce-integration interest.
- Updated homepage and EcomIQ metadata, social cards, structured data and the shared EcomIQ runtime module story for Shopify, Takealot, ecommerce operations and provider-neutral bank integration solution discovery.
- Added clear non-affiliation language next to the brand identifiers: bank availability remains dependent on bank, account type, customer onboarding and approved access.
- Revised the section into a top-led, moving connection rail and replaced the text-only marks with original commerce and banking brand assets; FlowIQ remains the surrounding brand rather than appearing as a connection target.
- Centred the connection narrative, constrained the scrolling rail, and cache-versioned the homepage stylesheet so external brand marks stay contained across browsers.
- Removed the logo-card treatment and normalised every brand mark to the same transparent footprint for a cleaner moving rail.
- No Netlify deployment was run.

### Regression Risk Notes (>10%)

- **15-20% positioning risk:** named commerce and bank brands can be read as a partnership claim. Mitigation: every related surface states that names identify intended connection pathways only, with no affiliation, endorsement or certified-partnership claim; bank access is explicitly qualified.
- **10-15% SEO expectation risk:** new Shopify and Takealot discovery language can create demand for details beyond the public page. Mitigation: copy links to the EcomIQ product surface and limits claims to operational pathways and review-first workflow value.

## [1.3.21] - July 13, 2026

### Weekly Growth Research-Page Tracking Parity

- Added the canonical website and growth analytics stacks to all sitemap-listed comparison, use-case, and glossary pages.
- Added page-family reporting metadata so comparison, operational-problem, and educational journeys can be segmented cleanly.
- Added explicit indexable robots directives and refreshed changed-route `lastmod` values in both synchronized sitemap copies.
- Added documentation under `docs/Website/2026-07-13_weekly_growth_audit_research_page_tracking.md`.
- No Netlify deploy, Git push, or commit was performed.

### Regression Risk Notes (>10%)

- **10-20%**: research-page analytics baselines can increase because 13 previously untracked routes now enter the canonical event stream.
- **10-15%**: the added bottom-loaded analytics scripts introduce extra client network work on those routes; telemetry remains non-blocking and failure-tolerant.
- **10-12%**: explicit robots directives and refreshed sitemap timestamps may prompt search engines to recrawl the changed routes.

## [1.3.20] - July 6, 2026

### AI Search Discovery Foundation

- Added `llms.txt` at the website root and `public/llms.txt` with canonical FlowIQ positioning, priority URLs, module summaries, and direct AI-answer snippets.
- Added explicit AI/search crawler allow rules to both root and public `robots.txt` copies while preserving sitemap declarations.
- Added `llms.txt` to both root and public sitemap copies.
- Strengthened homepage JSON-LD with `Organization`, `WebSite`, `SoftwareApplication`, and `FAQPage` graph entries for core AI-search questions.
- Added a compact homepage answer section using existing premium card styling so public copy now directly answers what FlowIQ is, who it fits, and how it relates to ERP-style workflows.
- Added documentation under `docs/Website/2026-07-06_ai_search_discovery_foundation.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: Organic and AI-search crawl behavior can shift because `llms.txt`, explicit crawler rules, and richer homepage schema make FlowIQ easier to classify and quote.
- **10-12%**: Homepage snippet/FAQ interpretation can shift because direct answer copy and FAQ schema now states FlowIQ positioning more explicitly. Mitigation: claims are conservative and match existing module/site positioning.

## [1.3.19] - July 6, 2026

### Weekly Growth Module SEO and Tracking Completion

- Added self-canonical URLs, indexable robots tags, and structured data to the remaining live module draft pages: JournalIQ, Manufacturing, and TaskIQ.
- Added module-detail body metadata plus the shared website analytics stack to those pages so module page views, demo clicks, scroll depth, and CTA context reach reporting.
- Added the three now-indexable module pages to both root and public sitemap copies.
- Added documentation under `docs/Website/2026-07-06_weekly_growth_audit_module_seo_tracking.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: Organic crawl and impression distribution can shift as the three newly indexable module pages become easier for search engines to discover.
- **10-12%**: Module analytics baselines can rise because these pages now load the shared website tracking stack.

## [1.3.18] - July 3, 2026

### Signup Website And Referral Capture

- Added optional company website capture to `/signup`.
- Added a required FlowIQ-style "How did you hear about us?" dropdown and optional referral detail field.
- Sent signup acquisition fields through `public-signup` and `/api/signup-notify` so Founder Console can report them.
- Added documentation under `docs/Website/2026-07-03_signup_website_referral_capture.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: the live `public-signup` Edge Function now requires `signup_referral_source`, so any signup surface missing that payload field would fail validation. The public website signup page has been updated and the static signup guard now checks for the field.
- **10-12%**: the public signup page is slightly longer on mobile. The new source control reuses the existing FlowIQ dropdown UI to keep spacing and behavior consistent.

## [1.3.17] - July 3, 2026

### Pricing New Account Module Promo Banner

- Added a green top-of-pricing promotional banner explaining the new-account specialist-module launch offer.
- Listed only the actual bonus modules in compact pills: AI Automation Suite, Auto Accounting Reconciliation, and PayrollIQ.
- Renamed the generated accounting add-on card from `AccountingIQ Reconciliation Pack` to `Auto Accounting Reconciliation` for clearer customer-facing value.
- Added documentation under `docs/Website/2026-07-03_pricing_new_account_module_promo_banner.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- None identified. This is a static pricing-page copy correction and generated-payload sync; it does not change pricing amounts, add-on keys, signup payloads, plan rendering, or module activation logic.

## [1.3.16] - July 2, 2026

### AI Automation Suite Pricing Payload Sync

- Synced pricing copy and `pricing-data.json` for the AI Automation Suite consolidation: `ai_auto_capture` now carries the AgentsIQ value at the existing R519 price, and the old separate AI Agents Pack is no longer advertised.
- Added documentation under `docs/Website/2026-07-02_ai_automation_suite_pricing_payload_sync.md`.
- No Netlify deploy was run.

### Accessible Add-on Pricing Payload Sync

- Regenerated `pricing-data.json` after the app billing catalogue lowered selected add-on prices for import/export jobs, AccountingIQ Reconciliation, POSIQ, Ecom, Messaging, and Payroll.
- Commission & Rebate Automation remains unchanged.
- No pricing page layout or public module-price visibility behavior changed.
- Added documentation under `docs/Website/2026-07-02_accessible_addon_price_payload_sync.md`.
- No Netlify deploy was run.

### Extra Price Lists Pricing Payload Sync

- Regenerated `pricing-data.json` from the app canonical subscription config after the Growth extra price-list add-on moved from R990/month to R200/month.
- No pricing page layout or public module-price visibility behavior changed.
- Added documentation under `docs/Website/2026-07-02_extra_price_lists_r200_payload_sync.md`.
- No Netlify deploy was run.

### Regression Risk Notes (>10%)

- **10-15%**: App billing, generated website data, Supabase SQL pricing helpers, and PayFast Edge billing functions must deploy together for fully consistent customer-facing pricing. This rollout updated and validated those billing surfaces.

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
