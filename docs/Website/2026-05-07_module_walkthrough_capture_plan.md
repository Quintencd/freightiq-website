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

2026-05-08 sample voiceover video:

- Created `assets/videos/flowiq-overview-sample-voiceover.mp4` as a 58 second 1080p review sample.
- Created `assets/videos/flowiq-overview-sample-voiceover-poster.jpg` as the matching poster frame.
- The sample uses public module preview screenshots and local macOS Samantha text-to-speech voiceover. It does not use raw live-org screen captures or private customer data.
- Treat this as a style-review asset before producing the final module walkthrough set with a polished AI voiceover and approved demo-org screens.

2026-05-08 v2 sample voiceover video:

- Created `assets/videos/flowiq-overview-sample-voiceover-v2.mp4` as a 65 second 1080p review sample.
- Created `assets/videos/flowiq-overview-sample-voiceover-v2-poster.jpg` as the matching poster frame.
- Reworked the opening and closing frames to use a cleaner FlowIQ operating-layer visual instead of the simpler static flow graphic.
- Replaced the macOS voice with a more natural neural voice generated into the local sample asset.
- This is still a style-review sample, not the final public module walkthrough set.

2026-05-08 sales-pitch samples:

- Created `assets/videos/flowiq-overview-sales-pitch-v3.mp4` using the founder meeting pitch as the voiceover direction.
- Created `assets/videos/flowiq-overview-sales-pitch-v3-poster.jpg` as its matching poster frame.
- Created `assets/videos/flowiq-overview-sales-pitch-v4.mp4` as the polished iteration after reviewing the opening frame.
- Created `assets/videos/flowiq-overview-sales-pitch-v4-poster.jpg` as its matching poster frame.
- The v4 opening uses a cleaner FlowIQ command-center visual with spaced module cards, route lines behind cards, coloured module accents, glow, and subtle scan motion so the first screen can work as a loop-ready hero asset.
- The v4 script adds the sales narrative: disconnected systems create delays, inaccurate costing, poor forecasting, cash-flow pressure and blind spots; FlowIQ gives enterprise-level capability without ERP complexity.
- Created `assets/videos/flowiq-overview-sales-pitch-v5.mp4` as the next iteration with the live homepage-style operations image, polished floating insight cards and a cleaner final demo CTA.
- Created `assets/videos/flowiq-overview-sales-pitch-v5-poster.jpg` as its matching poster frame.
- The v5 voice script uses "Flow I Q", "Import I Q", "Forecast I Q" and "E R P" phrasing for better pronunciation while keeping the on-screen brand spelling as FlowIQ.
- The v5 ending includes a dedicated "See FlowIQ in action" and "Book Demo" closing slide plus a 2.8 second silent hold so the video does not cut off abruptly.
- Created `assets/img/generated/flowiq-video-premium-ops-hero-v1.png` using the built-in image generation workflow as a premium real-world operations backdrop for the video.
- Created `assets/videos/flowiq-overview-sales-pitch-v6.mp4` using the generated premium operations backdrop, glass insight cards and corrected final CTA wrapping.
- Created `assets/videos/flowiq-overview-sales-pitch-v6-poster.jpg` as the matching poster frame.
- The v6 problem slide was changed away from a plain list-card style and now uses the same premium operations backdrop so it feels closer to a website hero image than a presentation slide.
- Created `assets/img/generated/flowiq-video-existing-image-contact-sheet.jpg` to compare available generated website imagery for video use.
- Created `assets/videos/flowiq-overview-sales-pitch-v7.mp4` with different premium visuals mapped to the topic being discussed: premium ops for the intro, finance relationship for the problem, business command for the complete solution, control room for enterprise simplicity, and finance decision for the final demo CTA.
- Created `assets/videos/flowiq-overview-sales-pitch-v7-poster.jpg` as the matching poster frame.
- Kept the module-specific slides on actual FlowIQ product screenshots rather than replacing those with generated marketing imagery.
- Created the `assets/img/generated/video-v8/` image set with seven generated real-world photos mapped to the video story: intro operations, manual-work problem, solution command, import logistics, inventory forecasting, finance/payroll and demo closing.
- Created `assets/img/generated/video-v8/flowiq-video-v8-contact-sheet.jpg` to review those generated images together.
- Created `assets/videos/flowiq-overview-sales-pitch-v8.mp4` using real generated photos on every right-side visual instead of dark UI cards or flat slide diagrams.
- Created `assets/videos/flowiq-overview-sales-pitch-v8-poster.jpg` as the matching poster frame.
- The v8 module sections now use relevant real-world imagery for imports, inventory/forecasting and finance/payroll, while the voiceover still explains the corresponding FlowIQ modules.
- Created `assets/videos/flowiq-overview-sales-pitch-v9.mp4` after fixing the image compositor bug that caused the v8 right-side photos to render as a dark blank panel.
- Created `assets/videos/flowiq-overview-sales-pitch-v9-poster.jpg` as the matching poster frame.
- The v9 render uses the same v8 real-world generated photos, but applies the bottom readability overlay with proper alpha compositing so the photos remain visible.
- Created `assets/videos/flowiq-overview-sales-pitch-v10.mp4` and matching poster after moving the closing "Book Demo" button out of the right-side photo card so the CTA no longer overlaps the image caption area.
- Created `assets/videos/flowiq-overview-sales-pitch-v11.mp4` and matching poster after removing the filled IQ badge treatment from the drawn video logo.
- Created `assets/videos/flowiq-overview-sales-pitch-v12.mp4` and matching poster as the current final review asset using the real transparent `flowiq-logo.png` asset in each frame, generated real-world right-side photos, the approved sales-pitch voice track, and the fixed closing CTA layout.
- Verified v12 locally as a 97.04 second, 1920x1080, 24fps MP4 with audio. The opening poster and closing frame were visually checked for logo transparency treatment and CTA spacing.
- Embedded v12 on the homepage product-tour band and `/walkthroughs` hero with `preload="metadata"` and the v12 poster so users can watch it without forcing a full upfront video download.
- Updated the homepage placement to a compact poster preview that opens v12 in a full-screen modal. The homepage no longer gives the video the full inline page width, but users can still open, play, close with Escape/click-outside, and return to the preview button.

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
- 10-15%: The sample MP4 uses local text-to-speech and static public screenshots, so it may not feel as premium as the final narrated app walkthroughs. Mitigation: use it only for direction approval, then record final clips from approved demo data with a higher-quality voiceover.
- 10-15%: The v2 voice is more natural than macOS text-to-speech, but final production voice choice still needs founder approval before adding videos across the website and YouTube.
- 10-15%: The v4 command-center visual is intentionally more polished and illustrative than a raw app screen, so it should be used as a marketing overview/hero asset rather than a literal product demo clip.
- 10-15%: The v5 opening is closer to the website hero image style and less literal than app footage. Use it as a high-level marketing overview and keep module-specific pages for actual screen walkthroughs.
- 10-15%: The v6 generated operations image is AI-created marketing imagery, so it should not be treated as a literal customer site or real FlowIQ screen capture. It is appropriate for overview/hero use, while final module walkthroughs should still use approved product footage.
- 10-15%: The v7 video mixes generated marketing visuals with real product screenshots. Keep that separation clear on final website placement: generated visuals for narrative/positioning, screenshots for product proof.
- 10-15%: The v8 video leans fully into generated real-world photos for marketing impact. Use separate actual product walkthrough videos when users need to inspect the software screens in detail.
- 10-15%: The v8 export should not be used because its right-side photo compositor rendered the image area as a dark panel. Use v9 or later for review/public placement.
- 10-15%: The v9 closing CTA overlapped the right-side image caption area. Use v10 or later when reviewing the final sales-pitch video.
- 10-15%: The v10/v11 logo treatment was closer to a drawn approximation than the real website logo. Use v12 or later where the transparent FlowIQ PNG is required.
