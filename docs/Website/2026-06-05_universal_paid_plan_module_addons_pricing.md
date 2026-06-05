# Universal Paid-Plan Module Add-ons Pricing

Date: 2026-06-05

## Summary

The marketing pricing page now follows the same module add-on policy as the app:

- Base plan limits and included modules remain unchanged.
- Optional module add-ons show as `Add-on available` on paid plans where the module is not already included.
- Bundled features show `Included`.
- Features with no add-on path show `—`.

## Pricing Page Changes

- Added missing add-on cards and comparison rows for POSIQ Till Integration and Business Units.
- Added ProjectsIQ extra media storage as a visible add-on row.
- Split WorkIQ and TimeIQ so WorkIQ can show add-on availability while TimeIQ remains controlled by base plan inclusion.
- Removed `Available on Growth Plan` wording from rows that are not add-ons.
- Regenerated `pricing-data.json` from the canonical app subscription config.

## Validation

- `npm run -s sync:pricing`
- `node --test tests/subscriptionAddOns.test.js`
- `npm run build`
- Local mobile pricing check at 390px width confirmed no page-level horizontal overflow.
