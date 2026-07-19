# SKU Capacity Tier Alignment

The marketing pricing page reads its capacity comparison from generated `pricing-data.json`.

The 19 July 2026 billing alignment regenerates that payload from the app's canonical subscription-plan source with these included SKU limits:

- Starter Lite: 250
- Starter: 750
- Growth Lite: 1,500
- Growth: 5,000
- Professional: 15,000
- Scale: 50,000
- Enterprise: Contracted / unlimited

No visual pricing-page logic changed. The existing capacity comparison renders the new values from the generated payload, keeping the website aligned with the app and billing enforcement once both repositories are deployed through GitHub.
