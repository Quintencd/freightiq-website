# Signup Accountant Registration Restore

Date: 2026-06-24

## Scope

Restored the accountant-firm registration capture on the public website signup page.

Files updated:
- `signup/index.html`
- `netlify/functions/signup-notify.js`

## What Changed

- Added an `Accounting Firm Registration` block that appears only when `Accountant Firm` is selected.
- Captures:
  - professional body / tax controlling body
  - tax practitioner or firm registration number
- Makes those fields required only for accountant-firm signups.
- Sends both canonical backend field names and compatibility aliases to `public-signup`.
- Includes the registration values in the support signup notification payload and email body.

## Why

The account-type selector still changed the hidden account type and showed accountant compliance declarations, but the registration fields had been removed from the public form. The live `public-signup` edge function requires accountant-firm registrations, so users could select Accountant Firm without seeing the fields needed to complete a valid accountant signup.

## Regression Risks

- **10-15%**: Accountant-firm completion can drop for visitors who do not have their professional body or practitioner number available. This is lower risk than allowing a failed submission because the backend already requires these values.
- **<10%**: Organization signup regression risk is low because the new block is hidden, not required, and cleared when account type returns to Organization.

## Verification

- Accountant Firm selection reveals the registration block.
- Returning to Organization hides and clears the accountant registration fields.
- Accountant-firm validation includes the two registration fields before calling `public-signup`.
- Payload includes `accountant_tax_controlling_body`, `accountant_tax_practitioner_registration_number`, `accountant_professional_body`, and `accountant_registration_number`.
