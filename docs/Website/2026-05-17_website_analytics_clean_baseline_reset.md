# Website analytics clean baseline reset

Date: 2026-05-17
Scope: FlowIQ public website analytics only

## Action

Cleared historical website analytics rows from production so future reporting starts from a clean post-tracking-upgrade baseline.

Deleted rows matched only:

```sql
org_id = '00000000-0000-0000-0000-000000000000'
and event_type like 'web_%'
```

## Deleted Counts

- `web_page_view`: 2,961
- `web_cta_click`: 538
- `web_signup_start`: 150
- `web_demo_request_submit`: 74
- `web_onboarding_complete`: 70
- `web_signup_complete`: 12
- `web_signup_error`: 8

Total deleted: 3,813 website analytics rows.

## Verification

- Remaining website `web_%` rows after reset: `0`
- Non-website analytics rows remained present: `232`

## Notes

This reset did not touch product/app analytics, billing analytics, upgrade analytics, or customer organization data.

The new baseline should be measured after the updated marketing website and admin console are deployed through the normal GitHub/Netlify path.
