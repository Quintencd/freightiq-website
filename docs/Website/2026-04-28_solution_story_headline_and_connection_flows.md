# Solution Story Headline And Connection Flows

Date: 2026-04-28

## Scope

Updated the active FlowIQ solution story pages:

- `solutions/importers.html`
- `solutions/manufacturers.html`
- `solutions/multi-branch.html`
- `solutions/retail-outlets.html`
- `flowiq-light.css`

## What Changed

- Reduced the shared solution hero headline scale so long story headings no longer dominate or collide with the visual panel on desktop.
- Restored the moving connector action on `solution-flow-lane` with an animated orange dot and a moving line treatment between the cards.
- Renamed the section kicker from "Connected actions" to "Connected flows" so the label matches the connected-flow story.
- Added a subtle flowing wash behind the lane, staggered icon pulse, and light hover lift so the connected-flow section feels alive without becoming a heavy animation block.
- Added responsive connector links between cards in the three-column browser layout so the flow still reads as connected before it collapses to one column on phones.
- Increased the at-rest polish by adding sequential card glow, tiny desktop flow particles, and responsive card wash timing so the flow is visibly alive even without hover.
- Added the connected six-step "Smart business flow in action" section back to each active solution story:
  - importers: Forecast -> Buy -> Ship -> Cost -> Receive -> Report
  - manufacturing: Plan -> Build -> Consume -> Receive -> Sell -> Account
  - multi-branch: Plan -> Allocate -> Transfer -> Execute -> Sell -> Decide
  - retail/ecommerce: Capture -> Check -> Fulfil -> Invoice -> Replenish -> Measure
- Bumped solution page stylesheet references to `flowiq-light.css?v=13` so browser previews pick up the adjusted type scale and restored connector animation.

## Regression Risks Over 10%

- **12%**: Short hero headlines may now feel slightly less dramatic because the shared max size was reduced for all active solution story heroes.
- **12-15%**: The restored animated connector and icon pulse may feel busy on lower-powered devices, mitigated by the existing `prefers-reduced-motion` rule and by disabling the connector animation on tablet/mobile stacked layouts.
- **10-15%**: The added flow sections increase page length; mitigated by keeping each step compact and reusing the existing solution-flow component.

## Verification

- Parsed the four changed solution HTML pages with Python `html.parser`.
- Ran `node --check flowiq_website/assets/js/main.js`.
- Served the website locally with `npm run dev` and verified `/solutions/manufacturers.html` returns `200`.
- Browser-reviewed the manufacturers story hero and connected-flow section at `http://localhost:3333/solutions/manufacturers.html`.
- Rechecked the narrower in-app browser layout and confirmed the three-column flow now uses a snake path: Plan -> Build -> Consume -> Receive -> Sell -> Account.
