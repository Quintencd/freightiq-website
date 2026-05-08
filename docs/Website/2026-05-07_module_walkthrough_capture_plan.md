# Module Walkthrough Capture Plan

## Context

Started browser walkthrough mapping from the logged-in FlowIQ app session at `https://app.flowiq.info/taskiq`.

Captured local reference screenshots under `docs/Website/walkthrough-captures/`. These captures are intentionally ignored by Git so private app screens are not pushed to the public website repo by accident.

Added a safe, website-ready animated walkthrough asset under `assets/walkthroughs/` using existing public module preview images rather than raw live-org screenshots:

- `assets/walkthroughs/flowiq-module-tour.webp`
- `assets/walkthroughs/flowiq-module-tour-poster.jpg`
- `assets/walkthroughs/flowiq-module-tour-contact-sheet.jpg`
- `assets/walkthroughs/flowiq-module-tour.gif`

The `/walkthroughs` page now embeds the animated WebP in the hero as a large module-motion preview. This gives the website movement immediately while keeping raw app captures and potentially sensitive demo-org records out of the public repo.

2026-05-08 update:

- Removed the visible "Silent product motion loop" label from the walkthrough preview.
- Enlarged the `/walkthroughs` hero media so the product motion carries more of the first screen.
- Added the same animated module preview to the homepage as a dedicated "Product tour" band that links to `/walkthroughs` and demo booking.

## Current App State

The first logged-in org was useful for route mapping, but it was not ideal for public sales walkthroughs:

- ImportIQ shows zero active/received/draft/closed shipments.
- InventoryIQ shows zero SKUs, manufacturing jobs, transfers and stock takes.
- InvoiceIQ shows zero quotes, pro-formas, outstanding value and confirmed value.
- AccountingIQ loads, but dashboard financials are zero.
- PayrollIQ loads, but payroll values are zero and tax/compliance setup warnings are visible.
- ForecastIQ loads and has the strongest visible structure for a first walkthrough, including Overview, SKU Dashboard, Supplier Trends, Seasonality, Manufacturing Risks and Dead Stock.
- Dashboard was still preparing/loading during capture.

## Demo Org Recheck

The later demo org has enough data to plan the first videos:

- Dashboard shows AR/AP finance context and notification activity.
- TaskIQ has active task records, assignees, priorities and statuses.
- InventoryIQ has SKU rows, product types and available stock values.
- ForecastIQ has usable planning tabs and risk/alert controls.
- InvoiceIQ has pro-forma count and confirmed pro-forma value.
- AccountingIQ has AR, AP, VAT, net profit, reporting period and finance context visible.
- PayrollIQ has gross/net estimates and module tabs for employees, pay runs, commissions, leave and compliance.
- ReportsIQ has report types, date ranges, exports and report table structure.

Still avoid publishing raw captures until the founder reviews whether names, amounts and records are safe for public use.

## 2026-05-07 Capture Pass Result

Full-screen Chrome capture worked for ImportIQ after a hard reload, but macOS automation became unreliable during repeated route reloads and started returning black frames for the visible browser. The in-app browser session could inspect loaded DOM for the modules, but its screenshot capture became inconsistent after multiple navigations.

Because of that, final public-facing video files were not produced from raw live app capture in this pass. Instead, the deliverable was changed to a safe animated product-motion loop built from already-public module screenshots. This avoids exposing private live-org or demo-org data and gives the walkthrough page a polished asset that can be used immediately.

Keep the ignored raw capture folder for internal review only:

- `docs/Website/walkthrough-captures/`

Do not move those raw captures into public assets until they are reviewed and masked.

## Recommendation

Do not record final public videos from this empty org. Use either:

- a populated demo org with safe sample data, or
- a real org only after reviewing and masking private customer, supplier, staff and financial details.

## First Video Set

1. FlowIQ Overview
   - Purpose: show FlowIQ as one operating system for imports, inventory, forecasting, accounting, payroll and work control.
   - Runtime: 35-50 seconds.
   - Screens: dashboard, module menu, ForecastIQ, ImportIQ, InvoiceIQ, AccountingIQ.

2. ImportIQ Walkthrough
   - Purpose: prove landed cost and shipment visibility.
   - Runtime: 60-90 seconds.
   - Screens: shipment dashboard, status filters, received stock, landed cost breakdown, supplier/payment visibility.
   - Voiceover angle: "Know true cost before pricing and margin decisions go wrong."

3. InventoryIQ + ForecastIQ Walkthrough
   - Purpose: prove stock planning and stockout/dead-stock reduction.
   - Runtime: 90 seconds.
   - Screens: SKUs, warehouses, stock transfers, ForecastIQ overview, SKU dashboard, dead stock, manufacturing risks.
   - Voiceover angle: "Move capital toward stock that sells and avoid running out of fast movers."

4. InvoiceIQ + AccountingIQ Walkthrough
   - Purpose: prove document flow into month-end control.
   - Runtime: 90 seconds.
   - Screens: quote/pro-forma/invoice flow, outstanding values, journals, reporting period, transactions, bank reconciliation where available.
   - Voiceover angle: "Reduce manual handoffs between sales, finance and accounting."

5. PayrollIQ Walkthrough
   - Purpose: prove payroll, commissions and journals.
   - Runtime: 60-90 seconds.
   - Screens: payroll overview, employees, pay runs, commissions, tax/compliance, journals where available.
   - Voiceover angle: "Turn commission and payroll work into a faster controlled process."

6. TaskIQ / WorkIQ Walkthrough
   - Purpose: prove accountability and follow-up visibility.
   - Runtime: 45-60 seconds.
   - Screens: task counters, assigned tasks, new task, work queues, bottlenecks.
   - Voiceover angle: "Managers see what is overdue, who owns it and what needs attention."

## Website Placement

- Homepage: one short 20-30 second silent product motion loop only.
- Walkthroughs page: one safe product-motion loop in the hero, followed by individual module walkthrough cards.
- Module pages: embed the relevant module walkthrough near the top after the hero.
- Customer/case study pages: add one operational proof clip if it directly supports the case study.

## Capture Standard

- Use a clean demo org and desktop-width viewport.
- Hide or replace sensitive customer, supplier, employee and exact financial data unless already approved for public use.
- Keep each clip focused on one problem and one outcome.
- Use AI voiceover after screen capture, not live narration during capture.
- Export web clips in MP4/WebM and YouTube versions in 1080p.

## Regression Risks

- 20-30%: Recording from an empty org will make the product feel unproven. Mitigation: populate demo data before final recording.
- 15-20%: Real business data could expose private customer, supplier, payroll or financial details. Mitigation: use a demo org or review/mask frames before publishing.
- 10-15%: Long videos may reduce conversion if placed on the homepage. Mitigation: keep the homepage to one short motion proof and move detailed walkthroughs to `/walkthroughs`.
- 10-15%: Using a silent animated WebP instead of a narrated MP4 may feel less like a full demo. Mitigation: treat the WebP as the immediate motion asset and record narrated MP4 module videos once the demo org and capture environment are stable.
