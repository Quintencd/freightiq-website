# PayrollIQ Active-Employee Pricing Card

Date: 2026-08-18

- The public pricing page keeps one PayrollIQ add-on card at `R220/month`.
- A single secondary line says that five active employees are included and each additional active employee is R20/month.
- The matching US display remains `$39/month` plus `$1` per additional active employee.
- The internal `payroll_additional_employees` billing key is excluded from generated website pricing data and never becomes a second card.
- Both PayrollIQ product-page variants now state that the add-on is available on every paid plan and that inactive or terminated employees do not count.
- No Netlify deployment was performed.
- The corresponding production billing migration and directly affected Edge Functions are live; the marketing-site source remains queued for the normal GitHub-controlled website release.

Cross-surface pricing-copy drift risk is `10-12%`; it is controlled by generated pricing data, a single conditional card note, and website/static tests.
