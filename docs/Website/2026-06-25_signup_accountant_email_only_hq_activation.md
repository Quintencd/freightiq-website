# Signup Accountant Email-Only HQ Activation

Date: 2026-06-25

## Scope

Aligned the public marketing website accountant-firm signup with the in-app Accountant HQ activation flow.

Files updated:
- `signup/index.html`
- `netlify/functions/signup-notify.js`
- `CHANGELOG.md`
- `supabase/functions/public-signup/index.ts`
- `supabase/functions/public-signup/README.md`

## What Changed

- Removed the public accountant-firm professional body field.
- Removed the public accountant-firm practitioner / registration number field.
- Accountant firms now sign up with email, password, firm name, normal contact details, and accountant compliance declarations.
- The firm code is captured later inside authenticated Accountant HQ activation.
- `public-signup` no longer blocks accountant-firm signup when registration values are absent.
- The support signup notification no longer expects accountant registration values.

## Regression Risks

- **10-12%**: Accountant firms that expected to enter a professional registration number during public signup may look for that field. Mitigation: firm identity is now captured in the authenticated Accountant HQ profile flow, where it can be edited and controlled by the logged-in firm user.
- **<10%**: Organization signup risk is low because the removed fields were only rendered for the Accountant Firm account type.

## Verification

- Static search confirms no public `/signup` registration field, validation, field mapping, or payload value remains.
- `public-signup` keeps accountant compliance declaration validation but no longer requires registration details.
- `supabase functions deploy public-signup --no-verify-jwt` deployed the backend contract update.
