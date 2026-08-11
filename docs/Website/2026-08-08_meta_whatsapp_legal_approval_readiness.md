# Meta and WhatsApp legal approval readiness

Date: 8 August 2026  
Scope: FlowIQ marketing website legal pages only

## Outcome

The existing public Privacy Policy and Terms now identify the legal operator as
`FLOWIQDEV (PTY) LTD`, trading as FlowIQ, and describe the implemented Customer
Desk Meta/WhatsApp data boundary in plain customer-facing language.

No new legal page, callback, application code, database change, provider action,
or deployment was introduced by this update.

## Public disclosures added

- WhatsApp identity, message, delivery-status, conversation, voice-note, image,
  audio, video, and document data used for organisation-authorised Customer Desk
  functions.
- Encrypted server-side Meta credentials and the limited connection metadata
  needed to operate and secure an organisation's connection.
- Private organisation-scoped access to conversations, media, identity links,
  and reviewed relationship context.
- Organisation-configured retention, withdrawal of relationship-memory
  permission, and lawful business-record retention boundaries.
- Disconnect semantics: stop new access, attempt Meta unsubscribe, delete the
  local encrypted credential and provider connection identifiers, but preserve
  existing customer history until normal retention or a verified deletion
  process applies.
- A deletion route for organisation administrators and WhatsApp customers at
  `support@flowiq.info`, including the information needed to identify the
  relevant organisation and WhatsApp account safely.
- Organisation responsibility for lawful messaging authority, notices,
  consent, templates, opt-outs, provider fees, and Meta/WhatsApp policies.

## Validation

- Confirm both pages retain their existing layout, navigation, footer, and
  stylesheet references.
- Confirm the exact legal entity appears and the old `FlowIQ (Pty) Ltd` company
  definition is removed from these pages.
- Confirm the privacy page contains a stable `meta-whatsapp-data` anchor and a
  visible deletion process.
- Confirm all section headings remain unique and correctly ordered.
- Run the website's existing static module validation as a regression check.
- Render both pages at desktop and mobile widths and inspect for overflow,
  broken hierarchy, or layout regressions.

## Regression risk

Estimated regression risk is below 10%. The change is copy-only and preserves
the existing page structure and visual primitives. The principal residual risk
is legal interpretation rather than software behavior; the public wording must
continue to match the implemented Customer Desk retention, disconnect, and data
handling behavior as those capabilities evolve.

## Release boundary

This change is local only. It was not committed, pushed, or deployed. The public
URLs will continue to show the previous copy until the website's normal GitHub
release process publishes these files.
