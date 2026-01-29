# Bugbot Rules for FreightIQ (Marketing Site)

Guidance for PR reviews in `flowiq_website/` (static marketing site).

## Security & Hygiene
- Never commit secrets or credentials; no inline analytics keys that expose PII.
- Forms (if any) must validate inputs and avoid sending sensitive data to client-only endpoints.

## Performance & SEO
- Optimize images (modern formats, responsive sizes); no >300KB hero images.
- Provide `meta` title/description per page; include canonical link where appropriate.
- Accessibility: valid landmarks, alt text on images, label form controls, sufficient color contrast.
- Avoid blocking scripts/styles; defer or async where safe.

## Links & Content
- No broken links; external links should have `rel="noopener"` when using `target="_blank"`.
- Use semantic HTML; avoid excessive nested divs.

## PR Checklist
- Lighthouse score regression >5 points requires justification.
- No unused assets added; remove dead images/CSS.


