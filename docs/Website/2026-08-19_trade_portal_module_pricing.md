# Trade Portal Module Pricing

Date: 2026-08-19

The generated public pricing catalogue now includes Trade Portal as a Growth Lite-and-above add-on at `R1,490/month` and `USD 99/month`.

The public description positions it as a secure customer self-service ordering workspace using the customer's approved products, PriceIQ pricing, permitted stock visibility and the supplier's InvoiceIQ order flow. One FlowIQ organisation can provide access to unlimited customer companies and portal users.

Starter Lite and Starter do not advertise the add-on because Trade Portal depends on the custom price-list foundation available from Growth Lite. Distributor and wholesaler recommendations now include it as an optional module.

The production billing and entitlement backend is live at these prices. The pricing payload was regenerated from the canonical app catalogue into both website and app static data. No Netlify deployment was performed; publication remains on the normal GitHub-controlled website release path.

## Regression risk

The initial app/website price-drift risk was above 10%. Generated pricing from one canonical definition, plan-specific checks, and billing parity tests reduce it. The website payload and app release should still be published together so customers do not temporarily see an add-on that checkout does not yet recognise.
