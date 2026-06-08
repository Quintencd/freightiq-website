# 2026-06-08 - RFID stock tracking solution page

## Context

Added RFID Stock Tracking as a customer-facing FlowIQ solution on the public marketing website.

This page explains the value of the RFID add-on in business language and embeds the 90-second FlowIQ RFID marketing video.

## Website Changes

- Added `solutions/rfid-stock-tracking.html`.
- Added RFID Stock Tracking to the desktop Solutions dropdown.
- Added RFID Stock Tracking to the mobile Solutions dropdown.
- Added RFID Stock Tracking to `solutions/index.html`.
- Added the page to `sitemap.xml` and `public/sitemap.xml`.
- Added RFID solution layout styles to `flowiq-light.css`.
- Bumped the shared CSS cache version in `assets/js/main.js`.
- Bumped public HTML references from `assets/js/main.js?v=10` to `assets/js/main.js?v=11` so the new Solutions dropdown is not hidden by browser or CDN cache.

## Customer-Facing Message

The page positions RFID as a stock movement proof layer that enriches current FlowIQ workflows:

- InventoryIQ stocktakes and transfers.
- PurchaseIQ receiving.
- InvoiceIQ and StockIQ dispatch context.
- DeliveryIQ dispatch and delivery proof.
- TaskIQ exception review.
- RFID tag code generation and RFQ planning.

## Control Boundaries

The copy intentionally avoids promising uncontrolled automatic posting.

The page states that RFID evidence is review-gated and that normal stock, FIFO, invoice and accounting controls remain in place. It also explains that phone cameras can scan document QR context, while UHF RFID tags normally require RFID-capable readers or encoders.

## Verification Notes

The implementation should be checked with:

- `node --check assets/js/main.js`
- `git diff --check -- assets/js/main.js flowiq-light.css solutions/index.html solutions/rfid-stock-tracking.html sitemap.xml public/sitemap.xml docs/Website/2026-06-08_rfid_stock_tracking_solution_page.md`
- Local browser review of `/solutions/rfid-stock-tracking.html` and `/solutions/`
