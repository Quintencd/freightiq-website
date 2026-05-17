# Source attribution and journey tracking hardening

Date: 2026-05-17
Scope: FlowIQ marketing website in `/Users/quintenmac/dev/FreightIQ/flowiq_website`

## Context

Recent public-site changes added more direct solution pages, video/product content, and updated modular pricing. The next decision window should be based on cleaner attribution and journey data rather than assuming pricing is the only blocker.

## Changes

- Fixed the canonical website analytics sender to use `fetch` with Supabase `apikey` and `Authorization` headers instead of `navigator.sendBeacon`.
- Added a proper browser session context with:
  - per-session `session_id`
  - durable anonymous `visitor_id`
  - landing page path, URL, and title
  - session start time and session age
  - page-view count
  - previous page
  - compact journey path for the latest 20 page views
- Expanded source attribution so `analytics_events.event_data` can distinguish:
  - direct traffic
  - organic search
  - paid campaigns
  - email campaigns
  - social campaigns
  - organic social
  - referrals
  - AI assistant referrals such as ChatGPT, Perplexity, Gemini, Claude, and Copilot when browser referrer or UTM tags expose them
- Preserved first-touch and last-touch attribution, including UTM values and common ad click IDs (`gclid`, `msclkid`, `fbclid`, `li_fat_id`).
- Mapped 50% and 90% scroll events into the Supabase website analytics stream through `web_scroll_depth`.

## How To Read The Data

Use the month after the pricing/content/video update as the clean measurement window. Segment by:

- `traffic_source_category`
- `traffic_source_platform`
- `first_touch_platform`
- `landing_page_path`
- `journey_path`
- `page_group`
- `web_signup_start`
- `web_signup_complete`
- `web_demo_request_submit`

Direct visits should be treated separately from Google, paid campaigns, LinkedIn/social, referral, and AI-assistant traffic. For manually shared links, use UTMs so founder-led outreach does not look like anonymous direct traffic.

## Regression Risks

- 10-15%: Event volume may increase because scroll depth now reaches Supabase analytics, not only GA/GTM.
- 10-12%: Session counts will become more accurate but less comparable to the older persistent `localStorage` session id baseline.
- 10-12%: Supabase analytics delivery now depends on `fetch` with keepalive instead of `sendBeacon`; this is intentional because the Supabase gateway requires auth headers.

## No DB Migration

No migration was required. The existing `analytics_events.event_data` JSON payload stores the new attribution and journey fields.
