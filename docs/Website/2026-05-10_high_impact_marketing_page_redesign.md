# High-Impact Marketing Page Redesign

Date: 2026-05-10

## Summary

Applied a focused page-by-page premium light redesign to the highest-impact FlowIQ marketing pages after the broad site-wide polish layer. This pass keeps the website local only, preserves existing public routes, and does not deploy through Netlify.

## Pages updated

- `/erp-for-importers`
- `/tools/`
- `/tools/import-cost-calculator`
- `/solutions/`
- `/customers/`
- `/book-demo`
- `/modules/importiq`

The homepage, pricing page, and modules hub already had stronger custom structures from the previous premium work, so this pass did not rewrite those pages. They remain covered by the shared premium light system and were included in validation.

## What changed

- Added reusable high-impact page components to `flowiq-light.css` for:
  - premium split heroes
  - proof chips
  - stat panels
  - solution/module cards
  - calculator layouts
  - conversion CTA bands
- Rebuilt thin landing pages into stronger conversion pages with clearer section hierarchy and FlowIQ orange action hierarchy.
- Upgraded the import cost calculator page without changing the calculator IDs, form names, hidden fields, analytics scripts, or calculation logic.
- Kept customer proof content intact while improving the hero, proof framing, and case-study layout.
- Kept the book demo form action, fields, custom country selector, feature selector, analytics hooks, and scripts intact.
- Kept the ImportIQ page compatible with the existing module-story renderer.

## Validation

- Route smoke checks passed for `/`, `/pricing`, `/modules`, `/modules/importiq`, `/solutions/`, `/customers/`, `/book-demo`, `/tools/`, `/tools/import-cost-calculator`, and `/erp-for-importers`.
- Browser screenshots were reviewed for the redesigned pages plus pricing.
- CSS brace check passed.
- `assets/js/main.js` and `assets/js/module-story.js` syntax checks passed.
- `git diff --check` passed for the touched website files.

## Regression risks

- 15-20%: This pass changes structure on multiple conversion pages. Mitigation: changes are limited to the marketing website and keep existing scripts/forms/routes intact.
- 10-15%: The ImportIQ page is still rendered by `module-story.js`; fallback markup was improved, but runtime output depends on the existing renderer. Mitigation: browser review confirmed the rendered ImportIQ page remains polished and readable.
- 10%: Calculator interaction behavior depends on the existing inline script and unchanged input IDs. Mitigation: the script and IDs were preserved.

## Notes

- No app, admin console, Supabase, or Biomek website files were changed for this pass.
- No Netlify deploy was run.
