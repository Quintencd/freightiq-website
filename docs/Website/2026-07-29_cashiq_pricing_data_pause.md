# CashIQ Pricing Data Pause

Date: 2026-07-29

- Regenerated `pricing-data.json` from the canonical main-app subscription
  plans after CashIQ was globally paused.
- CashIQ is absent from every exported plan feature array.
- No marketing-site code or Netlify deployment was performed.

Regression risk above 10%: none. The generated data removes a not-yet-available
module and does not change plan prices, limits, or PayFast package identifiers.
