# Paragon Partner Referral Attribution

## Outcome

The FlowIQ signup page now accepts two optional, server-validated Paragon attribution routes:

- `partner_ref=<permanent-campaign-code>` for a Founder-activated partner campaign; and
- `partner_warm_ref=<unguessable-uuid>` for one consented warm introduction.

The page preselects the existing FlowIQ-styled partner referral source and sends the canonical value separately from human-entered referral detail. It does not add a browser-native selector.

After the account and organisation exist, `public-signup` calls a service-only canonical attribution RPC. Invalid, paused, retired, withdrawn, expired or conflicting claims cannot create or replace attribution. Attribution failure is non-blocking and cannot undo a valid new FlowIQ account.

## Privacy

Campaign attribution stores the resulting organisation and business name only; it does not copy signup contact name, email, phone or business narrative to Paragon. Warm-introduction contact data was already supplied under explicit consent and is governed by the FinanceIQ withdrawal/redaction path.

## Release note

No Netlify deployment was performed. Publish the marketing website through the normal GitHub-controlled website process together with the compatible `public-signup` Edge Function.

Local browser acceptance confirms both supported URL shapes preselect `Paragon Finance referral`: campaign links show `Paragon partner campaign`, warm-introduction links show `Paragon warm introduction`, and the signup page has no horizontal overflow. The existing local Tailwind CDN warning is unrelated to this attribution change.

## Regression risks above 10%

- Public signup carries a 12–18% regression risk because it is a critical acquisition path. The mitigation is optional validated fields, unchanged provisioning order, post-success attribution and a non-blocking error boundary.
- False attribution carries a 12–18% risk. The canonical service RPC validates active campaign/token state and preserves one unique first-touch organisation link; free-text referral fields are never canonical evidence.
