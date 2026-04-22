# Pricing Conversion and Attribution Hardening

Date: 2026-04-22

## Scope

Improved public-site conversion reliability and attribution quality in the canonical marketing workspace (`flowiq_website`) with a focus on the pricing funnel.

## Changes

### 1. Pricing page now participates in website funnel analytics

File:
- `pricing.html`

Added:
- `FlowIQAnalyticsConfig`
- `/assets/website-analytics.js`
- `/assets/growth-analytics.js`
- body metadata (`data-page-template`, `data-page-intent`, `data-page-topic`)

Result:
- pricing page views and pricing-page CTA interactions now flow into founder website analytics consistently.

### 2. Pricing CTAs now emit explicit conversion intent events

File:
- `pricing.html`

Added event tagging for:
- nav signup/trial buttons
- hero trial/demo buttons
- bottom decision block trial/demo buttons

Event mapping:
- trial intent: `trial_signup_click`
- demo intent: `demo_request`

### 3. Pricing page now has a guided decision block

File:
- `pricing.html`

Added a post-table conversion panel for users with plan uncertainty:
- `Request Plan Walkthrough` (demo path)
- `Start Trial Instead` (self-serve path)

Intent:
- reduce decision paralysis and push uncertain visitors into a guided demo instead of drop-off.

### 4. Signup-link attribution propagation hardened

File:
- `assets/website-analytics.js`

Added safe decoration of `/signup` links with:
- `session_id`
- `website_source_page`
- `website_source_section`
- `funnel_scope=public_website`
- `site_hostname`
- existing UTM values (if present)
- `website_cta`

Decoration runs:
- on `DOMContentLoaded` for all signup links
- on CTA click before event dispatch

Intent:
- preserve attribution continuity from marketing pages into signup flow and backend funnel reporting.

## Regression Risks (>10%)

1. **15-25%**: CTA event volume may increase versus prior baseline because pricing CTAs are now explicitly tagged and tracked, which can make pre-change and post-change trend lines non-comparable.
2. **12-20%**: Appended attribution parameters may interact with ad-hoc external links that already include custom query payloads; decoration logic preserves existing params but still changes URL shape.
3. **10-18%**: Stronger pricing conversion prompts may shift visitor mix from pure trial clicks to demo requests, changing how top-of-funnel volume appears relative to direct signup starts.
