# Netlify Live Deploy Audit

## Context

Checked why `https://www.flowiq.info/` was not showing the latest homepage and module-flow updates.

## Findings

- The website source is correctly in `/Users/quintenmac/dev/FreightIQ/flowiq_website`.
- The website Git remote is `https://github.com/Quintencd/flowiq-website.git`.
- Local `main`, `origin/main`, and GitHub remote all point to commit `9e9f4508a9bf54d8a03968c16fe21e45beb2fa81`.
- The live site is still serving an older deploy with `/flowiq-light.css?v=16`.
- The local/latest website source uses `/flowiq-light.css?v=18` and includes the homepage `fresh-flow-band` module marquee.
- Netlify production deploys for `flowiq-website` have failed since 2026-05-01. The latest failed production deploy was commit `9e9f4508a9bf54d8a03968c16fe21e45beb2fa81`.
- The last ready production deploy found in Netlify history was from 2026-04-29, which explains why production is behind.

## Netlify Project Routing

- Website project: `flowiq-website`
- Website site id: `e6a1f747-13f1-4856-83c1-b69104047578`
- Website production URL: `https://www.flowiq.info`
- The local `flowiq_website` folder was previously linked to the app project `freightiq`.
- The local Netlify link was corrected to `flowiq-website` to reduce wrong-project deployment risk.

## False-Positive Secret Scan Fix

Netlify's deploy validation reported secret-scan matches for non-sensitive display/config values, especially `PLATFORM_EMAIL_FROM_NAME`. That value is expected to appear publicly because it is likely the brand/display sender name.

Set production build-scope `SECRETS_SCAN_OMIT_KEYS` for non-sensitive keys only:

- `PLATFORM_EMAIL_FROM_NAME`
- `PLATFORM_EMAIL_FROM`
- `PLATFORM_SMTP_HOST`
- `PLATFORM_SMTP_PORT`
- `PLATFORM_SMTP_SECURE`

Real credential-like keys such as SMTP user, SMTP password, and Supabase service role were not omitted.

## Verification

- `npx netlify build` succeeds locally.
- Live production still shows the old version until a new production deploy is run or retried.

## Regression Risks

- Risk above 10%: Netlify may still fail if another plugin or secret scan key is blocking the deploy. Mitigation: check the next production deploy after retry before assuming the issue is fully resolved.
- Risk above 10%: The local Netlify folder remains ignored state; another machine may still be linked to the wrong Netlify project. Mitigation: always use the explicit website deploy scripts or verify `npx netlify status` shows `flowiq-website` before manual deploys.
