# Public Funnel Tracking, Signup Activation, and Homepage Conversion Pass

## Summary

This pass is canonically documented in the live marketing workspace because the public-site funnel, CTA tracking, and marketing-page ownership belong here.

The related app-side work remains in the app repo for:

- `/signup` flow handling
- app-side website attribution capture
- founder website analytics backend aggregation

## Website-Side Scope

The canonical public website owns:

- root marketing pages such as `index.html`, `landing.html`, `pricing.html`, and `payroll-software-south-africa.html`
- analytics scripts in `assets/website-analytics.js` and `assets/growth-analytics.js`
- public demo / trial CTA wiring

## Repo Boundary Outcome

- Website pages and website-only documentation belong in `flowiq_website`
- App signup and shared Supabase analytics logic belong in `FreightIQ`
- Founder console UI belongs in `flowiq-admin-console`

## Regression Risks

### 1. Wrong-repo edits reappearing if ownership checks are skipped (25-35%)

If work starts from the wrong checkout and files are edited before repo ownership is confirmed, the same split problem can recur.

### 2. Duplicate website docs drifting across repos (15-20%)

If website pass notes are stored in multiple clones without a clear canonical owner, future updates can diverge and create uncertainty about where the live website should be edited.
