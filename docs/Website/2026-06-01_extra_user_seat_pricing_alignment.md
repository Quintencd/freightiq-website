# Extra User Seat Pricing Alignment

Date: 2026-06-01

## Summary

Aligned the public marketing website pricing display for extra user seats with the current app-side pricing source.

## Source Checked

- App pricing source:
  - `/Users/quintenmac/dev/FreightIQ/src/config/subscriptionPlans.js`
- Website pricing data:
  - `/Users/quintenmac/dev/FreightIQ/flowiq_website/pricing-data.json`
- Marketing pricing page:
  - `/Users/quintenmac/dev/FreightIQ/flowiq_website/pricing.html`

The current source-of-truth add-on price for `extra_users` is `R99` per user/month across eligible plans.

## Changes

- Updated the marketing page USD override for `extra_users` from `$29` to `$6`.
- Updated the add-on unit label from generic `per month` to `per user / month` for the Extra User Seat card.

## Validation

- Confirmed `pricing-data.json` already contains `extra_users.price = 99`.
- Confirmed the homepage/website restore from the 3D WIP work remains untouched.

## Deployment

No Netlify deploy was run.
