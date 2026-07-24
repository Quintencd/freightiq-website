# Premium Modules Directory And Detail Pages

**Date:** 2026-07-24  
**Property:** FlowIQ marketing website (`flowiq_website`)  
**Release state:** Implemented and locally verified; not deployed

## Outcome

The public website now presents FlowIQ as a connected operating platform rather
than a short grid of general features.

- The shared navigation has a premium categorized Modules mega-menu.
- The Modules directory exposes 32 customer-relevant modules and add-ons.
- Buyers can search by module, workflow, feature, or outcome and filter by:
  - Run the business
  - Plan and execute
  - Automate and extend
- Every card opens a dedicated, indexable module page.
- Every module page explains the buyer value, features, operating workflow,
  outcomes, imagery, connected modules, and conversion paths.
- The existing warm-paper, graphite, copper, and restrained emerald marketing
  system remains the visual foundation.

## Catalog ownership

`tools/module-catalog.mjs` is the canonical public module-marketing catalog.
It owns names, categories, module/add-on labels, buyer copy, features, outcomes,
workflow steps, imagery, and related-module links.

`tools/generate-module-marketing.mjs` generates:

- `modules.html`
- the 32 `modules/*.html` detail pages
- the module entries in both sitemap copies

This avoids the prior drift where the directory, navigation, detail pages, and
sitemap each described a different portion of the platform.

Use:

```bash
npm run generate:modules
npm run validate:modules
```

The validator checks the catalog count, detail-page presence, self-canonicals,
analytics metadata, JSON-LD parsing, local assets, sitemap parity, sitemap
duplicates, and the removal of module anchor dead-ends.

## Public catalog

### Run the business

- DashboardIQ
- CompaniesIQ
- SalesIQ
- InvoiceIQ
- PurchaseIQ
- InventoryIQ
- AccountingIQ
- ReportsIQ

### Plan and execute

- ImportIQ
- ExportIQ
- ForecastIQ
- PriceIQ
- Manufacturing
- ProjectsIQ
- EcomIQ
- PayrollIQ
- CashIQ
- JournalIQ
- WarrantyIQ
- WorkIQ
- TimeIQ
- TaskIQ
- DeliveryIQ
- CourierIQ

### Automate and extend

- AI Auto Capture
- AgentsIQ
- SlipIQ
- RFID Stock Tracking
- POSIQ
- Accounting Reconciliation
- Commission & Rebate Automation
- Business Units

Provider-gated or not-yet-customer-ready surfaces, including the planned
dedicated Support Desk, are not represented as generally available modules.

## AI Auto Capture marketing contract

The dedicated AI Auto Capture page now includes the complete current workflow:

- customer-order and supplier-document email intake;
- configured Google mailbox routes with separate aliases or labels;
- upload and photo intake;
- attachment-level auto-split;
- one independently reviewable queue item per supported attachment;
- pending queue and notification-bell visibility;
- source-linked extraction, confidence, validation, and mapping;
- organization-scoped reviewed mapping memory;
- explicit user approval before a pro-forma or draft purchase order is created;
- related SlipIQ, cash, import/freight, and SalesIQ voice-note capture value.

“Auto-split” is deliberately described as attachment-boundary splitting. Three
supported attachments create three queue items. FlowIQ does not claim to split a
multi-document PDF into guessed page ranges during the pilot.

The page does not claim automatic order posting. It states that email intake
cannot create or post a commercial document by itself.

The trust boundary also remains public:

- Google mailbox monitoring uses read-only access.
- Wider email-intake availability depends on Google restricted-scope approval.
- Auto Capture stays review-first while genuine real-document certification
  evidence continues to grow.

## UX and accessibility

- Module cards are single semantic links; there are no nested button roles.
- Search has a visible label for assistive technology and an announced result
  count.
- Category controls use `aria-pressed`.
- Empty search results provide a clear reset action.
- Desktop navigation uses a keyboard-aware dropdown.
- Mobile navigation receives separate expandable Solutions and Modules groups.
- Detail pages include skip links, breadcrumbs, section headings, related
  module navigation, and complete CTA states.
- Reduced-motion rules remove non-essential movement.

## SEO and measurement

Every generated page includes:

- a unique title and description;
- a self-canonical URL;
- indexable robots metadata;
- Open Graph and X/Twitter metadata;
- `WebPage`, `SoftwareApplication`, and `BreadcrumbList` JSON-LD;
- `data-page-template="module-detail"`;
- a module-specific `data-page-topic`;
- the canonical website and growth analytics scripts.

The directory is a `CollectionPage` with an `ItemList` containing all 32 public
capabilities. Both `sitemap.xml` copies are identical and carry `2026-07-24`
module timestamps.

Search and category interactions emit `module_catalog_filter` with the selected
category, search term, and result count. Existing module-view and module-
engagement tracking continues to cover navigation and related-module links.

## Validation evidence

- `node --check tools/module-catalog.mjs`
- `node --check tools/generate-module-marketing.mjs`
- `node --check assets/js/main.js`
- `node --check assets/js/modules-directory.js`
- `npm run validate:modules`
- Local HTTP render at `http://127.0.0.1:3333/modules`
- Desktop visual inspection of the directory hero, Modules mega-menu, catalog,
  Auto Capture detail page, and real product imagery
- Browser interaction proof:
  - Modules mega-menu opens and remains readable.
  - Searching `auto capture` returns exactly one result.
  - The AI Auto Capture page exposes all six feature cards, five review-first
    workflow steps, four safety FAQs, and three connected modules.

## Regression risks above 10%

### 15-20% public-claim drift

A module can evolve after its page is published. The catalog is therefore a
single owned source, and the Auto Capture page explicitly preserves the Google
approval and real-document certification boundaries.

### 12-18% indexed-page replacement risk

Existing module pages were consolidated into the shared premium detail-page
system. Their canonical URLs remain unchanged, each retains unique crawlable
content and JSON-LD, and every page is validated against the canonical catalog
and sitemap.

### 10-15% global navigation footprint risk

The wider Modules menu changes the shared header on public pages. It reuses the
existing dropdown keyboard behavior, keeps the desktop panel within a bounded
viewport width, and uses a separate mobile accordion rather than forcing the
desktop mega-menu into a phone layout.

### 10-15% marketing expectation risk for email intake

The page could create demand before restricted-scope Google approval is
complete. The visible trust boundary states the provider gate and makes clear
that intake creates a review item, never an automatically posted order.

## Release note

No Netlify deployment, Git push, commit, database change, or application runtime
change was performed. The website remains ready for the normal GitHub-led
release workflow.
