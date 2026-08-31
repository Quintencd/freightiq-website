# Growth readiness repairs — 31 August 2026

## Scope and release boundary

Approved follow-up to the weekly growth report. Marketing-site changes are local on main for the user's GitHub release; no Netlify deployment, commit or push. No campaign, public lead or signup was created. Separate reporting changes live in the app Edge Function and admin-console repositories.

## Changes

- Narrow `.gitignore` exception for `erp-for-multi-branch-businesses.html`, previously hidden by `*business*`. Include this previously untracked HTML when committing; the existing canonical, sitemap URL and Netlify rewrite are retained. Its secondary links now target the real calculator and walkthrough directory rather than a savings promise or homepage anchor.
- Public landed-cost copy and FAQ now describe a free shipment-wide average, not per-SKU allocation, automatic FX handling or an inventory-writing tool. Removed the unsupported 5–15% claim. Formula, form destinations, input IDs, tracking IDs and existing FlowIQ layout are unchanged.
- Signup success now uses the growth bridge (GA4 plus canonical website event) or the direct website sender, never both. This fixes the observed two completion events eight milliseconds apart without changing account provisioning.
- Missing-field failures retain validation and security checks, but carry `required_fields_missing`, stage and field-name metadata. No submitted field values are added. Other failures identify client-validation versus signup-request stage.

## Signup diagnosis

The 59 events from one session are client-side missing-field errors before the public-signup request. The source still writes selections into hidden inputs and checks required fields and Turnstile. This does not prove a broken registration API or 59 lost prospects. No validation relaxation or qualification redesign was warranted. Duplicate completion reporting was independently reproduced and fixed.

## Verification

- `node --test tests/growth-readiness.test.mjs`: four checks for route inclusion, copy/formula boundaries, one completion with/without growth bridge and unchanged validation guards.
- App focused analytics/signup tests: 13 passed, including the new reporting helper and marketing-zero adapter test.
- Module validator: 32 detail pages, assets, links, JSON-LD and sitemap parity passed.
- Local browser: calculator 50000 + 8000 + 4000 / 1000 returns R62.00; desktop 1280px and mobile 390px have no document horizontal overflow. Restored ERP route renders the existing premium shell at mobile width. No live form submission or CAPTCHA interaction performed.
- Hosted signup, email delivery and production route acceptance remain after the user's website release.

## Risks

Planning estimates, not measured probabilities: route/canonical release risk 10–15%, reduced by preserving the existing URL and rewrite and adding an exact-file exception. Reporting comparability risk 15–25% belongs to the separate additive analytics rollout. Signup event totals will decrease because duplicate success events are removed; unique sessions remain comparable. The formula and signup security rules are untouched.

No broad refactor of the large signup file: moving provisioning/validation code would increase unrelated risk. The reporting classification is extracted into a small separately tested backend helper instead.
