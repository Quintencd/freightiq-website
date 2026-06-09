# Global Header Type Scale Reduction

Date: 2026-06-08
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Summary

Reduced oversized first-screen heading typography across the marketing website so top-card headers no longer dominate the viewport. The walkthrough page sizing remains the reference point and was not reduced.

## What Changed

- Tightened the shared `flowiq-compact-type-scale-css` override in `assets/js/main.js`.
- Reduced homepage, solution, auto-hero, redesign, pricing and article-style first-screen heading sizes.
- Reduced related homepage section heading caps so the page feels less overloaded after the first viewport.
- Bumped the light stylesheet cache version from `23` to `24`.
- Bumped the walkthrough page script and stylesheet cache keys to `v=24` while keeping its own heading scale unchanged.

## Regression Risks

- 10-15%: Broad heading selectors affect multiple marketing page families. Mitigation: the change is limited to first-screen and known FlowIQ hero/title classes, with local desktop and mobile visual checks required before publish.
- Less than 10%: Some long landing-page titles may wrap differently after the size reduction. This is intentional because the previous scale was too large for the top cards.
