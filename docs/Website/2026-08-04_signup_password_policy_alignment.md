# Signup password policy alignment — 2026-08-04

## Outcome

The public FlowIQ signup screen now matches the application and server password
policy: at least 12 characters with uppercase, lowercase, a number, a special
character and no common password pattern.

The checklist, real-time validation, form validation and error copy were
updated together so customers do not receive contradictory guidance after
submitting.

## Scope and release

- Only `signup/index.html` changed in the marketing website.
- The Supabase `public-signup` Edge Function is already live with the matching
  server-side policy.
- No price, billing, legal acceptance, analytics or organization-provisioning
  behavior changed.
- No Netlify deployment was performed; the website change becomes public only
  after the normal GitHub release.

## Regression risk

Estimated pre-mitigation risk is `10-15%` because short passwords that were
previously accepted are now rejected. Matching frontend and backend checks,
specific missing-requirement messages and unchanged signup provisioning reduce
confusion and partial-signup risk.
