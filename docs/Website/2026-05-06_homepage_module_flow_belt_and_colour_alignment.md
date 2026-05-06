# Homepage Module Flow Belt and Colour Alignment

## Summary

Adjusted the local homepage design after review so the first page explains what FlowIQ does more clearly and uses a calmer FlowIQ-aligned palette. The homepage now keeps the original generated operations image, removes the multi-colour headline gradient, and adds a moving horizontal module flow section before the customer proof area.

## What Changed

- Updated homepage stylesheet cache key to `flowiq-light.css?v=18`.
- Changed the hero subcopy to define FlowIQ as a connected operating system for landed cost, stock, sales, invoicing, accounting, payroll, tasks, reporting and branch control.
- Replaced the hero headline gradient treatment with FlowIQ orange on the second line.
- Renamed the solution section heading from `Start where the pain is.` to `What FlowIQ helps you control.`
- Added a moving horizontal module flow belt before the proof section, covering:
  - ImportIQ
  - InventoryIQ
  - ForecastIQ
  - SalesIQ
  - InvoiceIQ
  - AccountingIQ
  - PayrollIQ
  - TaskIQ
  - Manufacturing
  - ReportsIQ
- Kept colours constrained to FlowIQ navy, orange, white and slate neutrals.

## Rationale

The homepage needed to feel more alive without becoming cluttered. A horizontal module belt communicates breadth quickly, gives the page motion, and helps visitors understand that FlowIQ is a connected operating platform rather than a single landed-cost tool or generic ERP.

## Regression Risks

- 10-15%: The marquee motion may distract some visitors if it feels too busy. Mitigation: animation is slow, pauses on hover, and uses restrained FlowIQ colours.
- 10-15%: The repeated hidden duplicate card set increases homepage HTML size. Mitigation: this avoids JavaScript and keeps the animation reliable for static hosting.

## Verification

- Pending local build and visual check.
- No Netlify deployment should be run from this change; founder will deploy manually.
