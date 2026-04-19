# FlowIQ marketing site (flowiq.info) — canonical source

**This folder is the live marketing site for www.flowiq.info.**

## Workspace and Deploy Workflow

- Local folder: `/Users/quintenmac/dev/FreightIQ/flowiq_website`
- GitHub repo: `https://github.com/Quintencd/freightiq-website`
- Netlify site: `flowiq-website` (`https://www.flowiq.info`)
- Netlify site id: `e6a1f747-13f1-4856-83c1-b69104047578`

Commands:
- `npm run dev` (local static preview on `http://127.0.0.1:3333`)
- `npm run deploy:preview` (Netlify draft deploy)
- `npm run deploy:prod` (publish to production)

This folder is intentionally separate from app code changes so marketing releases can be pushed independently.

- **Edit here** for homepage, pricing, solutions, use-cases, tools, compare, glossary, signup, login, book-demo, modules, and all SEO pages.
- **Styles:** `assets/css/styles.css` + inline fallback in each HTML file (see `docs/website-styling-setup.md`).
- **Deploy:** Netlify with base directory = `flowiq_website`, publish = `.` (see `netlify.toml` in this folder).

Do **not** use the other folder `website/` for flowiq.info updates — that is a different, minimal site (3 pages, dark theme). See `docs/website-folder-structure.md` for the full map.

- **SEO source of truth:** keep the root `sitemap.xml`, `sitemap-index.xml`, and `robots.txt` in sync with the matching files under `public/`. Netlify publishes from the folder root (`publish = "."`), so the root files are the live files served at `https://www.flowiq.info/sitemap.xml`, `https://www.flowiq.info/sitemap-index.xml`, and `https://www.flowiq.info/robots.txt`.

## Analytics tracking notes

- Public-site event capture lives in:
  - `assets/website-analytics.js`
  - `assets/growth-analytics.js`
- Founder Console website reporting now depends on this stream being clean and production-aware.
- Tracking hardening notes:
  - `docs/WEBSITE_ANALYTICS_TRACKING_HARDENING_2026-03-23.md`
