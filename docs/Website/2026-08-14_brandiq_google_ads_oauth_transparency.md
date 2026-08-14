# BrandIQ Google Ads OAuth transparency

## Outcome

The marketing source now includes a dedicated reviewer-facing homepage at
`/brandiq-google-ads.html` and a Google Ads-specific privacy section at
`/privacy.html#google-ads-data`.

The public content explains:

- the Google identity and Google Ads information FlowIQ processes;
- customer account selection and business isolation;
- reporting, attribution and recommendation purposes;
- the approval boundary for supported campaign and budget changes;
- encrypted OAuth storage, disconnect and deletion behaviour;
- that connection does not authorise bank payments, wallet top-ups or
  unrestricted automated spending; and
- that FlowIQ does not sell Google Ads data or use Google API data to train a
  general-purpose AI model.

## Google OAuth configuration

After the website source is released through the normal GitHub deployment
path, configure the dedicated `flowiq-brandiq-ads-2026` project with:

- app homepage: `https://www.flowiq.info/brandiq-google-ads.html`;
- privacy: `https://www.flowiq.info/privacy.html#google-ads-data`;
- terms: `https://www.flowiq.info/terms.html`; and
- authorised domain: `flowiq.info`.

No Netlify deployment was performed in this change. The live URLs must be
checked for HTTP 200 and rendered content before the OAuth verification form is
submitted.
