# Marketing Site App Shell Rollback

Date: 2026-04-24
Time: 08:27 SAST

## Summary

- `https://www.flowiq.info` was stuck on the app shell `Loading...` screen.
- Production had been pointed at an app-style deploy instead of the static marketing homepage.
- Restored production to the last verified static marketing deploy.
- Re-linked the local `flowiq_website` Netlify project to `flowiq-website` so local Netlify commands target the marketing site context.

## Bad Deploy

- Netlify site: `flowiq-website`
- Site id: `e6a1f747-13f1-4856-83c1-b69104047578`
- Bad published deploy: `69e8fc843a41fe882380d213`
- Bad deploy published: `2026-04-23T07:50:21.694Z`
- Bad deploy title: `InvoiceIQ email PDF quality+spacing+ship-to hardening`
- Bad deploy source: `api`
- Symptom: homepage HTML contained the FlowIQ app shell metadata and rendered `Loading...` instead of the static marketing homepage.

## Restored Deploy

- Restored deploy: `69e880ce9ff2340008eed977`
- Restored deploy created: `2026-04-22T08:03:26.670Z`
- Restored to production: `2026-04-24T06:26:42.875Z`
- Restore command:
  ```bash
  netlify api restoreSiteDeploy --data '{"site_id":"e6a1f747-13f1-4856-83c1-b69104047578","deploy_id":"69e880ce9ff2340008eed977"}'
  ```

## Verification

- Confirmed published deploy id:
  ```bash
  netlify api getSite --data '{"site_id":"e6a1f747-13f1-4856-83c1-b69104047578"}' | jq -r '.published_deploy.id'
  ```
- Confirmed live homepage no longer serves the app shell:
  ```bash
  curl -L https://www.flowiq.info | rg 'Loading\\.\\.\\.|Landed Cost Software|ERP Software|FlowIQ'
  ```
- Expected live marker after rollback:
  - `Landed Cost Software for Importers | FlowIQ`
  - No `Loading...` marker.

## Local Netlify Context Fix

The local `flowiq_website` folder was still linked to the `freightiq` Netlify project (`https://app.flowiq.info`) even though this folder is the marketing site source. It was re-linked with:

```bash
netlify unlink
netlify link --id e6a1f747-13f1-4856-83c1-b69104047578
netlify status
```

Expected status:

- Current project: `flowiq-website`
- Project URL: `https://www.flowiq.info`
- Project Id: `e6a1f747-13f1-4856-83c1-b69104047578`

## Regression Risks Over 10%

- **25%**: Another manual/API deploy can republish app build output to `flowiq-website` if a script targets the website site id with the app `dist` directory.
- **20%**: The old app-shell deploy remains in Netlify history and can be restored manually by mistake.
- **15%**: A valid static marketing deploy can still regress content if deployed from stale local files without live marker checks.

## Guardrail

For marketing-site production changes, deploy only from `/Users/quintenmac/dev/FreightIQ/flowiq_website` and verify `netlify status` shows `flowiq-website` before publishing.
