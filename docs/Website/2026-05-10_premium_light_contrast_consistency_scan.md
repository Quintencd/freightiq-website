# Premium Light Contrast Consistency Scan

Date: 2026-05-10

## Summary

Rescanned the public FlowIQ marketing website for legacy dark utility classes and low-contrast button/text risks after the premium light rollout. The follow-up keeps the change website-only and does not deploy through Netlify.

## What changed

- Added defensive contrast guardrails to `flowiq-light.css` so old dark classes such as slate/black backgrounds render as light premium surfaces inside `premium-light-page`.
- Standardized legacy dark secondary buttons to light neutral buttons with readable slate text.
- Preserved orange, green, blue, and red action buttons with white text so primary CTAs still have the correct hierarchy.
- Lightened legacy dark footers and footer link states.
- Added padding to calculator prose cards so article copy does not sit against the card border.
- Hid the decorative quote icon on the old landing page because it overlaid the quote copy when the page was normalized into the light shell.
- Kept calculator logic, pricing logic, analytics hooks, URLs, and form markup unchanged.

## Pages checked

- `/`
- `/pricing`
- `/modules`
- `/solutions/`
- `/tools/`
- `/erp-for-importers`
- `/modules/importiq`
- `/tools/import-cost-calculator`
- `/customers/`
- `/compare/`
- `/glossary/`
- `/payroll-software`
- `/payroll-software-south-africa`
- `/landing`
- `/standalone-landing`

## Validation

- Static route smoke checks returned no HTTP failures for the representative page set.
- Browser screenshots were checked for the flagged pages with known legacy dark markup: import cost calculator, landing, standalone landing, payroll pages, and pricing.
- CSS brace check passed.
- `assets/js/main.js` syntax check passed.

## Regression risks

- 10-15%: This is a broad visual safety layer, so there is some risk that an intentionally dark decorative panel will now render light. This is acceptable for the current website direction because the requested target is a consistent premium light marketing site.
- 10%: Legacy pages using hand-built absolute decorative icons may need small visual cleanup after the light normalization. The visible overlap found on the old landing page was fixed by hiding the decorative quote icon.

## Notes

- Remaining `text-white` class strings are expected on orange CTA buttons and are intentionally preserved visually as white text.
- No Netlify deploy was run.
