# 2026-06-08 - RFID stock tracking marketing video

## Context

Created a new original FlowIQ RFID stock tracking marketing video for the public website review workflow.

The Zebra RFID portfolio video was used only as a style and pacing reference. The FlowIQ asset does not copy Zebra artwork, script, brand treatment, music, product claims, or visual layouts.

## Output Assets

- Review MP4: `assets/videos/flowiq-rfid-stock-tracking-90s.mp4`
- Poster: `assets/videos/flowiq-rfid-stock-tracking-90s-poster.jpg`
- Editable preview/source: `rfid-video-preview.html`
- Local renderer: `tools/render-rfid-video.js`
- Generated RFID warehouse plate: `assets/img/generated/rfid-video/rfid-warehouse-control-v1.png`
- Generated RFID encoding plate: `assets/img/generated/rfid-video/rfid-encoding-bench-v1.png`
- Generated RFID dispatch plate: `assets/img/generated/rfid-video/rfid-dispatch-portal-v1.png`

## Video Structure

The exported cut is a 90-second, 1920x1080, H.264 MP4.

Scene plan:

1. Manual stock movement blind spots.
2. FlowIQ RFID system reveal across InventoryIQ, PurchaseIQ, InvoiceIQ, StockIQ, DeliveryIQ and TaskIQ.
3. SKU, barcode and EPC encoding workflow.
4. PurchaseIQ receiving proof linked from document context QR.
5. Stocktake and transfer evidence inside existing InventoryIQ/TaskIQ flows.
6. Dispatch-door RFID proof linked to invoice, StockIQ draft and DeliveryIQ dispatch status.
7. Driver delivery confirmation from the same delivery-note QR context.
8. TaskIQ exception and audit visibility.
9. Final RFID Stock Tracking add-on CTA.

## Positioning

The copy intentionally avoids promising unsafe automatic posting. The message is:

- RFID captures physical movement evidence.
- FlowIQ keeps normal receiving, stocktake, transfer, dispatch, delivery and exception workflows in control.
- Evidence and QR context remove duplicated work and make movements easier to prove.

## Verification

- Rendered locally through Playwright and the bundled `@ffmpeg-installer/ffmpeg`.
- Confirmed MP4 metadata: 1920x1080, 30fps, H.264, duration 00:01:30.00.
- Decoded the MP4 with ffmpeg using `-v error -f null -`; no decode errors were returned.
- Checked opening and closing frames visually after correcting the FlowIQ logo treatment on dark scenes.

## 2026-06-08 Premium Rebuild

The first review asset was improved after quality feedback because it still felt too much like a static explainer. The rebuilt version now uses custom generated RFID/warehouse plates and stronger motion compositing:

- Cinematic warehouse operations plate with FlowIQ overlays, route motion, floating EPC tags and RFID proof callouts.
- Cinematic RFID encoder/printer plate with moving EPC/barcode label cards.
- Cinematic dispatch-door RFID portal plate with animated scan gate, moving tag reads and linked InvoiceIQ/StockIQ/DeliveryIQ proof cards.
- Stronger camera drift, light sweeps, film grain and animated RFID scan waves.
- Reduced reliance on flat app-card scenes so the video feels more like a premium technology film.

The asset still remains legally safer than modifying the Zebra video directly: the creative, generated imagery, motion overlays, script and FlowIQ product story are original to FlowIQ.

## Website Integration Note

The video has not been embedded into live website pages yet. This is deliberate so the review asset can be approved before replacing or adding public homepage/walkthrough placements.

Recommended placement after approval:

- Add a compact RFID add-on video block on the relevant add-ons/modules section.
- Keep `preload="metadata"` and use the poster to avoid slowing the first page load.
- Consider a shorter 20-30 second cut for homepage use and keep this 90-second version for detail pages, proposals, and client education.
