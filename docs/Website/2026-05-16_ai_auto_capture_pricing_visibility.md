# AI Auto Capture Pricing Visibility

## Summary

- Added `AI Auto Capture document scanning` to the public pricing comparison under `Intelligence & Automation`.
- Eligible plans show `Add-on available` instead of implying the feature is included in the base subscription.
- The row reads from canonical `pricing-data.json` add-on metadata so the website stays aligned with the app subscription configuration.

## Files

- `flowiq_website/pricing.html`
- `public/pricing.html`
- `src/components/PaymentSystem/SubscriptionPlans.jsx`
- `tests/subscriptionAddOns.test.js`
