# 14-Day Trial Copy Alignment

## Summary

Public website trial copy now matches the app/backend trial duration: `14-day free trial`.

Updated public-facing surfaces include:

- Signup page metadata, hero copy, account-type hint, and plan-trial badges.
- Legal/footer navigation CTAs.
- Module, use-case, glossary, comparison, tools, brochure, and landing-page CTAs that explicitly named the trial duration.
- Signup/welcome email templates that described the trial length.

## Deployment Note

No Netlify deploy was run from this workspace. The marketing website changes are ready for the normal GitHub-driven website deployment flow.

## Regression Risk

Risk is above `10%` because public CTA wording can shift trial/demo conversion and must match the backend contract.

Mitigations:

- Only explicit trial-duration wording was changed.
- General analytics/reporting references such as `Last 30 days` were intentionally left untouched.
- App/backend static tests cover the signup contract and website signup copy.

