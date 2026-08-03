# Weekly Growth Audit: Calculator Accessibility and Measurement

Date: 2026-08-03  
Scope: FlowIQ marketing website only  
Release state: implemented and locally verified; not deployed

## Outcome

This weekly pass implemented the three safest high-confidence improvements found
in the audit:

1. separated calculator discovery clicks from completed calculator uses;
2. gave every calculator input a persistent visible label and accessible name;
3. made calculated results polite, atomic live status updates for assistive
   technology.

The existing formulas, values, CTAs, lead forms, premium shell, orange accent
system, and page URLs remain unchanged.

## Prioritized Growth Findings

1. **High — calculator reporting could not measure completed uses.** The shared
   growth layer mapped `calculator_use` to `web_cta_click`, while calculator
   directory links used the same event name. The canonical
   `web_calculator_use` event was never emitted by these pages, and the generic
   plus calculator-specific click listeners could count one calculation twice.
2. **High — calculator inputs lacked accessible names.** Current-run browser
   evidence exposed the simple calculator fields only as unnamed spin buttons.
   Placeholder text disappeared after entry and did not provide a persistent
   instruction.
3. **High — calculation results were visual-only updates.** The simple result
   paragraphs did not have status or live-region semantics, so a screen-reader
   user could complete a calculation without hearing the answer.
4. **Medium — calculator demand is too small to justify a copy or CTA test.**
   Read-only production evidence since the previous run contained one tools-hub
   page view and no canonical calculator-use events. Correct measurement is the
   necessary first experiment.
5. **Medium — indexed pages still depend on public CDNs.** Tailwind, Lucide,
   Google Fonts, and related assets remain a field performance and resilience
   risk. Moving the entire site to locally built assets is larger than a safe
   three-change weekly pass.
6. **Medium — query-level and behavioral data remain unavailable.** Search
   Console, GA4 reporting, rankings, heatmaps, and field Core Web Vitals were not
   available to rank new SEO copy or calculator conversion hypotheses.

## Top Three Improvements Implemented

### 1. Truthful calculator measurement

- Calculator directory/navigation actions now emit CTA intent as
  `calculator_open` rather than claiming a completed use.
- Calculate-button actions now emit one canonical `web_calculator_use` event.
- Each use includes a stable calculator identifier derived from the route or an
  explicit page value.
- Removed the second calculate-button listener that duplicated the shared click
  handler.

Why it helps: Founder Console can distinguish discovery from real engagement and
rank calculators using completed-use evidence rather than inflated clicks.

### 2. Persistent calculator labels

- Added explicit visible labels to the Container Cost Calculator.
- Added a shared calculator-only enhancement for any remaining unlabeled input,
  select, or textarea on the seven `/tools/` calculator pages.
- Existing labels are detected and retained, so the shared enhancement does not
  duplicate them.

Why it helps: buyers can understand fields after entering values, and assistive
technology receives a usable accessible name for every calculator control.

### 3. Announced calculator results

- Calculator results now use `role="status"`, `aria-live="polite"`, and
  `aria-atomic="true"`.
- Existing result text and formula logic are unchanged.

Why it helps: keyboard and screen-reader users receive the result without a
  disruptive focus jump.

## Audit Flow and Visual Evidence

1. **Tools hub — healthy.** The calculator choice, product transition, and demo
   path are clear. The page is premium and consistent, but live demand evidence
   is too thin for a CTA rewrite.
   Screenshot: `weekly-growth-audit-captures/2026-08-03/01-tools-hub-before.png`.
2. **Container calculator input — improved from blocked accessibility to
   healthy.** Before the change, four visible fields were unnamed spin buttons.
   After the change, each has a persistent label and the desktop hierarchy is
   unchanged.
   Screenshots: `02-container-calculator-before.png` and
   `04-container-calculator-after.png`.
3. **Calculated result — functionally healthy, accessibility corrected.** The
   formula returned R7,000 for the bounded test case, and the result now exposes
   a polite atomic status region.
   Screenshot: `03-container-result-before.png`.
4. **Mobile calculator — healthy.** At 390 x 844, the labels, controls, and
   Calculate action reflow without horizontal overflow.
   Screenshot: `05-container-calculator-after-mobile.png`.

Screenshot review does not establish full WCAG conformance. Keyboard traversal,
screen-reader output across multiple engines, 400% zoom, contrast computation,
and reduced-motion behavior still require a dedicated accessibility pass.

## Production Evidence

Read-only query time: 2026-08-03 07:03:44 UTC  
Database host: `10.106.5.114`  
Window: 2026-07-27 07:01:55.304 UTC through query time

- 481 `web_module_engagement`
- 346 `web_page_view`
- 68 `web_cta_click`
- 50 `web_scroll_depth`
- 9 `web_pricing_view`
- 6 `web_signup_error`
- 1 page view for `/tools/`
- 0 canonical `web_calculator_use` events
- 0 demo-start or demo-submit events in the bounded production filter

The query was direct, read-only PostgreSQL using `DATABASE_URL` from the main
app's local environment. No database write, migration, repair, or deployment was
performed.

## Files Changed

- `assets/growth-analytics.js`
- `assets/js/main.js`
- `tools/container-cost-calculator.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-08-03_weekly_growth_audit_calculator_accessibility_and_measurement.md`
- five accepted PNG captures under
  `docs/Website/weekly-growth-audit-captures/2026-08-03/`

## Validation

- JavaScript syntax checks for all changed shared scripts
- calculator analytics contract checks for open/use mapping and listener
  de-duplication
- seven-route calculator DOM contract checks, including 29 of 29 visible fields
  with accessible names, calculator IDs, canonical analytics actions, and live
  result status semantics
- bounded formula check returning R7,000 for a two-container example
- 1440 x 900 desktop and 390 x 844 mobile render inspection
- zero horizontal overflow on every calculator route at the audited mobile width
- no browser console errors in the accepted tools/calculator render flow
- root/public sitemap, sitemap-index, and robots parity
- local HTTP smoke checks for the tools hub, all calculator pages, and changed
  shared assets
- `git diff --check`

## Regression Risks Above 10%

- **10-20% analytics baseline shift:** completed calculator uses will begin
  appearing under `web_calculator_use`, while calculator navigation stays in CTA
  intent. Mitigation: existing backend event allowlists and stable event names
  are reused, and only one calculate listener remains.
- **10-15% calculator layout risk:** persistent labels add vertical height to
  compact calculator cards. Mitigation: the enhancement is calculator-only,
  skips existing labels, uses the current type/spacing system, and passed desktop
  plus mobile overflow checks.
- **10-12% shared-runtime risk:** label and result enhancement lives in the
  global shell script. Mitigation: it exits unless `#calc-submit` exists and
  touches only calculator controls/results; all seven calculator routes were
  checked.
- **10-12% crawl-refresh risk:** refreshed tool timestamps may prompt recrawling.
  Mitigation: URLs, canonicals, formulas, and claims remain unchanged.

## Data Gaps

- Google Search Console queries, impressions, CTR, positions, and indexing data
- GA4 reports or raw export
- Microsoft Clarity/Smartlook recordings, heatmaps, rage clicks, and scroll maps
- external keyword ranking history
- field Core Web Vitals and real-user performance traces
- production CDN/request logs
- a post-release baseline using the corrected calculator event contract

## Next Recommended Growth Experiment

After approval, deployment, and at least two weeks of corrected data, rank the
calculator pages by unique completed-use sessions. On the highest-volume page,
test a restrained result-adjacent CTA: `See this calculation in FlowIQ` versus
the current page-end trial/demo actions. Measure calculator use to demo start,
trial click, and qualified completion without gating the free result.

## Release Boundary

No Netlify deployment, Git push, commit, branch creation, database write,
migration, app change, or admin-console change was performed. The user must
approve these website-only changes before any live release.
