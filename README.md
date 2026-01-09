# FlowIQ Website

A modern, responsive marketing site for FlowIQ.

## Features
- Modern design with gradient backgrounds
- Responsive mobile-first design
- Conversion-focused CTAs (trial-first, demo secondary)
- SEO optimized with meta tags
- Clear self-serve onboarding messaging (no concierge/implementation copy)
- Plan pre-selection from pricing → signup

## Tech Stack
- Static HTML + Tailwind (CDN)
- Netlify hosting

## Plan pre-selection (Pricing → Signup)
Pricing CTAs include a query param: `?plan=starter|growth|professional|scale`.

Signup pages (`/signup` and `/signup.html`) will:
- Preselect the plan from the query string (or from `localStorage` if previously chosen)
- Display the selection to reduce friction
- **Not** send the plan to the Supabase signup Edge Function payload (safe / avoids backend validation risk)

## Quick Start
- No build required (static site).
- Edit `.html` files directly and redeploy on Netlify.

## Deployment
- Build command: `echo 'Static site - no build needed'`
- Publish directory: `.`
- Primary domain: `www.flowiq.info`

Built for FlowIQ
