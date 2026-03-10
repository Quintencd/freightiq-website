# FlowIQ marketing site (flowiq.info) — canonical source

**This folder is the live marketing site for www.flowiq.info.**

- **Edit here** for homepage, pricing, solutions, use-cases, tools, compare, glossary, signup, login, book-demo, modules, and all SEO pages.
- **Styles:** `assets/css/styles.css` + inline fallback in each HTML file (see `docs/website-styling-setup.md`).
- **Deploy:** Netlify with base directory = `flowiq_website`, publish = `.` (see `netlify.toml` in this folder).

Do **not** use the other folder `website/` for flowiq.info updates — that is a different, minimal site (3 pages, dark theme). See `docs/website-folder-structure.md` for the full map.

- **SEO source of truth:** keep the root `sitemap.xml` and `robots.txt` in sync with `public/sitemap.xml` and `public/robots.txt`. Netlify publishes from the folder root (`publish = "."`), so the root files are the live files served at `https://www.flowiq.info/sitemap.xml` and `https://www.flowiq.info/robots.txt`.
