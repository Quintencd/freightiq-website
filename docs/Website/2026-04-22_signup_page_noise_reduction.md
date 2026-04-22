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

## Why

The removed blocks were increasing cognitive load during a conversion-critical step and pushing the form below the immediate focus path.

## Regression Risks (>10%)

1. **10-15%**: less reassurance copy can reduce confidence for highly cautious buyers who need narrative context before submitting.
2. **10-20%**: if support tickets show confusion after this change, a smaller single-line reassurance pattern may need to be reintroduced near the submit button rather than as stacked cards.
