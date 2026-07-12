# Premium homepage visual-system prototype

Date: 2026-07-12
Scope: `flowiq_website` homepage only
Deployment: not deployed

## Objective

Rebuild the FlowIQ homepage presentation around a calmer, product-led premium SaaS system while preserving the existing search, analytics, navigation, and conversion contracts. The homepage is the controlled prototype for a later site-wide rollout; no indexed secondary page was visually changed in this pass.

## Visual direction

The homepage now uses:

- warm white, charcoal, stone, and restrained FlowIQ orange instead of competing multi-colour glow and gradient treatments;
- lighter editorial headline weights and tighter type hierarchy instead of uniformly heavy typography;
- thin structural lines, deliberate whitespace, and low-shadow surfaces;
- real FlowIQ product screens as the primary hero proof;
- quiet FlowIQ-orange pill CTAs with complete hover and focus-compatible states;
- restrained orange icon tiles on solution and proof cards to add brand energy without recolouring the card surfaces;
- one high-energy closing conversion band using solid FlowIQ orange, a charcoal primary trial button, and a light outlined demo button;
- a tabbed command-centre preview for DashboardIQ, ImportIQ, and ForecastIQ;
- simplified solution, product-flow, walkthrough, customer-proof, and closing-CTA treatments.

The Product Tour uses a light stone surface with charcoal heading copy and muted-dark supporting copy, keeping only the kicker and primary action in FlowIQ orange for consistent contrast.

The implementation is isolated in `assets/css/homepage-premium.css`, scoped through `data-page-template="homepage"`. This prevents the prototype from accidentally changing the indexed pricing, module, solution, comparison, customer, glossary, or article pages.

## Preserved contracts

The redesign retains:

- the `/` canonical URL;
- page title, description, keywords, Open Graph, Twitter, and JSON-LD data;
- existing `WebSite`, `WebPage`, `SoftwareApplication`, and `FAQPage` schema;
- signup, demo, pricing, module, customer, solution, and walkthrough destinations;
- existing `data-analytics-*` conversion attributes;
- the shared website analytics scripts;
- the shared desktop and mobile navigation implementation;
- existing crawlable business-platform, audience, module, outcome, and integration copy.

The hero preload now targets the visible DashboardIQ product screen rather than the replaced generated warehouse scene.

## Interaction contract

The hero product preview exposes three semantic tab buttons:

- Command centre
- Imports
- Forecasting

The active tab synchronizes `aria-selected`, the visible screenshot, and the active underline. The control remains usable without animation, and the stylesheet disables non-essential motion for `prefers-reduced-motion` users.

The product screens also rotate automatically every 4.2 seconds. Rotation pauses while the carousel is hovered or keyboard-focused, restarts after a manual selection, stops when the page is hidden, and remains disabled for visitors who prefer reduced motion.

The carousel uses dedicated 2048px WebP captures generated from the original full-resolution FlowIQ PNG screenshots. The three optimized files remain between roughly 88KB and 105KB each, providing materially sharper text and controls than the previous 1200px thumbnails without loading the much heavier PNG sources.

## Regression risks and mitigation

- **15-20% visual cascade risk:** the website has a large legacy light-theme stylesheet plus page-level inline CSS. Mitigation: the new rules are homepage-scoped and loaded after the legacy stylesheet; other indexed pages are untouched.
- **10-15% responsive composition risk:** a large product screenshot and editorial typography can overflow on smaller screens. Mitigation: dedicated 960px and 640px layouts stack CTAs and cards, reduce type scale, and switch the product stage to a mobile-friendly aspect ratio.
- **10-15% conversion-measurement risk:** replacing CTA markup can break reporting. Mitigation: the established hero and downstream `data-analytics-event`, position, and label attributes were retained.
- **10-15% performance risk:** replacing the hero with multiple product images can increase transfer size. Mitigation: only the DashboardIQ screen is preloaded/eager; inactive ImportIQ and ForecastIQ screens are lazy-loaded.

## Site-wide rollout boundary

Do not copy homepage overrides directly into every page. After the homepage direction is approved, extract the accepted tokens and components into a shared marketing design-system layer, then migrate page families in controlled groups:

1. navigation, footer, buttons, typography, and spacing;
2. modules and walkthroughs;
3. pricing and signup conversion pages;
4. customers, solutions, and comparison pages;
5. long-tail SEO and glossary templates.

Every rollout group must preserve its canonical URLs, schema, analytics attributes, sitemap coverage, and visible search copy.
