# Growth route and signup validation repair — 7 September 2026

## Scope and release boundary

This local marketing-site repair addresses findings from the 7 September growth review. No Netlify deployment, commit, push, database write, campaign, signup or outreach was performed. The user releases the website through GitHub.

## Business Units route

- `modules/business-units.html` and `assets/img/generated/business-command-story.webp` were present locally, linked from the module directory and listed in the sitemap, but both were excluded by the broad `*business*` ignore rule.
- Added exact public-file exceptions. The existing module page, its image URL, module-directory link and sitemap URL are retained; no rewrite or copy change was needed.
- The files must be included in the next website GitHub release for the hosted 404 to clear.

## Signup validation measurement

- The 93 recorded errors came from two direct Chrome sessions repeatedly submitting the same incomplete client-side state. Every event was `client_validation` with the same missing values: industry, company size, country, referral source and Turnstile verification. The request never reached the signup API.
- The four FlowIQ custom selectors populate their hidden form inputs correctly in the local browser smoke test. Required selection and CAPTCHA controls remain enforced.
- Added `assets/signup-error-telemetry.js`. It sends one analytics event per session for each distinct required-field combination while preserving the error message and field highlighting on every attempt. This prevents repeated incomplete attempts from being treated as repeated funnel failures.
- API/request failures and different validation combinations remain individually reported. No signup qualification, account creation, security validation or consent rule was relaxed.

## Verification

- `node --test tests/growth-readiness.test.mjs`: six tests pass, including ignore exceptions and session-level telemetry deduplication.
- `npm run validate:modules`: validated 32 detail pages, JSON-LD, local assets, links and sitemap parity.
- Local Chrome smoke: selected Industry, company size, country and referral source; each expected hidden input contained its submitted value. External requests were blocked. The CAPTCHA itself was not solved or submitted.

## Risks

- Route and asset inclusion: 10–15% release risk if either exact file is omitted from the GitHub release. This is reduced by the narrow exceptions and module validation.
- Signup telemetry comparison: 15–25% reporting-baseline risk. Raw missing-field event counts will fall for repeated attempts, while unique session and distinct validation-combination evidence remains available.
- The repeated source sessions may be automation or abandoned attempts. This repair improves reporting quality but does not establish a customer-facing CAPTCHA defect. Confirm hosted signup and accepted-lead reporting after release.
