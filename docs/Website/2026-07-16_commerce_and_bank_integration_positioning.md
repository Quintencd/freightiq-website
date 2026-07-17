# Commerce and bank integration positioning

Date: 2026-07-16

Scope: `flowiq_website` homepage and EcomIQ module page

Deployment: not deployed

## Objective

Strengthen FlowIQ's ecommerce and operational-confidence story by making Shopify and Takealot discoverable on the homepage and the EcomIQ module page. Add a carefully qualified banking pathway statement that supports commercial conversations without representing a bank partnership or guaranteed connection.

## Customer-facing changes

- The homepage now has a dedicated commerce-and-banking connection rail between the module-flow and product-tour sections. Its narrative sits above the moving logo rail, so the visual confidence marks read as one cohesive follow-on block rather than a detached side panel.
- The rail shows only the external commerce and banking brand marks that FlowIQ can work with. FlowIQ remains the surrounding site brand and is not repeated inside the connection sequence. Its wording positions the marks as tailored connection solutions, not partners or universally self-serve integrations.
- The narrative is centred above a fixed-height, clipped logo lane. Each mark has an explicit maximum rendered height and width, insulating it from global image styles and preventing third-party logo assets from overflowing the rail.
- The rail deliberately uses no logo cards, borders or tile backgrounds. Every brand occupies the same invisible footprint, preserving an even cadence while retaining the original logo proportions.
- Shopify and Takealot are presented as commerce-operation pathways: products, orders and operational data can be brought into FlowIQ's stock, fulfilment, invoicing, margin and reporting workflows.
- FNB, Standard Bank, Nedbank, Absa and Investec are shown under the label `Direct bank integration solutions`.
- The section explicitly says FlowIQ uses a provider-neutral banking architecture and that access depends on the bank, account type, approved customer onboarding and access.
- Both the homepage and EcomIQ page say that third-party names identify connection pathways only and do not imply affiliation, endorsement or a certified partnership.

## SEO and measurement

- Homepage title, description, keywords, Open Graph, Twitter and JSON-LD now cover Shopify, Takealot, ecommerce operations and bank integration solutions.
- EcomIQ title, description, keywords, social metadata, SoftwareApplication schema and the shared runtime module story now cover Shopify and Takealot operations. The renderer respects EcomIQ's explicit page title instead of replacing it with the generic module-story title after load.
- The homepage `Explore EcomIQ` action uses the established `module_engagement` event with a dedicated `homepage_integrations` position. This lets existing website and growth analytics report interest without adding a second tracking system.
- No new public URL was introduced, so sitemap entries were not changed.

## Validation and release boundary

- This is a static marketing and SEO change only. It does not alter application integration code, banking credentials, customer onboarding, pricing or Netlify configuration.
- No Netlify deployment was run; the marketing site remains ready for the user to deploy through GitHub.

## Regression risks and mitigation

- **15-20% brand-positioning risk:** brand names could be mistaken for endorsements or certified integrations. The page uses capability/pathway language only, states the non-affiliation boundary, and qualifies bank availability.
- **10-15% demand-expectation risk:** stronger search discovery may attract prospects who expect direct activation immediately. The copy directs them to EcomIQ and explains that direct bank availability is onboarding-dependent.
