# Homepage Clean Notebook-Style Redesign

## Summary

Simplified the FlowIQ homepage into a cleaner, lighter front-door experience inspired by the low-clutter structure of NotebookLM. After design review, the first viewport was adjusted back to the stronger generated FlowIQ operations image while keeping the shorter routing sections and proof-led homepage structure.

## What Changed

- Replaced the dashboard-like homepage layout with a minimal `fresh-home` structure.
- Removed long operational sections from the homepage flow.
- Restored the generated FlowIQ operations command image in the first viewport because it better matches the previous visual direction and gives the homepage a stronger brand signal.
- Kept lightweight motion/proof overlays on the hero image:
  - import cost updated
  - stock risk detected
  - month-end ready
- Reduced homepage text density and moved detail into navigable pages:
  - `/solutions/`
  - `/customers`
  - `/walkthroughs`
  - `/inventory-forecasting-software`
- Kept only high-signal proof on the front page:
  - R60k-R70k/month reported saving
  - 1,200+ SKUs managed
  - 5/5 customer reviews
- Bumped homepage CSS cache key to `flowiq-light.css?v=17`.

## Rationale

The homepage should not behave like a dashboard or documentation page. It should quickly communicate the category, outcome and trust signals, then route visitors to the right deeper page. This reduces scroll fatigue and keeps product detail available without making the first screen feel heavy.

## Regression Risks

- 10-15%: Less homepage detail may reduce immediate keyword density visible to users. Mitigation: SEO landing pages and navigation retain detailed topical content.
- 10-15%: The homepage now relies more heavily on the generated hero image than the attempted animated reel. Mitigation: this restores the stronger visual treatment the founder preferred while keeping the page cleaner underneath.

## Previous Production Verification

- Build: `npm run build` completed successfully on 2026-05-06.
- Deployment: Netlify production deploy `69fb4dfcc83a1c160c3fdd79` for `flowiq-website`.
- Live verification:
  - `https://www.flowiq.info/` serves `flowiq-light.css?v=16`.
  - Homepage HTML includes `fresh-home`, `motion-reel`, `route-cards` and `proof-cards`.
  - Homepage markup no longer includes the old `homepage-live-flow-section` section.

## Local Correction After Design Review

- Restored the original generated hero image locally in:
  - `flowiq_website/index.html`
  - `public/index.html`
- Updated the homepage stylesheet cache key locally to `flowiq-light.css?v=17`.
- Local build verification: `npm run build` completed successfully after this correction.
- Kept the cleaner homepage routing structure below the hero:
  - solution route cards
  - customer proof cards
  - single demo CTA band
- No Netlify deployment was run for this correction. The founder asked to handle the next Netlify deployment manually.
