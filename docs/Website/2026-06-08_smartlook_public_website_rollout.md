# Smartlook Public Website Rollout

Date: 2026-06-08
Scope: FlowIQ public marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

Implemented Smartlook on the public FlowIQ marketing website by adding a shared head-loaded script at `/assets/smartlook.js` and referencing it from public website HTML pages.

## Changes

- Added `assets/smartlook.js` with the Smartlook web SDK loader.
- Initialized Smartlook with project key `c58e2339f3ef5eef657f0a32764f5689dffe2446`.
- Set Smartlook region to `eu`.
- Added `<script src="/assets/smartlook.js"></script>` inside the `<head>` of public marketing website pages so session recording starts early.
- Updated `privacy.html` to disclose public website behavior analytics and Smartlook as a trusted analytics provider.

## Privacy Handling

- Smartlook's current web SDK documentation says sensitive form inputs, IP addresses, on-page emails, and numbers are not recorded by default unless explicitly enabled through its record API.
- This rollout does not enable sensitive-data recording.
- This rollout does not call Smartlook Identify API because the public website does not have a verified logged-in user identity path.
- The private FlowIQ app and founder/admin console were intentionally left out of scope. Those surfaces can expose customer, billing, operational, and founder-console data and should only receive Smartlook after explicit masking/consent rules are designed.

## Validation

- `node --check assets/smartlook.js`
- Confirmed the shared include is present on representative public pages:
  - `index.html`
  - `book-demo.html`
  - `customers/biomek-case-study.html`
  - `public/index.html`
- Confirmed `privacy.html` now discloses website session/behavior analytics and Smartlook.
- Confirmed no Smartlook include was added to the private app root, `flowiq-admin-console`, or root `public` app folder.

## Regression Risks (>10%)

- 10-15%: Smartlook adds a third-party network request to public website pages, so strict ad blockers, privacy extensions, or network controls may block it. The script is asynchronous and should not block page rendering.
- 10-12%: Session-recording consent requirements can vary by market and policy. The implementation keeps Smartlook's default privacy-first behavior, but legal/privacy copy may still need review before broad paid acquisition.

## Deployment Note

- No Netlify deploy was run.
- The user requested website deploys continue through GitHub rather than direct Netlify publishing.
