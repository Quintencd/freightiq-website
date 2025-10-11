# FlowIQ Marketing Website Changelog

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

