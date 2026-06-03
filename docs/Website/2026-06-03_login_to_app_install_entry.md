# Login To App Install Entry

Date: 2026-06-03

## Summary

Updated the marketing homepage login links so website visitors land on the FlowIQ app login screen with a source tag:

- `https://app.flowiq.info/login?source=website-login`

The app login screen owns the `Install FlowIQ App` option. The marketing website should continue sending users to login rather than advertising a separate native-app download.

## Files Changed

- `public/index.html`

## Regression Risks Over 10%

- None expected. The `source=website-login` query parameter is attribution-only and does not change login, signup, or redirect behavior.
