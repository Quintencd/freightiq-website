# Homepage Clarity Pass (Visual + UX)

Date: 2026-04-19

## Scope
- Page updated: `index.html`
- Goal: reduce information overload on homepage and improve conversion path clarity.
- Constraint: keep pricing matrix and plan logic unchanged.

## Visual Audit Method
- Desktop visual pass in Chrome against local server (`127.0.0.1:5180`).
- Mobile visual pass using Chrome Device Mode (responsive width `400px`).
- Pricing page verified in mobile mode to ensure table-only pricing remained intact.
- Local route parity check (`/pricing`, `/modules`, `/book-demo`, etc.) using `npx serve . -l 5180`.
  - Note: Python `http.server` does not apply Netlify-style route behavior and can show false 404s.

## Changes Applied
1. Simplified homepage narrative into overview-first flow:
   - Clear hero message
   - Short "What Changes Fast" section
   - Direct "Choose Your Path" cards (Who it's for / Modules / Pricing)
   - Compact module snapshot cards
   - Trust + integration section
   - Final CTA retained
2. Removed high-density/duplicated sections that made the page feel heavy:
   - Removed "The Tension" block
   - Removed "The FlowIQ System" step strip
   - Removed long screenshot-heavy module deep-dives from homepage
3. Removed interaction clutter:
   - Removed modal screenshot/lightbox code from homepage
   - Removed magnetic hover movement script for hero cards
4. Kept core conversion actions prominent:
   - `Start Free Trial`
   - `Book Demo`
   - Quick links to detail pages for self-directed exploration

## Regression Risks (>10%)
- **18% risk**: lower internal-link density on homepage may reduce long-tail SEO discovery for some deep topic pages.
  - Mitigation: keep/use dedicated SEO pages (`/solutions/*`, `/tools/*`, `/compare/*`) and continue linking from nav/footer.
- **14% risk**: visitors who preferred dense technical detail above the fold may require one extra click to modules/pricing.
  - Mitigation: `Choose Your Path` cards were added to shorten that path.
- **12% risk**: removing image modal and magnetic effects reduces visual interactivity for some users.
  - Mitigation: prioritizes clarity/readability and lowers cognitive load, especially on mobile.

## Not Changed
- Pricing matrix values/features and plan bundle logic were not changed in this pass.
- Timeline/TimeIQ display removal remains in effect (`Execution (ProjectsIQ/WorkIQ)`).
