# Homepage Motion Sections and Video Readiness

## Summary

Added lightweight homepage motion sections so the FlowIQ marketing site feels more alive before full recorded module videos are produced.

## What Changed

- Added animated hero overlay chips for live operational signals:
  - shipment cost updated
  - forecast risk detected
  - month-end ready
- Added a `Live Business Flow` homepage section showing animated module-to-module movement across ImportIQ, InventoryIQ, ForecastIQ, InvoiceIQ, AccountingIQ and PayrollIQ.
- Added a `Module walkthroughs` homepage section using existing module screenshots as motion-ready cards for:
  - ImportIQ
  - ForecastIQ
  - AccountingIQ
  - TaskIQ
- Added responsive CSS so the motion blocks stack cleanly on tablet and mobile.
- Added `prefers-reduced-motion` handling for the new animation classes.
- Bumped the homepage stylesheet cache key from `flowiq-light.css?v=12` to `flowiq-light.css?v=13` so production browsers fetch the new motion styles.
- Kept the implementation CSS/HTML based, with no heavy video assets, so the homepage gains motion without YouTube embed or MP4 performance cost.

## Production Verification

- Build: `npm run build` completed successfully on 2026-05-06.
- Deployment: Netlify production deploy `69fb456b348bc38776e62aff` for `flowiq-website`.
- Live verification:
  - `https://www.flowiq.info/` serves `flowiq-light.css?v=13`.
  - Homepage HTML includes `homepage-live-flow-section`, `homepage-module-motion-section` and `hero-motion-stack`.
  - `https://www.flowiq.info/flowiq-light.css?v=13` includes the new motion CSS and reduced-motion handling.

## Video Readiness

The new sections create natural drop zones for future module walkthrough videos. The motion-card structure can later swap screenshot cards for short compressed WebM/MP4 loops or YouTube links without redesigning the homepage.

## Regression Risks

- 10-15%: Additional homepage motion can feel busy for some users. Mitigation: animations are subtle, short, branded, and disabled under `prefers-reduced-motion`.
- 10-15%: More visual sections increase homepage height. Mitigation: the motion sections are conversion-oriented and make the product easier to understand before customer proof and CTAs.
- 10-15%: Screenshot-based module cards may look less polished than future recorded product videos. Mitigation: they are intentionally used as placeholders and can be replaced by real walkthrough clips later.
