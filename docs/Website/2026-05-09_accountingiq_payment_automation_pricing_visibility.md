# AccountingIQ Payment Automation Pricing Visibility

## Summary

- Added `AccountingIQ customer/supplier payment automation` to the public pricing comparison under `Intelligence & Automation`.
- Growth, Professional, Scale, and Enterprise show `Growth+ included`.
- Starter Lite, Starter, and Growth Lite show `Upgrade to Growth`, matching the app entitlement and backend RPC gate.
- The website pricing payload already carries `accounting_auto_payment_matching` from the canonical app pricing config.

## Regression Risks

- **10-12%**: Growth Lite customers may notice they have bank-feed API connectors but not customer/supplier payment automation. This is intentional because auto-allocation carries higher financial posting risk than feed import and manual reconciliation.
