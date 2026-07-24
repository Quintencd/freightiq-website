# Trial signup and first-viewport conversion alignment

Date: 2026-07-22  
Scope: FlowIQ marketing website only

## Outcome

- The homepage keeps its approved premium visual system while bringing the existing product carousel higher into the first desktop and mobile viewport.
- Pricing now explains one chronological journey: immediate 14-day full access, plan comparison during the trial, and subscription activation to continue.
- Registration no longer asks a standard organization to choose between six plans. It still collects the required company, contact, industry, size, country, referral, security, and legal data.
- Shopify install claims and safe in-app return paths are preserved through the canonical marketing signup.
- The app-hosted `/signup` route redirects to this marketing signup with its query string and hash intact.
- Signup-start analytics now records the first meaningful form interaction once. CTA clicks remain CTA events and no longer inflate the signup-start funnel.
- Password conformance is now one all-or-nothing visual gate: no rule turns green
  until length, lowercase, uppercase, number, and the local common-pattern check
  all pass. Obvious common/leetspeak variants are blocked before submission,
  while Supabase remains authoritative for its broader leaked-password check.

## Customer contract

1. Register without choosing a plan or entering payment details.
2. Use the full product for 14 days.
3. Review and activate a plan in `Settings -> Billing & Subscription` before the trial ends.
4. If the trial ends first, the workspace remains safe and access resumes after subscription activation.

The Welcome Bonus modules remain a separate post-activation promotion. They are not a second trial and are not charged without the customer's confirmed checkout selection.

## Regression controls

- Existing field names, Turnstile, click-wrap evidence, support notification payloads, and public-signup field aliases remain intact.
- The password field name, payload, and Supabase save path are unchanged. The
  website only adds pre-submit conformance guidance and continues to display the
  server's definitive weak-password detail if Supabase rejects the save.
- Legacy clients may still send a valid plan intent, but `public-signup` does not invent a plan for a standard marketing signup.
- Shopify claim handling is covered on both the redirect and Edge Function paths.
- The homepage change is spacing-only; no approved imagery, proof content, navigation, or component system was replaced.

## Regression risks above 10%

- **10-15% signup integration risk:** retiring the app form could have lost Shopify claim context. Mitigation: the app redirect preserves all query/hash state, the marketing form sends `shopify_install_claim`, and focused contract tests cover the handoff.
- **10-15% analytics baseline risk:** signup-start volume will drop because CTA clicks and submit clicks are no longer counted as form starts. This is an intended correction; conversion reporting should compare sessions and the new first-field trigger, not the old raw event count.
- **10-12% first-viewport layout risk:** tighter hero spacing can change wrapping on smaller screens. Mitigation: changes use the existing responsive breakpoints and require desktop/mobile browser review before website release.
- **10-12% password acceptance risk:** the narrow local common-pattern detector
  can reject an obvious password variant before Supabase receives it. Mitigation:
  the rejected patterns are transparent, the underlying password payload is
  unchanged, and Supabase remains the final authority for accepted saves.

## Deployment boundary

No Netlify deployment is performed by this work. Website files are prepared for the existing GitHub release workflow.
