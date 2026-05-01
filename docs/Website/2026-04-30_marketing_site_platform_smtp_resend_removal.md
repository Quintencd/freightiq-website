# Marketing Site Platform SMTP Resend Removal

Date: 2026-04-30
Site: `www.flowiq.info`

## Summary

Removed direct Resend usage from the marketing site's Netlify functions and routed public lead/signup notification email through the platform SMTP mailbox.
Supabase Auth emails such as password reset and signup confirmation do not run through this Netlify site.

## Changed

- Added `netlify/functions/_platform-smtp.js`.
- Updated `netlify/functions/public-lead.js` to use platform SMTP for marketing lead/contact/demo/deck notifications.
- Updated `netlify/functions/signup-notify.js` to use platform SMTP for public signup notifications.
- Removed direct Resend fallback and Netlify Email Extension dependency from the marketing-site functions.

## Live SMTP Defaults

- Sender: `support@flowiq.info`
- Recipient: `support@flowiq.info`
- SMTP host: `mail.flowiq.info`
- SMTP port: `465`
- Secure mode: SSL

## Regression Risk >10%

- `20-30%`: public marketing notifications depend on platform SMTP secrets being set on the separate `flowiq-website` Netlify site, not only the app Netlify site.
- `15-25%`: deliverability depends on SPF/DKIM/DMARC for `flowiq.info`.
- `10-15%`: `public-lead` may still avoid failing user redirects if direct SMTP fails because the Supabase-backed request storage/notification path remains the primary safety net.
- `10-20%`: authentication emails remain dependent on the separate Supabase Auth SMTP configuration for `noreply@flowiq.info`; no Netlify setting on the marketing site controls those emails.
