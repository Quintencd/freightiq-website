# Repo Ownership and Change Routing

## Purpose

Prevent website, app, and founder-console changes from being made in the wrong repository.

## Canonical Ownership Map

### 1. Marketing website repo

- Path: `/Users/quintenmac/dev/FreightIQ/flowiq_website`
- GitHub repo: `https://github.com/Quintencd/freightiq-website`
- Owns:
  - `www.flowiq.info`
  - homepage, pricing, SEO landing pages, `book-demo`, public assets, website analytics scripts, and website docs/changelog

### 2. App repo

- Path: `/Users/quintenmac/dev/FreightIQ`
- Owns:
  - product app UI
  - `/signup` app flow
  - Supabase functions and shared backend logic
  - app-side attribution capture that receives traffic from the website

### 3. Founder console repo

- Path: `/Users/quintenmac/dev/FreightIQ/flowiq-admin-console`
- Owns:
  - founder/admin console UI only

## Required Working Rule

Before the first edit:

1. confirm the current repo path
2. confirm the remote
3. classify the task as `website`, `app`, `console`, or `shared backend`
4. write docs in that repo's own docs area

## Routing Guide

- Public page copy/layout/CTA/SEO/tracking on `flowiq.info`: website repo
- Product signup behavior, post-signup redirect, auth/session flow: app repo
- Founder analytics UI cards/charts/filters: founder console repo
- Founder analytics Supabase function logic: app repo

## Regression Risks

### 1. Shared-flow ambiguity between website and app (20-30%)

Signup and analytics touch both the website and the app. If the task is not split into website-side and app-side ownership before editing, files can still land in the wrong repo.

### 2. Dirty local worktrees increasing merge risk (10-20%)

Both website and console repos can have unrelated local changes. Editing without reading status first increases the chance of stomping user work or mixing unrelated scopes.
