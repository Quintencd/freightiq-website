# Signup Turnstile Human Verification

Date: 2026-07-03

## Scope

- Added Cloudflare Turnstile to `flowiq_website/signup/index.html`.
- The signup form now requires a Turnstile token before it calls the shared `public-signup` Supabase Edge Function.
- The token is sent as `turnstile_token` and the widget resets after each submission attempt because tokens are single-use.

## Server Dependency

- The actual bot block is enforced server-side in `supabase/functions/public-signup/index.ts`.
- Supabase must have `CLOUDFLARE_TURNSTILE_SECRET_KEY` configured before the updated Edge Function is deployed.
- If the secret is missing, signup fails closed before creating organizations or Auth users.

## Regression Risk

- `10-15%`: signup can be blocked if the Cloudflare Turnstile widget hostname allowlist does not include the marketing domain.
- Below `10%`: pricing plan selection, referral capture, legal acceptance, and support notification payloads are unchanged apart from `turnstile_token`.

## Deployment

- No Netlify deploy was performed.
