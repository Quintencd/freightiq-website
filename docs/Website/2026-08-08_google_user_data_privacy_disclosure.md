# Google user-data privacy disclosure

Date: 2026-08-08  
Owner: FlowIQ marketing site / SettingsIQ

## Outcome

The public FlowIQ privacy page now contains a dedicated Google Email and Google
User Data section. The disclosure is separated from the general policy and the
Shopify section so Google reviewers and customers can identify the precise
Google Workspace data path without applying broad wording to unrelated data.

The policy now states:

- the normal connection uses basic identity plus `gmail.send` and cannot read,
  search, modify, or delete inbox mail;
- Incoming Documents separately requests `gmail.readonly` and uses it only for
  configured recipient or Gmail-label searches, message metadata, and supported
  PDF/image attachments;
- outbound content and user-approved incoming attachments are processed only to
  deliver visible FlowIQ features;
- OAuth tokens are encrypted server-side and never returned to the browser;
- captured records are private and organisation-scoped;
- disconnect deletes the FlowIQ credential, pauses monitoring, and attempts
  provider revocation while preserving already-captured business records under
  the organisation's retention controls;
- Google user data is not sold or used for advertising, retargeting,
  credit-worthiness, lending, data brokerage, or unrelated purposes;
- selected attachments may be processed by contracted document-processing or
  AI providers only for the requested draft-and-review extraction workflow; and
- Google Workspace API data is not used or transferred to train generalised or
  non-personalised AI/ML models.

The page also includes the explicit Google API Services User Data Policy and
Limited Use statement.

The application now links directly to this section from two in-context notices:

- **Connect Google email** explains the verified identity, send-only scope,
  encrypted tokens, and the absence of inbox access; and
- **Enable inbox access** explains configured-route monitoring, the metadata and
  attachments placed in the private review queue, contracted extraction/AI
  processing, and what disconnecting does and does not delete.

A site-wide wording audit also removed 29 copies of the absolute claim “Your
data remains private and is never shared.” Those footers now use the accurate
statement that data is protected and handled as described in the Privacy
Policy, which no longer conflicts with disclosed infrastructure and processing
providers.

The homepage and landing-page Privacy links now use `/privacy.html`, matching
the canonical OAuth consent-screen and reviewer URL instead of relying on a
redirect from `/privacy`.

## Technical truth boundary

The wording matches the deployed connector, incoming-document worker, and
AI-provider guard:

- `gmail.send` is the base permission.
- `gmail.readonly` is an optional incremental permission.
- the worker reads Gmail message metadata and supported attachments, persists
  the message identifier, sender, recipient, subject, received timestamp, and
  attachment, and does not persist unrelated message body content;
- InvoiceIQ and PurchaseIQ attachment extraction can use contracted model
  providers, but the result remains a review-first FlowIQ draft workflow. A
  production fail-closed provider guard now blocks Gmail-derived attachments before
  download unless the exact AI provider is operationally verified for the
  Google Workspace no-training boundary; and
- disconnect removes the encrypted OAuth credential and pauses routes even if
  Google does not confirm remote revocation.

This documentation does not claim that Google has approved either scope. Public
`gmail.send` remains subject to sensitive-scope verification, and public
`gmail.readonly` remains subject to restricted-scope verification and any
required security assessment.

## Release boundary

`flowiq_website/privacy.html` is updated in the standalone marketing-site
folder. It has not been deployed through Netlify by this work. The normal
GitHub-controlled marketing-site release must publish the page before FlowIQ
uses it as review evidence or tells Google that the disclosure is live.

## Verification

- Confirm the HTML headings remain sequential from 1 through 12.
- Confirm the Google policy URL is HTTPS and opens outside FlowIQ.
- Render the page at desktop and mobile widths before the website release.
- After release, confirm `https://www.flowiq.info/privacy.html` returns the new
  8 August 2026 text and matches the OAuth consent-screen URL exactly.
- Record the live privacy page in the Google verification demonstration video.

## Regression risks above 10%

- **10-15% — policy wording and actual processor terms.** The disclosure creates
  a public commitment about limited use, human access, retention, and model
  training. Mitigation: the wording is tied to current code paths; FlowIQ must
  keep provider contracts and operational support access aligned, and legal or
  privacy counsel should review it before the final provider submission.
- **15-25% — Google restricted-scope review.** Correct wording does not replace
  Google's functional review or security assessment. Mitigation: keep
  `gmail.readonly` optional and fail-closed until Google approves the exact
  production use case.
