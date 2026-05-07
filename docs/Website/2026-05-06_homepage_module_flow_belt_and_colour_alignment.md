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
- Added per-module icon accents, matching card borders and soft glow treatments so each moving card is easier to scan:
  - ImportIQ: orange/navy
  - InventoryIQ: blue
  - ForecastIQ: green
  - SalesIQ: cyan
  - InvoiceIQ: violet
  - AccountingIQ: amber/navy
  - PayrollIQ: teal
  - TaskIQ: pink
  - Manufacturing: slate
  - ReportsIQ: orange
- Used explicit colour variables instead of newer `color-mix()` CSS so the accent cards render more consistently across browsers.
- Removed the dark-card override from ImportIQ and AccountingIQ so every moving module card stays bright, tinted and consistent with the light FlowIQ homepage.

## Rationale

The homepage needed to feel more alive without becoming cluttered. A horizontal module belt communicates breadth quickly, gives the page motion, and helps visitors understand that FlowIQ is a connected operating platform rather than a single landed-cost tool or generic ERP.

## Regression Risks

- 10-15%: The marquee motion may distract some visitors if it feels too busy. Mitigation: animation is slow, pauses on hover, and uses restrained FlowIQ colours.
- 10-15%: The repeated hidden duplicate card set increases homepage HTML size. Mitigation: this avoids JavaScript and keeps the animation reliable for static hosting.
- 10-15%: More colour in the module cards can become visually noisy if overused. Mitigation: accents are limited to icons, borders and soft glows while the cards remain mostly white/navy.
- 10-15%: The brighter per-module backgrounds could compete with the proof section if reused broadly. Mitigation: the stronger colour treatment is scoped to the moving module belt only.

## Verification

- `npm run build` completed successfully.
- Local browser check at `http://127.0.0.1:3333/` confirmed the new module flow band renders between the solution cards and the customer proof section.
- No Netlify deployment was run; founder will deploy manually.
