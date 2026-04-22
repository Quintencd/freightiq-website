# Pricing header logo and home navigation restore

## Date
2026-04-22

## Summary
Fixed pricing page header so users can return to the main website and see the FlowIQ logo in the top navigation.

## Issue
`/pricing` nav only showed right-side account/CTA buttons and had no left brand/home navigation, causing:
- no visible FlowIQ logo;
- no direct path back to the main site/home from pricing.

## Changes
- Updated `/Users/quintenmac/dev/FreightIQ/flowiq_website/pricing.html` nav:
  - Added left brand logo (`/flowiq-logo.png`) linking to `/`.
  - Added `Home` link linking to `/`.
  - Kept existing right-side `Sign Up`, `Log In`, and `Start Free Trial` actions.

## Regression Risk (>10%)
- **10-15% (Low):** header width on narrow screens can become tighter due to added left-side brand/home items.
  - **Mitigation:** `Home` link is hidden on very small screens (`hidden sm:inline-flex`) to preserve layout stability.

## Verification
- Production deploy completed.
- Pricing page now shows logo and supports direct navigation back to homepage.
