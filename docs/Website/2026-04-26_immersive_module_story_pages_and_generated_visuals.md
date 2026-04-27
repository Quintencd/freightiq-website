# Immersive Module Story Pages And Generated Visuals

Date: 2026-04-26

## Scope

- Upgraded the FlowIQ marketing homepage to feel more alive with:
  - Broader generated business command hero art rather than a freight/import-first hero.
  - A moving process-flow section from planning through stock, sales, accounting, and management decisions.
  - A Solutions dropdown that routes visitors into richer module stories.
- Repositioned the homepage away from a landed-cost-first message and toward complete ERP/business operations for accounting, inventory, purchasing, sales, payroll, ecommerce, manufacturing, forecasting, and reporting.
- Reworked the lower homepage after the motion section into a lighter, easier-reading structure:
  - Compact "What Changes Fast" insight cards with small object-led supporting images.
  - A clearer choose-your-path area for use cases, modules, and pricing.
  - A module snapshot section that keeps the product names visible without overwhelming the page.
  - A specialist-depth section that shows FlowIQ as a broad ERP first, with import, manufacturing, ecommerce, and forecasting as deeper workflows.
  - A compact confidence section for connected accounting, stock, purchasing, sales, ecommerce, manufacturing, payroll, and reporting.
- Added compressed generated WebP assets under:
  - `assets/img/generated/flowiq-control-room.webp`
  - `assets/img/generated/importiq-story.webp`
  - `assets/img/generated/inventory-forecast-story.webp`
  - `assets/img/generated/finance-decision-story.webp`
  - `assets/img/generated/business-command-story.webp`
  - `assets/img/generated/finance-relationship-story.webp`
  - `assets/img/generated/ecommerce-retail-story.webp`
  - `assets/img/generated/homepage-support/homepage-visibility-light.webp`
  - `assets/img/generated/homepage-support/homepage-speed-light.webp`
  - `assets/img/generated/homepage-support/homepage-control-light.webp`
  - `assets/img/generated/homepage-support/homepage-confidence-light.webp`
- Added immersive module story pages for:
  - `modules/importiq.html`
  - `modules/inventoryiq.html`
  - `modules/forecastiq.html`
  - `modules/dashboardiq.html`
  - `modules/companiesiq.html`
  - `modules/accountingiq.html`
  - `modules/ecomiq.html`
  - `modules/purchaseiq.html`
  - `modules/invoiceiq.html`
  - `modules/reportsiq.html`

## Implementation Notes

- `assets/js/module-story.js` renders the module story content from structured per-module data.
- Each story page now includes:
  - A clean brochure-style generated hero scene that carries the first viewport without extra overlay cards.
  - A larger real FlowIQ module screenshot in a separate proof section below the image.
  - Related module name pills.
  - Outcome cards.
  - A richer "Smart business flow in action" system-flow section.
- Module story headings were reduced from oversized hero-scale type to smaller shared section headings so names like DashboardIQ, AccountingIQ, and InventoryIQ read cleanly without dominating the page. They were tightened again after review so the module title is roughly half the previous visual weight.
- The bottom "Connected Next" related-story button section was removed from module pages to keep the story pages cleaner and less repetitive.
- The old single-row moving scene was expanded into a two-layer system map: the top lane shows the module process, while the connected module lanes below show where data feeds next across FlowIQ.
- AccountingIQ now explicitly shows InvoiceIQ, PurchaseIQ, PayrollIQ, JournalIQ, DashboardIQ, and ReportsIQ feeding the finance/control story.
- ImportIQ now includes ForecastIQ before PurchaseIQ to show demand, seasonal pressure, and stock planning driving import decisions.
- InventoryIQ now shows imported stock, manufacturing usage, FIFO/branch stock, warranty returns, forecasting signals, invoice margin, accounting, dashboards, and reports as one connected flow.
- ForecastIQ now includes seasonal trends, manufacturing alerts, dead-stock/slow-mover signals, PurchaseIQ handoff, and reporting/dashboard feedback.
- DashboardIQ, CompaniesIQ, EcomIQ, PurchaseIQ, InvoiceIQ, and ReportsIQ were also expanded so each story demonstrates the related modules it markets instead of showing isolated feature boxes.
- `flowiq-light.css` now owns the shared story-page, dropdown, generated-hero, screenshot-proof, and motion styles.
- `flowiq-light.css` also owns the homepage insight, path, module snapshot, specialist-depth, and confidence section styles.
- Public-facing module and homepage copy was rewritten to remove internal briefing language such as "the page should", "visitors should", and "shape perception". The wording now speaks directly to the business evaluating FlowIQ.
- The shared Solutions dropdown was changed from a module-style picker to workflow-led solution entries. DashboardIQ was removed from the Solutions dropdown and remains available from the Modules page, reducing duplicate navigation noise.
- The homepage "FlowIQ in motion" lane was tightened into six smaller desktop cards so the full process fits on one row, with the animated connector line centered through the lane.
- Homepage support images now use a very slight premium fade treatment with softer saturation, mild brightness lift, and lighter image shadowing so the visuals sit more polished inside the white card system.
- A small menu visibility rule was added across marketing pages with navs so fixed and sticky headers stay above page visuals and the mobile menu layer remains on top.
- Module story CSS/JS references were bumped so browser previews load the latest smaller-heading, clean-image, and system-flow treatment instead of stale cached assets.
- `netlify.toml` includes clean extensionless routes for the new module pages.
- Root and `public/` sitemap files were updated to include the new module URLs.
- The Solutions dropdown now supports click-to-open as well as hover, includes a hover bridge between the nav item and dropdown panel, and is included on the module story pages so visitors can move between stories after landing on a module.
- Removed the internal explanatory dropdown feature panel so the dropdown reads as customer-facing navigation only.

## SEO And Indexing Notes

- Each immersive module page now has its own crawlable URL, title tag, meta description, canonical URL, `index,follow,max-image-preview:large` robots directive, Open Graph image metadata, Twitter image metadata, and sitemap entry.
- Each module page includes JSON-LD structured data with:
  - `WebPage`
  - `BreadcrumbList`
  - `SoftwareApplication`
- Each module page also includes a static fallback content section inside the original HTML. This gives crawlers and non-JavaScript clients unique module copy, related module names, and a demo CTA before `assets/js/module-story.js` replaces the fallback with the full immersive animated story.
- Root and `public/` sitemaps were checked for parity after the module additions.
- Internal links from the homepage, modules page, dropdown navigation, and story pages point into the individual module URLs so Google can discover them through normal crawl paths as well as the sitemap.

## Visual Asset Notes

- Generated images are atmospheric website assets only.
- Real FlowIQ UI screenshots are shown as separate proof panels below the generated module image so the generated scene stays crisp and readable.
- AccountingIQ now uses the supplied real product screenshot saved at `assets/img/modules/accountingiq-real-positive.png`. A non-edited source copy was also saved at `assets/img/modules/accountingiq-real-source.png`.
- The AccountingIQ screenshot was edited deterministically to turn the Net Profit KPI from a red negative value into a green positive value, while keeping the rest of the FlowIQ UI screenshot unchanged and crisp.
- EcomIQ now uses the supplied real product screenshot saved at `assets/img/modules/ecomiq-real.png`. A source copy was also saved at `assets/img/modules/ecomiq-real-source.png`.
- The modules overview grid no longer uses the generated SVG placeholder previews for EcomIQ or AccountingIQ. Both cards now use real FlowIQ dashboard screenshots.
- The module pages now treat each generated image as the brochure/pamphlet surface for the page rather than a background for extra overlay cards.
- The hero image treatment was adjusted to keep generated scenes clear and saturated. Readability is handled by separate content sections, not by fading the image or placing cards over it.
- The generated originals remain in the Codex image output folder; the website references only compressed WebP copies in the website asset tree.
- The visual language is intentionally mixed:
  - ImportIQ keeps the freight/container/landed-cost story.
  - InventoryIQ and ForecastIQ use warehouse/planning visuals.
  - DashboardIQ, PurchaseIQ, and ReportsIQ use broader cross-industry business command visuals with office, production, warehouse-management, and operations planning context.
  - AccountingIQ, CompaniesIQ, and InvoiceIQ use finance/customer/supplier relationship visuals in an office/admin operations setting.
  - EcomIQ uses ecommerce, retail, pricing, order, and fulfillment visuals.
  This avoids positioning FlowIQ as freight-only while still letting import and landed-cost pages feel strong.
- The homepage now uses `business-command-story.webp` to signal broad business operations first. Import and landed-cost messaging is retained as specialist depth, not the main front-page identity.
- General business and finance/admin images were regenerated again to avoid all-white/generic-office visuals. They now intentionally show mixed-race, globally relevant teams in business operations and management contexts.
- The lower homepage now uses a lighter object-led support image set for visibility, speed, control, and confidence. These images avoid repeated office/team/dashboard scenes and are placed as smaller reading aids rather than full-page brochure panels.
- Homepage support images now use a very slight premium fade treatment with softer saturation, mild brightness lift, and lighter image shadowing so the visuals sit more polished inside the white card system.
- The shared nav script now defensively loads the shared FlowIQ stylesheet and includes critical dropdown hiding rules. This prevents injected Solutions dropdown content from appearing unstyled on pages that did not already include the shared stylesheet.
- All solution pages now include `flowiq-light.css?v=10` directly in the document head, plus a tiny inline dropdown visibility guard. This prevents the Solutions menu content from flashing or rendering as page text before the shared navigation script finishes.
- The signup account creation layout now centers the single-column signup content and header when the page has no right-hand aside, keeping the "Create Your Account" section balanced on wide screens.
- The solution pages were restored/enriched in place after a regression left some pages too thin:
  - `solutions/multi-branch.html` now has a full branch-control story with smart business flow, branch execution benefits, and connected module links.
  - `solutions/importers.html`, `solutions/distributors.html`, `solutions/manufacturers.html`, and `solutions/wholesale-distribution.html` keep their existing problem/FAQ/tool content and add connected module-flow sections.
  - `solutions/index.html` now presents solutions as business workflows instead of isolated module cards, includes the wholesale and freight/logistics solution pages, and broadens the positioning beyond import-only.
  - The enrichment intentionally avoids making the solution pages depend on one dashboard image. These pages explain multi-module operating flows; individual module screenshots remain on the module pages.
- The solution pages now include compact, crawlable "Business software fit" sections for search intent depth rather than hidden SEO text:
  - `global inventory management software`
  - `ERP for small business`
  - `accounting and inventory software`
  - `manufacturing inventory software`
  - `ecommerce ERP`
  - `payroll and accounting system`
  These sections are lower on the pages so they support indexing without overwhelming the primary visual/flow story.
- `solutions/index.html` now includes a "Search by business need" internal-link section that routes those topic clusters to the most relevant solution or module page.
- The shared Solutions dropdown links were changed to direct `.html` page targets for the top workflow pages:
  - `solutions/importers.html`
  - `solutions/distributors.html`
  - `solutions/manufacturers.html`
  - `solutions/multi-branch.html`
  This avoids preview-server and static-host routing ambiguity when a visitor clicks a dropdown item.
- The shared Solutions trigger is now rendered as a button by `assets/js/main.js` instead of a normal link. That prevents click-to-open from falling through to `/solutions/` before a visitor can choose a dropdown item.
- The solution pages were corrected after a regression where several workflow pages became too text-heavy and lost the image-led story treatment:
  - `solutions/importers.html`, `solutions/distributors.html`, `solutions/manufacturers.html`, `solutions/multi-branch.html`, and `solutions/wholesale-distribution.html` now have a clear generated story visual panel.
  - The plain 2x2 module boxes on those pages were replaced with a six-step horizontal "Smart business flow in action" lane, matching the homepage-style process visual the customer approved.
  - Each flow is solution-specific: imports show forecast-to-account landed cost, distributors show demand-to-reporting, manufacturers show forecast-to-account production flow, multi-branch shows plan-to-decision branch control, and wholesale shows demand-to-cash.
- `flowiq-light.css` now includes reusable `solution-story-visual` and `solution-flow-lane` styles so future solution pages can keep the same premium visual pattern without copy/paste layout drift.
- The older SEO landing pages were brought back into the same image-led style so Google entry pages do not regress into plain text pages:
  - `freight-forwarder-software.html`
  - `import-erp-software.html`
  - `inventory-software-for-importers.html`
  - `manufacturing-inventory-software.html`
- `assets/css/seo-pages.css` now includes reusable visual hero, story panel, module chip, and six-step flow lane styles for those SEO landing pages.
- Public-facing marketing copy was adjusted from South Africa-specific positioning to global SaaS positioning:
  - Solution pages now refer to distributors, importers, multi-branch teams, wholesale teams, retail operations, and freight/logistics operators without country-specific targeting.
  - Accounting, bookkeeping, and payroll SEO landing pages keep their existing URL compatibility but use global product language in titles, descriptions, visible headings, JSON-LD, Open Graph, and Twitter metadata.
  - New generic global landing URLs were added for `accounting-software.html`, `bookkeeping-software.html`, and `payroll-software.html`.
  - Legacy country-specific accounting/bookkeeping/payroll URLs now redirect to the generic global landing pages in Netlify.
  - Payroll workflow language now says compliance workpapers, statutory controls, and tax workflows rather than country-specific payroll authority terms.
  - Legal governing-law copy, the signup country selector, and internal country options were intentionally left unchanged because those are operational/legal mechanics, not market-positioning copy.
- Mobile responsiveness was audited across 37 key website routes at a 390px mobile viewport:
  - homepage
  - who-it-is-for page
  - solutions index and solution detail pages
  - modules index and module story pages
  - global accounting/bookkeeping/payroll pages
  - SEO landing pages
  - pricing
  - brochure
  - demo
  - signup
  - key calculator pages
- Mobile fixes from that audit:
  - Homepage decorative ambient glows are hidden on mobile so they cannot create horizontal overflow.
  - The brochure page now scales its A4-style page panels, typography, grids, and cover layout down for phone screens.
  - The pricing comparison table remains in an intentional horizontal scroll container; it no longer creates page-level mobile overflow.
- A second sitemap-based mobile audit checked all 49 public URLs listed in `sitemap.xml` at the same 390px viewport. Result: 0 page-level mobile overflow or off-viewport content issues.

## Verification

- Local static server: `npm run dev` from `flowiq_website`.
- Verified generated assets and module screenshots return `200`.
- Verified new module pages return `200` locally.
- Verified solution routes return `200` locally for `/solutions/`, `/solutions/importers`, `/solutions/distributors`, `/solutions/manufacturers`, `/solutions/multi-branch`, `/solutions/wholesale-distribution`, `/solutions/retail-outlets`, and `/solutions/freight-logistics`.
- Verified current direct dropdown targets return `200` locally when redirects are followed:
  - `/solutions/importers.html`
  - `/solutions/distributors.html`
  - `/solutions/manufacturers.html`
  - `/solutions/multi-branch.html`
  - `/solutions/wholesale-distribution.html`
  - `/modules/accountingiq.html`
  - `/modules/ecomiq.html`
- Verified the upgraded SEO landing pages return `200` locally:
  - `/freight-forwarder-software.html`
  - `/import-erp-software.html`
  - `/inventory-software-for-importers.html`
  - `/manufacturing-inventory-software.html`
- Browser-inspected `/freight-forwarder-software.html` and confirmed it has the visual hero, image-led story panel, smart flow lane, shared Solutions dropdown button, and no console errors.
- Verified the target SEO phrases are present in visible/crawlable solution-page HTML and not inserted as hidden text.
- Scanned solution pages for internal/developer-facing wording such as "visitors", "the page should", "should feel", and "perception" after the solution enrichment pass.
- Verified `assets/js/main.js` and `assets/js/module-story.js` with `node --check` after the shared navigation and AccountingIQ screenshot updates.
- Scanned marketing HTML and JS for internal/developer-facing phrases after the customer-copy cleanup.
- Marketing pages now cache-bust `assets/js/main.js?v=7`, shared styling now cache-busts `flowiq-light.css?v=10`, and module story pages cache-bust `assets/js/module-story.js?v=7`.
- Navigation is rendered through a shared `assets/js/main.js` helper so module pages, solution pages, and the homepage present the same top menu items: Home, Who it's for, Solutions, Modules, Pricing, Brochure, Login, Book a Demo, and Start Free Trial.
- Captured Chrome headless screenshots for:
  - Homepage desktop.
  - Homepage mobile.
  - ImportIQ desktop story page.
  - ImportIQ mobile story page.
- Fixed mobile overflow in the homepage hero and module story hero after screenshot review.
- Verified 37 key routes with Chrome DevTools Protocol at a 390px mobile viewport after the mobile pass. Result: 0 page-level mobile overflow or off-viewport content issues.
- Verified all 49 public sitemap URLs with Chrome DevTools Protocol at a 390px mobile viewport after the final pass. Result: 0 page-level mobile overflow or off-viewport content issues.

## Regression Risks Over 10%

- **22%**: Generated visuals can drift from the actual product UI if the app evolves.
  - Mitigation: real FlowIQ screenshots are embedded as product proof layers on every story page.
- **18%**: Freight imagery can over-position FlowIQ as logistics-only if reused too broadly.
  - Mitigation: the homepage now leads with broader ERP/business operations imagery and copy, while freight/import visuals are limited to ImportIQ and specialist sections.
- **16%**: Broadening the homepage can dilute the high-converting landed-cost/import wedge.
  - Mitigation: ImportIQ and landed-cost language remains present as specialist depth and in module navigation, but no longer dominates the first viewport.
- **15%**: Retail/shopfront imagery can over-position FlowIQ as a consumer retail platform.
  - Mitigation: general business story assets were regenerated with office, factory, warehouse-management, finance/admin, and operations planning context. Retail/product imagery is limited to EcomIQ-style order flow where it is relevant.
- **14%**: Generic stock-style people imagery can underrepresent global customers and teams.
  - Mitigation: non-freight business/admin visuals were regenerated with visibly mixed-race teams and should be reviewed again before production deployment.
- **18%**: Added animation and image content can increase page weight or create mobile jank.
  - Mitigation: assets were compressed to WebP, motion is CSS-light, and reduced-motion support is included.
- **13%**: Additional homepage supporting images can still increase visual weight if future edits make them larger.
  - Mitigation: the current lower homepage uses small lazy-loaded compressed WebP thumbnails, not full-width image panels.
- **15%**: The shared JS-rendered module story content can fail if `module-story.js` is blocked or changed incorrectly.
  - Mitigation: pages now include static fallback body copy, related module terms, metadata, JSON-LD, and route shells, and the story renderer is centralized to reduce duplicate page drift.
- **16%**: Search engines may delay or partially process JavaScript-rendered story content compared with static HTML.
  - Mitigation: each module page now ships unique crawlable HTML content and structured data before JavaScript runs.
- **14%**: Clean extensionless module URLs depend on Netlify redirects staying aligned.
  - Mitigation: redirects were added in `netlify.toml`, and sitemap entries use the canonical `.html` URLs.
- **12%**: Clean internal URLs and `.html` canonical URLs can split signals if redirects are changed later.
  - Mitigation: current canonical tags and sitemap entries point to `.html` pages, while Netlify rewrites keep clean URLs usable for visitors.
- **12%**: The Solutions dropdown may be missed by some mobile users because mobile uses the menu list rather than hover.
  - Mitigation: mobile menus include a direct `Solutions` link and module pages remain reachable from `/modules`.
- **13%**: Desktop users can miss dropdown links if hover-only navigation closes before the click lands.
  - Mitigation: the dropdown now supports click-to-open, outside-click close, Escape close, keyboard ArrowDown focus, and a bridged hover area.
- **12%**: Applying a shared menu visibility rule across legacy marketing pages can expose small spacing differences on older pages with fixed nav assumptions.
  - Mitigation: the rule only affects existing fixed/sticky nav layering and mobile menu z-index; page content and routing were not restructured.
- **11%**: Smaller shared module headings may feel less dramatic on pages with very short names.
  - Mitigation: the generated image now carries the visual impact, while the title section stays readable and consistent across all module pages.
- **14%**: Search-intent support sections can feel repetitive if they are placed too high or copied too aggressively across pages.
  - Mitigation: the new content is lower on each solution page, written as buyer-facing fit guidance, and tailored per solution rather than hidden or keyword-stuffed.
- **20%**: Hidden keyword text would create an SEO penalty risk if added for crawler-only content.
  - Mitigation: no hidden SEO paragraphs were added; all new search-intent copy is visible, crawlable, and useful to a human reader.
- **13%**: Solution pages can drift visually again if future edits replace the shared flow lane with isolated text-card grids.
  - Mitigation: the visual story and six-step flow pattern now live behind reusable CSS classes and are documented as the approved solution-page pattern.
- **15%**: SEO landing pages can drift away from the main site experience because they use a separate CSS template.
  - Mitigation: the SEO template now owns the same visual hero, story image, and six-step flow patterns used on the solution pages.
- **18%**: Removing country-specific marketing phrases can reduce relevance for highly localized search terms.
  - Mitigation: existing route URLs were preserved for backwards compatibility, while visible copy now positions FlowIQ as a global SaaS product.
- **12%**: Global payroll and tax wording can feel less explicit to country-specific buyers.
  - Mitigation: copy now uses compliance-neutral language and keeps the payroll/accounting workflow clear without presenting FlowIQ as tied to one jurisdiction.

## Follow-Up Opportunities

- Generate more tailored background scenes for PayrollIQ, Manufacturing, WarrantyIQ, PriceIQ, SalesIQ, ProjectsIQ, TaskIQ, and JournalIQ.
- Replace any older module thumbnails with fresh, app-current screenshots when the product UI changes.
- Add more section-level copy per module for SEO depth once the visual direction is approved.

## 2026-04-27 Solution Page Visual-First Correction

- Corrected the remaining solution-page regression where several pages still opened with the old plain text hero before the approved visual story sections.
- Moved the generated story visual and the "Smart business flow in action" lane to the top of these pages:
  - `solutions/importers.html`
  - `solutions/distributors.html`
  - `solutions/manufacturers.html`
  - `solutions/multi-branch.html`
  - `solutions/wholesale-distribution.html`
  - `solutions/freight-logistics.html`
  - `solutions/retail-outlets.html`
- Kept the deeper buyer/SEO copy lower on each page so Google still gets crawlable detail without making the first screen feel like a text article.
- Converted `solutions/freight-logistics.html` from its older dark template into the shared light FlowIQ visual-story pattern.
- Added a visual story and six-step flow lane to `solutions/retail-outlets.html` so it no longer sits outside the solution-page pattern.

## 2026-04-27 Verification

- Verified local `200` responses for all updated solution routes:
  - `/solutions/importers`
  - `/solutions/distributors`
  - `/solutions/manufacturers`
  - `/solutions/multi-branch`
  - `/solutions/wholesale-distribution`
  - `/solutions/freight-logistics`
  - `/solutions/retail-outlets`
- Verified each route now returns a `solution-story-visual` section before the first detailed content section and includes the "Smart business flow in action" lane.
- Rechecked the SEO landing pages already corrected in the previous pass:
  - `/freight-forwarder-software`
  - `/import-erp-software`
  - `/inventory-software-for-importers`
  - `/manufacturing-inventory-software`

## 2026-04-27 Module Story Split-Hero Alignment

- Updated the shared module-story renderer so module pages now follow the same brochure-style split hero pattern as the approved import solution page.
- Replaced the previous full-width generated image banner above the module content with a split panel:
  - Left side: module story label, module name, buyer-facing copy, and related module chips.
  - Right side: the crisp generated story visual.
- Moved the real FlowIQ screenshot proof into its own section below the generated story panel so the page still shows the real product without making the first viewport feel like two separate pages.
- Applied the change through `assets/js/module-story.js` so AccountingIQ, EcomIQ, ImportIQ, InventoryIQ, ForecastIQ, DashboardIQ, CompaniesIQ, PurchaseIQ, InvoiceIQ, and ReportsIQ inherit the same pattern.
- Bumped module pages to `assets/js/module-story.js?v=8` and `flowiq-light.css?v=11` so the browser loads the updated layout instead of the cached old banner.
