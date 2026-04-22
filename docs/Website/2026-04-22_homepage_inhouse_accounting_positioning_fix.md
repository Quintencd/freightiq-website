# Homepage in-house accounting positioning fix

## Date
2026-04-22

## Summary
Updated homepage integrations messaging to reflect that FlowIQ includes a full in-house accounting system and does not require accounting handoff to external platforms.

## Change
- Updated `/Users/quintenmac/dev/FreightIQ/flowiq_website/index.html` (Integrations section):
  - Heading changed from `FlowIQ fits around your existing stack.` to `FlowIQ runs with full in-house accounting.`
  - Card label/text changed from `Accounting handoff` copy to `Native accounting core` with explicit in-platform accounting language.
  - CSV/API card reframed as optional connectivity, not core accounting dependency.

## Why
Previous wording implied accounting handoff/external dependency, which conflicts with the actual product positioning of native in-house accounting workflows.

## Regression Risk (>10%)
- **10-15% (Low):** messaging now emphasizes native accounting more strongly, which may require minor alignment updates in other website pages that still mention third-party integration-first framing.

## Verification
- Visual copy check in homepage integrations block.
- Production deploy completed.
