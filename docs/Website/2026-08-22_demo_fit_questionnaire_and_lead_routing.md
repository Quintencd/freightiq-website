# Demo-Fit Questionnaire and Lead Routing

Date: 2026-08-22  
Scope: FlowIQ marketing website only (`/Users/quintenmac/dev/FreightIQ/flowiq_website`)

## Outcome

The existing `Book a demo` destination is now a welcoming demo-fit questionnaire. It helps prospects clarify where work is difficult, what they want FlowIQ to improve, and which starting point suits their team before a conversation.

The page does not tell visitors that they passed or failed qualification. Every complete request receives the same positive confirmation flow, while the internal notification labels the lead for appropriate follow-up.

## Customer-Facing Questionnaire

The `/book-demo` route captures:

- business name, business type, operating context, and team size;
- current software, spreadsheets, paper processes, or other workflow;
- main pain points and current struggles;
- what the prospect wants FlowIQ to improve so the team can work efficiently and reclaim time;
- current monthly software spend, clearly marked optional and accepted in the prospect's currency;
- relevant FlowIQ modules, including a `Not sure yet` choice;
- intended timeline, buying/decision role, job title, and onboarding readiness;
- required first name, last name, work email, contact number, country, and response consent.

The module choices use styled FlowIQ checkbox cards, readiness and timing use styled FlowIQ radio cards, and country selection keeps the existing searchable custom country control. The page avoids browser-native select UI.

## Submission and Support-Inbox Delivery

The form continues to submit to the established `/.netlify/functions/public-lead` function.

For `demo_fit_v1` submissions, the function:

1. validates the required contact, business, workflow, readiness, and consent fields;
2. calculates the lead classification on the server rather than trusting the browser value;
3. packages the classification and every questionnaire answer into the existing `message` field so the current `demo_requests` schema remains compatible;
4. sends the full notification directly through the existing platform SMTP integration to `SUPPORT_EMAIL_TO`;
5. retains database-trigger email as the established backup when the request is stored; and
6. mirrors the classification and individual answers to Netlify Forms on a best-effort basis.

No support email address is added to the questionnaire markup. Live delivery still requires the existing marketing-site environment configuration:

- `SUPPORT_EMAIL_TO`
- `PLATFORM_SMTP_HOST`
- `PLATFORM_SMTP_PORT`
- `PLATFORM_SMTP_USER`
- `PLATFORM_SMTP_PASS`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

No new third-party service, account, database table, or migration was introduced.

## Internal Lead Labels

- `qualified_demo`: stronger near-term demo fit based on team scale, timeline, decision involvement, onboarding readiness, and relevant module breadth.
- `self_serve`: smaller teams that are exploring for later or prefer self-guided resources.
- `nurture_or_incomplete`: early, mixed, lower-readiness, or incomplete qualification context that needs a gentler follow-up.

Monthly software spend is not used in the classification score. It remains optional context only.

## CTA Routing

All existing general marketing-site `Book a demo`, `Request a demo`, and module walkthrough CTAs already resolve to `/book-demo` or `/book-demo.html`; upgrading that destination makes the questionnaire the site-wide demo-request entry point without a broad, regression-prone CTA rewrite.

Three pricing CTAs now add narrow journey context while retaining the same destination:

- pricing hero: `source=pricing&plan=plan-fit`;
- pricing module section: `source=pricing_modules&plan=module-fit`;
- pricing bottom plan walkthrough: `source=pricing_bottom&plan=plan-fit`.

Same-site referrals from supported module-detail routes preselect the corresponding questionnaire module when the browser provides a referrer. The visitor can change or remove that selection before submitting.

## Validation

The completion pass checks:

- JavaScript syntax for the questionnaire and lead function;
- qualified-demo, self-serve, nurture/incomplete, missing-required-field, and legacy demo payload behavior with mocked network/email delivery;
- required-field and consent behavior in the browser;
- pricing query-context and module-referrer prefilling;
- support-notification subject and answer completeness;
- desktop and mobile layout, console errors, local HTTP routes, and `git diff --check`;
- existing module-marketing validation.

## Regression Risks Above 10%

- **15-25% conversion-volume risk:** the demo request is intentionally longer than the previous short form. It should improve context and lead quality but may reduce raw completion volume. Watch demo-start versus demo-submit conversion after release.
- **10-20% notification dependency risk:** direct inbox delivery depends on the existing marketing-site SMTP environment variables remaining valid. Database storage and its existing trigger provide backup coverage, but live SMTP configuration should remain part of release verification.
- **10-15% attribution-series risk:** changing the page intent from `demo_booking` to `demo_fit` may create a new reporting segment. The canonical demo-start and demo-submit events remain unchanged.

## Release Note

No Netlify deployment, commit, or push was performed. Website publishing remains through the user's GitHub workflow.
