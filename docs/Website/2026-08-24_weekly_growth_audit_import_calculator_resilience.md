# Weekly Growth Audit: Import Calculator Resilience

Date: 2026-08-24  
Scope: FlowIQ marketing website only  
Release state: implemented for local review; not deployed

## Outcome

This weekly pass implemented the three safest high-confidence improvements on
the two highest-intent import-cost calculators:

1. explicit indexability directives and refreshed sitemap dates;
2. calculator-specific reporting context and stable completion identifiers;
3. source-level labels, autocomplete hints, and polite atomic result updates.

The formulas, values, claims, CTAs, URLs, shared analytics event names, lead
destinations, premium layout, and orange accent system are unchanged.

## Prioritized Growth Findings

1. **High - import-cost fields depended on JavaScript for persistent labels.**
   The shared runtime repaired accessible names after load, but the source HTML
   still exposed placeholder-only calculator and lead fields before the runtime
   completed or when it failed.
2. **High - calculator reporting fell back to generic marketing context.** The
   two pages had no explicit page template, intent, or topic, and the landed-cost
   calculate button relied on runtime-derived identity.
3. **Medium-high - result announcements depended on runtime enhancement.** The
   calculated values were not atomic status messages in the source contract.
4. **Medium - indexed calculator pages had no explicit robots directive.** They
   remained crawlable by default, but the contract was less explicit than the
   canonical research pages around them.
5. **Medium - current demand is too small for a result-adjacent CTA test.** The
   bounded production window contained one tools-hub page view and no canonical
   calculator-use event.
6. **Medium - the new demo questionnaire has insufficient post-launch evidence.**
   Since its 22 August rollout, `/book-demo` recorded two page views and no demo
   start or submit event. This is too little traffic for a conversion rewrite.
7. **Medium - public CDN dependencies remain a performance and resilience risk.**
   Tailwind, Google Fonts, and Lucide remain externally loaded on indexed pages;
   local bundling is broader than this safe weekly pass.

## Top Three Improvements Implemented

### 1. Explicit search contract

- Added `index,follow,max-image-preview:large` robots directives to the import
  cost and landed cost calculators.
- Refreshed only those two URLs to `2026-08-24` in both sitemap copies.

Why it helps: search systems receive an explicit indexability signal on two
canonical, sitemap-listed high-intent tools without changing their URLs or copy.

### 2. Stable measurement context

- Added calculator page template, intent, and topic metadata to both pages.
- Added stable `import-cost` and `landed-cost` identifiers to the Calculate
  buttons while retaining the canonical `calculator_use` action.

Why it helps: completed-use events can be grouped reliably by tool rather than
falling back to generic marketing-page context or route inference.

### 3. Resilient calculator and lead-form accessibility

- Added persistent source-level labels to the import-cost calculator and its
  email-result form.
- Added email and organisation autocomplete hints.
- Made calculated results polite atomic status updates and gave the landed-cost
  result container a stable accessible label.

Why it helps: the core task remains understandable before shared enhancement
scripts run, and assistive technology receives the result without a focus jump.

## Current-Run UX Evidence

1. **Freight calculator entry - healthy.** The FlowIQ shell, task title, compact
   calculator, and two next-step CTAs are visually clear. Runtime enhancement
   currently supplies visible labels, confirming that source-level parity can be
   added without redesigning the component.
2. **Import-cost calculation - improved.** The calculation and save-result path
   now retain persistent labels and reporting identity in source HTML.
3. **Landed-cost result - improved.** The result has one labelled container and
   one polite atomic status message, avoiding a disruptive focus change.

Accepted captures are stored under
`docs/Website/weekly-growth-audit-captures/2026-08-24/`.

Screenshot evidence does not establish full WCAG compliance. Keyboard order,
screen-reader output across engines, 400% zoom, contrast computation, and
reduced-motion behavior still require a dedicated accessibility pass.

## Production Evidence

Read-only query time: 2026-08-24 07:02:47 UTC  
Database host: `10.106.5.114`, database `postgres`  
Window: 2026-08-17 07:08:15.378 UTC through query time

- 410 `web_module_engagement` events
- 397 `web_page_view` events across 190 identified sessions
- 47 `web_signup_error` events from 2 identified sessions
- 39 CTA clicks across 34 identified sessions
- 29 scroll-depth events across 18 identified sessions
- 13 pricing views across 9 identified sessions
- 12 onboarding starts, 1 signup start, and no signup completion
- 344 homepage page views, 17 `/pricing` views, 2 `/book-demo` views, and 1
  `/tools/` view
- no canonical calculator-use, demo-start, demo-submit, or video-engagement
  events in the bounded window

The analytics query was direct, read-only PostgreSQL using `DATABASE_URL` from
the main app environment. No database write, migration, repair, or deployment
was performed. The 47 signup errors are concentrated in two desktop sessions:
45 Chrome events in one session and 2 Edge events in one session. Their payloads
contain no error code or message, so they are not enough to justify a signup-flow
change without finer error telemetry and crawler-quality evidence.

## Files Changed

- `tools/import-cost-calculator.html`
- `tools/landed-cost-calculator.html`
- `sitemap.xml`
- `public/sitemap.xml`
- `CHANGELOG.md`
- `docs/Website/2026-08-24_weekly_growth_audit_import_calculator_resilience.md`
- current-run captures under
  `docs/Website/weekly-growth-audit-captures/2026-08-24/`

## Validation

- syntax checks for shared analytics and calculator runtime JavaScript
- calculator DOM contract checks for robots, canonicals, reporting metadata,
  stable IDs, persistent labels, and live-result semantics
- bounded formula checks for import and landed cost
- root/public sitemap, sitemap-index, and robots parity
- local browser smokes for both changed pages and source parsing for SEO files
- desktop and mobile render inspection, overflow checks, console review
- module marketing validator and `git diff --check`

## Regression Risks Above 10%

- **10-15% compact-form layout risk:** persistent labels add vertical height to
  the import calculator and save-result card. Mitigation: existing FlowIQ grid
  styles are retained and both desktop and mobile renders are checked.
- **10-12% analytics-series risk:** explicit calculator IDs and reporting context
  may create more specific groupings than historical generic events. Mitigation:
  the canonical event name and action remain unchanged.
- **10-12% crawl-refresh risk:** refreshed lastmod values may prompt recrawling.
  Mitigation: URLs, canonicals, formulas, and claims remain unchanged, and both
  sitemap copies are synchronized.

## Data Gaps

- Google Search Console queries, impressions, CTR, positions, and indexing data
- GA4 reports or raw export
- Microsoft Clarity/Smartlook recordings, heatmaps, rage clicks, and scroll maps
- external keyword ranking history
- field Core Web Vitals and real-user performance traces
- production CDN/request logs
- a post-release calculator-use baseline
- sufficient post-launch demo questionnaire sessions

## Next Recommended Growth Experiment

After approval, deployment, and at least 30 genuine calculator sessions, rank
the tools by unique completed-use sessions. On the highest-volume calculator,
test `See this calculation in FlowIQ` beside the result against the current
page-end trial and demo actions.

## Release Boundary

No Netlify deployment, Git push, commit, branch creation, database write,
migration, app change, or admin-console change was performed. The user must
approve these website-only changes before any live release.
