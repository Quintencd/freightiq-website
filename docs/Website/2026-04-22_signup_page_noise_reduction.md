# Signup Page Noise Reduction

Date: 2026-04-22

## Scope

Reduced visual noise on the public trial signup page by removing non-essential reassurance content that competed with form completion.

## Changes

File:
- `signup/index.html`

Removed from the signup page left column:
- `Start Clean` card
- `What happens next` card
- `Why people complete this step` card

Kept:
- plan selection
- account type selection
- company/profile fields
- legal/compliance confirmations
- core signup flow and analytics tracking

Follow-up on 2026-04-26:
- Removed the conditional `Accountant Firm Profile` block from the signup form.
- Removed `Professional Body` and `Tax Practitioner / Registration Number` from accountant-firm client-side required validation.
- Stopped sending accountant professional body and registration values from the public signup form because those fields are no longer collected on the page.

## Why

The removed blocks were increasing cognitive load during a conversion-critical step and pushing the form below the immediate focus path.

## Regression Risks (>10%)

1. **10-15%**: less reassurance copy can reduce confidence for highly cautious buyers who need narrative context before submitting.
2. **10-20%**: if support tickets show confusion after this change, a smaller single-line reassurance pattern may need to be reintroduced near the submit button rather than as stacked cards.
3. **15-25%**: if the live `public-signup` edge function still requires accountant professional-body or tax-practitioner registration values for accountant-firm accounts, accountant-firm signup submissions may be rejected until the backend contract is updated to match the simplified public form.
