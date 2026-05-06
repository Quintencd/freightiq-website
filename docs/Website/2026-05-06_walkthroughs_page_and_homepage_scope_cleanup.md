# Walkthroughs Page and Homepage Scope Cleanup

## Summary

Moved module walkthrough content out of the homepage and into a dedicated `/walkthroughs` product-tour page. The homepage now stays focused on positioning, live operational flow, customer proof and conversion instead of showing a large product walkthrough dump mid-page.

## What Changed

- Removed the `Module walkthroughs` section from the homepage.
- Added a new `/walkthroughs` page for product tours across:
  - ImportIQ
  - ForecastIQ
  - AccountingIQ
  - TaskIQ
- Added `Walkthroughs` as a top-level desktop and mobile navigation item.
- Bumped homepage and navigation cache keys:
  - `flowiq-light.css?v=15`
  - `assets/js/main.js?v=10`
- Added critical homepage customer case-study card styling so proof links render as cards even if browser stylesheet cache is stale.
- Added `/walkthroughs` to sitemap and AI SEO page generator static URL preservation.

## Rationale

The homepage should explain the commercial outcome and move visitors toward demo/signup. Detailed walkthroughs are valuable, but they belong in a separate product-tour area where a visitor can intentionally explore the system without interrupting the main sales narrative.

## Regression Risks

- 10-15%: Adding a top-level `Walkthroughs` nav item increases desktop nav density. Mitigation: it is a high-intent destination and avoids overloading the homepage.
- 10-15%: Moving walkthroughs off the homepage reduces immediate screenshot exposure. Mitigation: the nav item and future video page create a cleaner conversion path for users who want product detail.

## Production Verification

- Build: `npm run build` completed successfully on 2026-05-06.
- Deployment: Netlify production deploy `69fb4b5305674c06b5bfd9ab` for `flowiq-website`.
- Live verification:
  - `https://www.flowiq.info/` serves `flowiq-light.css?v=15` and `assets/js/main.js?v=10`.
  - Homepage no longer contains `homepage-module-motion-section` or the old walkthrough headline.
  - `https://www.flowiq.info/walkthroughs` serves the dedicated walkthrough page with ImportIQ, ForecastIQ, AccountingIQ and TaskIQ cards.
  - `https://www.flowiq.info/assets/js/main.js?v=10` includes the desktop and mobile `Walkthroughs` navigation item.
