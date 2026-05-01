# Homepage App Login Nav Restore

Date: 2026-04-30

## Summary

- Restored the `Login` navigation action on the marketing homepage generated site header.
- Desktop nav now shows `Login` between `Pricing` and `Start Free Trial`.
- Mobile nav now includes `Login` before the `Start Free Trial` action.

## Files Changed

- `assets/js/main.js`

## Verification

- Confirmed `assets/js/main.js` contains the app login target twice:
  - desktop generated nav
  - mobile generated nav

## Regression Risks Over 10%

- **15%**: Adding one more desktop nav item can crowd the header on narrower tablet-width layouts before the mobile breakpoint. The link uses the existing compact uppercase nav style and sits before the CTA to reduce visual disruption.
