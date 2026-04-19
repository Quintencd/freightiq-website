# FlowIQ Marketing Website Changelog

## [1.3.4] - April 19, 2026

### Module Preview Swap + Pricing Header Cleanup

- Replaced the `EcomIQ` and `AccountingIQ` module placeholder cards with branded UI preview assets based on the supplied app screenshots.
- Updated `modules.html` to use the new preview assets instead of placeholder SVGs.
- Removed the top-left `FlowIQ` wordmark from the pricing-page navigation to reduce clutter.
- Tightened pricing table plan headers and shortened plan suffixes from `/month` to `/m` and `/year` to `/yr`.
- Verified the local marketing site now serves the new module asset references and compact pricing header labels.

### Regression Risk Notes (>10%)

- **12%**: Module preview SVGs may drift from the live app UI if app screens evolve and the website previews are not refreshed with them.
- **11%**: Shortening price suffixes improves scan speed, but a small subset of visitors may find `/m` and `/yr` slightly less explicit on first glance.

## [1.3.3] - April 19, 2026

### Homepage Clarity + Mobile UX Pass

- Reworked `index.html` into an overview-first structure to reduce cognitive overload.
- Removed duplicated high-density homepage sections:
  - `The Tension`
  - `The FlowIQ System`
  - long screenshot-heavy module deep-dives
- Added clearer conversion flow:
  - concise hero copy
  - `What Changes Fast`
  - `Choose Your Path` cards (`Who it's for`, `Modules`, `Pricing`)
  - compact module snapshot cards
  - trust/integration summary
- Removed non-essential interaction complexity on homepage:
  - screenshot modal/lightbox markup + JS
  - magnetic hover movement script
- Performed visual checks in Chrome:
  - desktop pass
  - mobile pass via responsive device mode
  - pricing page mobile verification to confirm table-only model still holds
- Confirmed clean local route behavior (`/pricing`, `/modules`, etc.) when served with `npx serve` on `:5180`.

### Regression Risk Notes (>10%)

- **18%**: Reduced homepage internal-link density may slightly lower long-tail SEO discovery from the homepage.
- **14%**: Some visitors wanting detailed module copy above the fold may need one extra click.
- **12%**: Removed motion/lightbox effects may reduce perceived interactivity for a subset of users.

## [1.3.2] - April 19, 2026

### App Pricing Matrix Parity + TimeIQ Display Removal

- Aligned `pricing.html` comparison matrix rows and bundle logic to match app billing matrix semantics.
- Synced `pricing-data.json` from app canonical source (`src/config/subscriptionPlans.js`).
- Removed `TimeIQ` module mention from pricing module bundle display:
  - Now shown as `Execution (ProjectsIQ/WorkIQ)`.

## [1.3.1] - April 19, 2026

### Pricing UX Simplification (Cards Removed)

- Removed the top pricing snapshot card strip from `pricing.html`.
- Kept the pricing comparison table as the single pricing surface.
- Updated billing toggle behavior to refresh table only.
- Updated error fallback rendering to target the pricing table wrapper.

### App Parity Pricing Visibility

- Synced `pricing-data.json` from app canonical source (`src/config/subscriptionPlans.js`).
- Added explicit plan price display in the pricing table header for Monthly/Annual views.
- Annual mode now shows discount labels directly in header cells (matching app pricing values).

## [1.3.0] - April 19, 2026

### ✅ Marketing Workspace Separation + Correct Site Baseline Restore

- Set up dedicated local marketing folder at `flowiq_website/` (separate from app code workflows).
- Confirmed git remote points to marketing repo:
  - `https://github.com/Quintencd/freightiq-website`
- Re-linked Netlify in this folder to the correct marketing site:
  - `flowiq-website` (`e6a1f747-13f1-4856-83c1-b69104047578`)
- Restored the approved full-site variant (Landed Cost / editorial layout family) into this folder for homepage and core marketing pages.
- Added explicit deploy scripts in `package.json`:
  - `npm run deploy:preview`
  - `npm run deploy:prod`
- Updated `README.md` with the canonical local/GitHub/Netlify workflow.

### Regression Risk Notes (>10%)

- **18%**: If deployment is triggered from app workspace instead of `flowiq_website/`, mixed content can reappear.
  - Mitigation: only deploy marketing from `flowiq_website/`.
- **14%**: If route aliases are edited without matching redirects, pretty URLs can diverge from `.html` pages.
  - Mitigation: keep `netlify.toml` redirects aligned with page files.

## [1.2.0] - October 11, 2025

### 🎨 Major UX Enhancements

#### Interactive Plan Selection
- Added visual plan selection chips to contact form
- Implemented active state highlighting with smooth transitions
- Added real-time feedback for selected plans
- Plan selection persists across pages via sessionStorage

**Files:**
- `index.html` - Enhanced contact form with plan chips
- `pricing.html` - Updated CTAs to use data-plan attributes

**CSS Added:**
```css
.plan-chip - Interactive button styling
.plan-chip:hover - Hover state with border color change
.plan-chip.is-active - Active state with orange glow
details[open] .faq-toggle-icon - FAQ accordion animation
```

#### Implementation Roadmap Section
- New 3-step onboarding showcase
- Customer success metrics highlighted
- "What customers notice first" callout box
- ROI messaging for stakeholder buy-in

**Layout:**
- 2-column grid layout (roadmap steps | customer benefits)
- Numbered step indicators with orange accent
- Stats: 18% faster reconciliations, better visibility

#### Resources & FAQ Section
- Replaced old contact form with comprehensive resources
- Decision toolkit (ROI calculator, stakeholder deck, 30-day plan)
- Rollout checklist for implementation leads
- Collapsible FAQ with smooth animations
- Vendor comparison CTA

**Features:**
- 4 interactive FAQ accordions
- Chevron icon rotation on expand/collapse
- Links to contact form with plan pre-selection

#### Plan Comparison Table (Pricing Page)
- Side-by-side feature comparison table
- 5 key capabilities compared across all plans
- Responsive design with overflow scrolling
- Professional styling with semantic HTML

**Rows:**
1. Users & warehouses
2. Shipments / month
3. ForecastIQ scenarios
4. Automation capabilities
5. Support levels

### 🔧 Technical Improvements

#### Enhanced JavaScript
- Complex plan state management with UI synchronization
- SessionStorage persistence across navigation
- Backward compatibility with ?plan= hash URLs
- Plan state cleanup on form submission

**Key Functions:**
```javascript
syncPlanUI(plan) - Updates UI based on selected plan
hydrateFromHash() - Backward compatible with old URLs
setPlan(plan) - Central state setter with storage
```

#### Better Error Handling
- Plan description fallbacks
- Storage access wrapped in try/catch
- Graceful degradation if sessionStorage unavailable

### 📊 Analytics Integration
- Added `data-analytics="cta-pricing-demo"` to new CTA
- Plan selection tracked via sessionStorage
- Form submission clears tracking data

---

## [1.1.0] - Previous Release

### Plan Selection via URL Hash
- Initial implementation with ?plan= query parameters
- Basic sessionStorage for plan persistence
- CTA links updated to use data-plan attributes

---

## [1.0.0] - Initial Release

- Landing page with hero section
- Module showcase
- Pricing page with Growth, Pro, Enterprise plans
- Contact form with Netlify integration
- Responsive design

---

## Migration Notes

### For Netlify Forms
The contact form now includes a hidden `selected-plan` field:
```html
<input type="hidden" name="selected-plan" id="selectedPlan" value="" />
```

**Netlify Dashboard → Forms:** You'll see submissions with plan data populated.

### For Analytics
Track plan selection events:
```javascript
// Already implemented
gtag('event', 'click_cta', { 'plan': plan });
```

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required APIs:**
- sessionStorage (graceful degradation if unavailable)
- URLSearchParams (modern browsers)
- CSS custom properties

---

**Last Updated:** October 11, 2025  
**Version:** 1.2.0  
**Deployed:** www.flowiq.info
