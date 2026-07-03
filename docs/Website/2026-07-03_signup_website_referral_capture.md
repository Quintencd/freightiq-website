# Signup website and referral capture (2026-07-03)

Scope: public marketing `/signup` page compatibility with the server-owned `public-signup` provisioning flow.

## What changed

- Added optional company website capture to the marketing signup form.
- Added a required FlowIQ-style "How did you hear about us?" dropdown.
- Added optional referral detail capture for person, company, campaign, search term, or link context.
- Sent `company_website_url`, `signup_referral_source`, and `signup_referral_detail` to `public-signup`.
- Sent the same fields to `/api/signup-notify` so founder/support notifications include acquisition context.

## Data contract

- `company_website_url` is optional. Values like `example.com` are normalized client-side to `https://example.com`, then normalized again server-side.
- `signup_referral_source` is required because the live `public-signup` Edge Function now rejects missing referral-source values.
- `signup_referral_detail` is optional and capped at 240 characters.

## Regression risk

- `10-15%`: any signup surface that calls `public-signup` without `signup_referral_source` will receive a validation error. The marketing signup page now sends the required field, and `tests/sharedOrgRlsExposureClosureStatic.test.js` asserts that this does not regress.
- `10-12%`: the signup form is slightly longer on mobile. The fields use the existing signup form spacing and FlowIQ dropdown component pattern to keep layout behavior consistent.

No Netlify deploy was run.
