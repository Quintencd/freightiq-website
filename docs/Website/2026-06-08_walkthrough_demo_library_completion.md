# Walkthrough Demo Library Completion

Date: 2026-06-08
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`
Branch: `codex/website-walkthroughs-polish`

## Summary

Built the self-serve walkthrough library into a premium selling tool for prospects. The page now uses compact website typography, guided module cards, modal video playback, sales captions, feature callouts, chapter navigation and browser-only 1080p product recordings.

## What Changed

- Reworked `/walkthroughs/` so the top of the page is compact and no longer carries a stuck hero video.
- Added 16 publishable module walkthrough cards with:
  - real 1080p app recordings
  - poster images
  - module-specific benefit copy
  - chapter lists
  - timed captions
  - orange highlight boxes and pointers over the video area
- Added demo recording automation under `scripts/demo-recordings/`:
  - `npm run auth:demo`
  - `npm run record:demo -- <module-id>`
  - `npm run record:demo:all`
- Added generated assets under:
  - `assets/videos/demo-library/`
  - `assets/images/demo-library-posters/`
- Trimmed the generated videos to remove startup loading screens before publishing the assets.
- Ignored local authentication and raw recording output:
  - `.auth/`
  - `test-results/demo-recordings/`
- Added a compact type-scale guard in `assets/js/main.js` to reduce oversized headings across homepage, solution pages, pricing and article-style pages.
- Bumped the website light CSS cache key to `flowiq-light.css?v=23`.

## Completed Walkthroughs

- DashboardIQ
- CompaniesIQ
- SalesIQ
- InvoiceIQ
- PurchaseIQ
- ImportIQ
- InventoryIQ
- ForecastIQ
- PriceIQ
- AccountingIQ
- ReportsIQ
- PayrollIQ
- TaskIQ / WorkIQ / TimeIQ
- ProjectsIQ / Delivery Operations
- EcomIQ / ExportIQ / WarrantyIQ
- Settings and Admin Controls

## Blocked Walkthrough

CashIQ was not published because the current FlowIQ Demo Org opens an app-level Access Denied screen for `/cashiq`. The app allowlist restricts CashIQ to the Biomek-enabled org, so publishing that recording would look unprofessional and would not function as a selling demo. CashIQ should be recorded from the Biomek-enabled org before it is added back to the public walkthrough library.

## Verification Notes

- `npm run record:demo:all` completed and produced the module recordings; the CashIQ access-denied capture was then removed from the publishable set.
- All publishable videos are 1920x1080 MP4 files and all publishable posters are JPG files generated from the trimmed recordings.
- `npm run record:demo -- --help` lists active modules and identifies CashIQ as blocked.
- `npm audit --audit-level=high` passed. npm still reports an existing moderate PrismJS issue through the React Email dependency chain; the suggested fix is a breaking forced upgrade and was not included in this website walkthrough branch.
- No Netlify deployment was run. The website should be pushed and deployed through the normal GitHub-controlled flow.

## Regression Risks

- 10-15%: The compact type-scale guard affects multiple marketing page families. Mitigation: the selectors are constrained to known FlowIQ page classes and only reduce oversized hero/header typography.
- 10-12%: The walkthrough page now depends on locally hosted video assets. Mitigation: posters and videos are versioned in the page, use browser-native playback, and fall back to the overview poster if a poster is missing.
- Less than 10%: Recording automation changes are isolated to development scripts and ignored auth/raw recording files.
