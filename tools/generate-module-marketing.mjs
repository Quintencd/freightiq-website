import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { categoryLabels, moduleBySlug, modules } from './module-catalog.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const today = '2026-07-24'

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

const jsonScript = (value) => JSON.stringify(value).replaceAll('<', '\\u003c')
const urlFor = (entry) => `/modules/${entry.slug}.html`

function sharedHead({ title, description, canonical, image, schema }) {
  return `  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="FlowIQ">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://www.flowiq.info${image}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="https://www.flowiq.info${image}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2">
  <link rel="icon" type="image/png" href="/flowiq-logo.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/flowiq-light.css?v=24">
  <link rel="stylesheet" href="/assets/css/modules-marketing.css?v=2">
  <script type="application/ld+json">${jsonScript(schema)}</script>
  <script src="https://unpkg.com/lucide@latest" defer></script>
  <script src="/assets/smartlook.js"></script>`
}

function footer() {
  return `<footer class="fiq-module-footer">
    <div>
      <a href="/"><img src="/flowiq-logo.png" width="176" height="44" alt="FlowIQ"></a>
      <p>Smarter business in motion.</p>
    </div>
    <nav aria-label="Footer">
      <a href="/solutions/">Solutions</a>
      <a href="/modules">Modules</a>
      <a href="/walkthroughs">Walkthroughs</a>
      <a href="/pricing">Pricing</a>
      <a href="/book-demo">Book a demo</a>
    </nav>
  </footer>`
}

function directoryCard(entry) {
  return `<article class="fiq-module-card" data-module-card data-category="${entry.category}" data-search="${escapeHtml([entry.name, entry.tagline, entry.summary, ...entry.features].join(' ').toLowerCase())}">
    <a href="${urlFor(entry)}" data-module-engagement="${escapeHtml(entry.name)}" aria-label="View ${escapeHtml(entry.name)} details">
      <div class="fiq-module-card__media">
        <img src="${entry.image}" alt="${escapeHtml(entry.imageAlt)}" width="640" height="360" loading="lazy">
        <span class="fiq-module-card__type">${escapeHtml(entry.type)}</span>
      </div>
      <div class="fiq-module-card__body">
        <div class="fiq-module-card__heading">
          <span class="fiq-module-card__icon"><i data-lucide="${entry.icon}" aria-hidden="true"></i></span>
          <h3>${escapeHtml(entry.name)}</h3>
        </div>
        <p>${escapeHtml(entry.tagline)}</p>
        <ul>${entry.outcomes.slice(0, 2).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <span class="fiq-module-card__link">View module <i data-lucide="arrow-up-right" aria-hidden="true"></i></span>
      </div>
    </a>
  </article>`
}

function renderDirectory() {
  const itemList = modules.map((entry, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: entry.name,
    url: `https://www.flowiq.info${urlFor(entry)}`,
  }))
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: 'FlowIQ Modules and Add-ons',
        url: 'https://www.flowiq.info/modules.html',
        description: 'Explore more than 30 connected FlowIQ modules and add-ons across operations, finance, inventory, sales, automation, and specialist workflows.',
        mainEntity: { '@type': 'ItemList', numberOfItems: modules.length, itemListElement: itemList },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.flowiq.info/' },
          { '@type': 'ListItem', position: 2, name: 'Modules', item: 'https://www.flowiq.info/modules.html' },
        ],
      },
    ],
  }
  const categorySections = Object.entries(categoryLabels)
    .filter(([key]) => key !== 'all')
    .map(([key, label]) => {
      const categoryModules = modules.filter((entry) => entry.category === key)
      const description = key === 'run'
        ? 'The connected operating core for customers, suppliers, revenue, buying, stock, finance, and management visibility.'
        : key === 'plan'
          ? 'Specialist workflows for import, export, planning, production, projects, people, service, and fulfilment.'
          : 'Review-first automation and add-ons that reduce manual work while preserving operational control.'
      return `<section class="fiq-module-category" data-category-section="${key}" aria-labelledby="category-${key}">
        <div class="fiq-module-section-heading">
          <div><span>${String(categoryModules.length).padStart(2, '0')} capabilities</span><h2 id="category-${key}">${label}</h2></div>
          <p>${description}</p>
        </div>
        <div class="fiq-module-grid">${categoryModules.map(directoryCard).join('\n')}</div>
      </section>`
    }).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead({
    title: 'FlowIQ Modules & Add-ons | Explore 30+ Connected Capabilities',
    description: 'Explore FlowIQ modules and add-ons for sales, inventory, purchasing, accounting, payroll, imports, forecasting, delivery, AI Auto Capture, and more.',
    canonical: 'https://www.flowiq.info/modules.html',
    image: '/assets/img/generated/flowiq-control-room.webp',
    schema,
  })}
</head>
<body class="marketing-shell premium-light-page fiq-module-directory-page" data-page-template="module-directory" data-page-intent="module_discovery" data-page-topic="flowiq_modules">
  <a class="fiq-skip-link" href="#module-catalog">Skip to module catalog</a>
  <main class="fiq-module-directory">
    <section class="fiq-module-directory__hero">
      <div class="fiq-module-directory__hero-copy">
        <p class="fiq-module-eyebrow">A connected operating system</p>
        <h1>Discover how much of your business can run in <span>one FlowIQ.</span></h1>
        <p>More than 30 connected modules and add-ons across operations, finance, planning, people, fulfilment, and review-first automation. Start with what you need now, then expand without rebuilding the operating story.</p>
        <div class="fiq-module-hero-actions">
          <a class="fiq-module-button fiq-module-button--primary" href="#module-catalog">Explore every module <i data-lucide="arrow-down" aria-hidden="true"></i></a>
          <a class="fiq-module-button fiq-module-button--secondary" href="/book-demo">Build my FlowIQ plan</a>
        </div>
      </div>
      <div class="fiq-module-directory__hero-art">
        <img src="/assets/img/generated/flowiq-control-room.webp" alt="FlowIQ connected operations control room across inventory, finance, sales, and automation" width="1200" height="800">
        <div class="fiq-module-hero-stat"><strong>${modules.length}</strong><span>connected modules<br>and add-ons</span></div>
      </div>
    </section>

    <section class="fiq-capture-feature" aria-labelledby="capture-feature-title">
      <div class="fiq-capture-feature__visual">
        <img src="/assets/img/auto-capture/supplier-review.png" alt="FlowIQ Supplier Auto Capture review with extracted totals, mapping confidence, and blocking warnings" width="1440" height="900">
        <span>New · Incoming document queues</span>
      </div>
      <div class="fiq-capture-feature__copy">
        <p class="fiq-module-eyebrow">AI Auto Capture</p>
        <h2 id="capture-feature-title">From inbox attachment to a controlled, review-ready draft.</h2>
        <p>Monitor configured customer-order and supplier-document email routes. FlowIQ creates one queue item per supported attachment, notifies the right team, keeps the source beside the extracted fields, and waits for a person to map and approve the result.</p>
        <div class="fiq-capture-steps" aria-label="Auto Capture workflow">
          <span>Email or upload</span><i data-lucide="arrow-right" aria-hidden="true"></i>
          <span>Review queue</span><i data-lucide="arrow-right" aria-hidden="true"></i>
          <span>Map and approve</span><i data-lucide="arrow-right" aria-hidden="true"></i>
          <span>Draft created</span>
        </div>
        <a class="fiq-text-link" href="/modules/ai-auto-capture.html">Explore AI Auto Capture <i data-lucide="arrow-up-right" aria-hidden="true"></i></a>
      </div>
    </section>

    <section id="module-catalog" class="fiq-module-catalog" tabindex="-1">
      <div class="fiq-module-catalog__intro">
        <div><p class="fiq-module-eyebrow">Explore the platform</p><h2>Find the capability behind the outcome.</h2></div>
        <p>Search by workflow, benefit, or module name. Every card opens a complete product story with features, outcomes, workflow, and connected modules.</p>
      </div>
      <div class="fiq-module-tools" role="search">
        <label class="fiq-module-search"><i data-lucide="search" aria-hidden="true"></i><span class="sr-only">Search modules</span><input id="moduleSearch" type="search" placeholder="Search modules, workflows, or outcomes…" autocomplete="off"></label>
        <div class="fiq-module-filters" aria-label="Filter modules">
          ${Object.entries(categoryLabels).map(([key, label], index) => `<button type="button" data-module-filter="${key}" aria-pressed="${index === 0 ? 'true' : 'false'}">${label}</button>`).join('')}
        </div>
        <p id="moduleResults" class="fiq-module-results" role="status" aria-live="polite">${modules.length} capabilities</p>
      </div>
      ${categorySections}
      <div id="moduleEmpty" class="fiq-module-empty" hidden><i data-lucide="search-x" aria-hidden="true"></i><h3>No exact match yet.</h3><p>Try a broader workflow such as inventory, finance, sales, capture, projects, or delivery.</p><button type="button" data-clear-module-search>Show every capability</button></div>
    </section>

    <section class="fiq-module-cta">
      <p class="fiq-module-eyebrow">Your suite, in the right order</p>
      <h2>You do not need every module on day one.</h2>
      <p>Start with the workflows that remove the most friction, then add specialist capability as the business grows. We will help you map the practical rollout.</p>
      <div><a class="fiq-module-button fiq-module-button--dark" href="/book-demo">Plan my rollout</a><a class="fiq-module-button fiq-module-button--light" href="/pricing">View pricing</a></div>
    </section>
  </main>
  ${footer()}
  <script src="/assets/js/main.js?v=13"></script>
  <script src="/assets/js/modules-directory.js?v=1"></script>
  <script src="/assets/website-analytics.js"></script>
  <script src="/assets/growth-analytics.js"></script>
</body>
</html>`
}

function featureCard(item, index) {
  const icons = ['circle-check-big', 'workflow', 'scan-search', 'shield-check', 'bell-ring', 'bar-chart-3']
  return `<article><span>${String(index + 1).padStart(2, '0')}</span><i data-lucide="${icons[index % icons.length]}" aria-hidden="true"></i><h3>${escapeHtml(item)}</h3></article>`
}

function renderDetail(entry) {
  const connected = entry.connects.map((slug) => moduleBySlug.get(slug)).filter(Boolean)
  const canonical = `https://www.flowiq.info${urlFor(entry)}`
  const description = `${entry.name} in FlowIQ: ${entry.summary}`.slice(0, 158)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${entry.name} | FlowIQ`,
        url: canonical,
        description,
        isPartOf: { '@type': 'WebSite', name: 'FlowIQ', url: 'https://www.flowiq.info/' },
        about: { '@type': 'SoftwareApplication', name: entry.name, applicationCategory: 'BusinessApplication', operatingSystem: 'Web' },
      },
      {
        '@type': 'SoftwareApplication',
        name: entry.name,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: canonical,
        description: entry.summary,
        featureList: entry.features,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.flowiq.info/' },
          { '@type': 'ListItem', position: 2, name: 'Modules', item: 'https://www.flowiq.info/modules.html' },
          { '@type': 'ListItem', position: 3, name: entry.name, item: canonical },
        ],
      },
    ],
  }
  const faq = entry.faq?.length
    ? `<section class="fiq-module-detail__faq" aria-labelledby="faq-heading">
        <div class="fiq-module-detail__section-heading"><p class="fiq-module-eyebrow">Clear answers</p><h2 id="faq-heading">How the safe intake workflow works.</h2></div>
        <div>${entry.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}<i data-lucide="plus" aria-hidden="true"></i></summary><p>${escapeHtml(answer)}</p></details>`).join('')}</div>
      </section>`
    : ''
  const releaseNote = entry.releaseNote
    ? `<aside class="fiq-module-boundary"><i data-lucide="shield-check" aria-hidden="true"></i><div><strong>Availability and trust boundary</strong><p>${escapeHtml(entry.releaseNote)}</p></div></aside>`
    : ''

  return `<!DOCTYPE html>
<html lang="en">
<head>
${sharedHead({
    title: `${entry.name} | ${entry.tagline.replace(/\.$/, '')} | FlowIQ`,
    description,
    canonical,
    image: entry.hero,
    schema,
  })}
</head>
<body class="marketing-shell premium-light-page fiq-module-detail-page" data-page-template="module-detail" data-page-intent="module_demo_intent" data-page-topic="${entry.slug}">
  <a class="fiq-skip-link" href="#module-content">Skip to module content</a>
  <main id="module-content" class="fiq-module-detail">
    <nav class="fiq-module-breadcrumb" aria-label="Breadcrumb"><a href="/modules">Modules</a><i data-lucide="chevron-right" aria-hidden="true"></i><span>${escapeHtml(entry.name)}</span></nav>
    <section class="fiq-module-detail__hero">
      <div class="fiq-module-detail__hero-copy">
        <div class="fiq-module-detail__labels"><span>${escapeHtml(entry.type)}</span><span>${escapeHtml(categoryLabels[entry.category])}</span></div>
        <h1><span class="fiq-module-detail__name">${escapeHtml(entry.name)}</span><span class="fiq-module-detail__tagline">${escapeHtml(entry.tagline.replace(/\.$/, ''))}</span></h1>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="fiq-module-hero-actions">
          <a class="fiq-module-button fiq-module-button--primary" href="/book-demo" data-analytics-event="demo_request" data-analytics-label="${escapeHtml(entry.name)} detail demo">See ${escapeHtml(entry.name)} in action</a>
          <a class="fiq-module-button fiq-module-button--secondary" href="/pricing">View pricing</a>
        </div>
        <ul class="fiq-module-detail__outcomes">${entry.outcomes.map((item) => `<li><i data-lucide="circle-check" aria-hidden="true"></i>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="fiq-module-detail__hero-media">
        <img src="${entry.hero}" alt="${escapeHtml(entry.imageAlt)}" width="1200" height="800">
        <div><i data-lucide="${entry.icon}" aria-hidden="true"></i><span>${escapeHtml(entry.name)}</span><small>Connected by FlowIQ</small></div>
      </div>
    </section>

    <section class="fiq-module-detail__value">
      <div><p class="fiq-module-eyebrow">Why it matters</p><h2>${escapeHtml(entry.benefit)}</h2></div>
      <p>FlowIQ keeps this workflow connected to the records, permissions, source documents, and downstream modules that give it operational meaning.</p>
    </section>

    <section class="fiq-module-detail__features" aria-labelledby="features-heading">
      <div class="fiq-module-detail__section-heading"><p class="fiq-module-eyebrow">Capability</p><h2 id="features-heading">What ${escapeHtml(entry.name)} gives your team.</h2></div>
      <div class="fiq-module-detail__feature-grid">${entry.features.map(featureCard).join('')}</div>
    </section>

    <section class="fiq-module-detail__workflow" aria-labelledby="workflow-heading">
      <div class="fiq-module-detail__workflow-copy">
        <p class="fiq-module-eyebrow">The operating flow</p>
        <h2 id="workflow-heading">A clear path from signal to controlled outcome.</h2>
        <p>${escapeHtml(entry.benefit)} The workflow stays understandable for the person doing the work and reviewable for the person accountable for the result.</p>
      </div>
      <ol>${entry.workflow.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><div><strong>${escapeHtml(item)}</strong><small>${index === entry.workflow.length - 1 ? 'The approved result remains connected to its source and history.' : 'Context and ownership stay visible before the next step.'}</small></div></li>`).join('')}</ol>
    </section>

    <section class="fiq-module-detail__proof" aria-labelledby="proof-heading">
      <div class="fiq-module-detail__proof-media"><img src="${entry.image}" alt="${escapeHtml(entry.imageAlt)}" width="1440" height="900" loading="lazy"></div>
      <div><p class="fiq-module-eyebrow">Connected by design</p><h2 id="proof-heading">${escapeHtml(entry.name)} does not live in another silo.</h2><p>${escapeHtml(entry.summary)} The same organization, user permissions, and operating records travel through the wider FlowIQ suite.</p></div>
    </section>

    ${faq}
    ${releaseNote}

    <section class="fiq-module-detail__connected" aria-labelledby="connected-heading">
      <div class="fiq-module-detail__section-heading"><p class="fiq-module-eyebrow">Works better together</p><h2 id="connected-heading">Continue the operating story.</h2></div>
      <div>${connected.map((item) => `<a href="${urlFor(item)}" data-module-engagement="${escapeHtml(item.name)} related"><span><i data-lucide="${item.icon}" aria-hidden="true"></i>${escapeHtml(item.name)}</span><p>${escapeHtml(item.tagline)}</p><small>Explore module <i data-lucide="arrow-up-right" aria-hidden="true"></i></small></a>`).join('')}</div>
    </section>

    <section class="fiq-module-cta">
      <p class="fiq-module-eyebrow">See the workflow with your team in mind</p>
      <h2>Build a practical FlowIQ rollout around the work you want to improve first.</h2>
      <p>We will map ${escapeHtml(entry.name)} into the modules, data, and approvals your operation already relies on.</p>
      <div><a class="fiq-module-button fiq-module-button--dark" href="/book-demo">Book a tailored walkthrough</a><a class="fiq-module-button fiq-module-button--light" href="/modules">Explore all modules</a></div>
    </section>
  </main>
  ${footer()}
  <script src="/assets/js/main.js?v=13"></script>
  <script src="/assets/website-analytics.js"></script>
  <script src="/assets/growth-analytics.js"></script>
</body>
</html>`
}

fs.writeFileSync(path.join(root, 'modules.html'), renderDirectory())
fs.mkdirSync(path.join(root, 'modules'), { recursive: true })
for (const entry of modules) {
  fs.writeFileSync(path.join(root, 'modules', `${entry.slug}.html`), renderDetail(entry))
}

for (const sitemapName of ['sitemap.xml', path.join('public', 'sitemap.xml')]) {
  const sitemapPath = path.join(root, sitemapName)
  let sitemap = fs.readFileSync(sitemapPath, 'utf8')
  sitemap = sitemap.replace(
    /  <url><loc>https:\/\/www\.flowiq\.info\/modules\.html<\/loc><lastmod>[^<]+<\/lastmod><\/url>/,
    `  <url><loc>https://www.flowiq.info/modules.html</loc><lastmod>${today}</lastmod></url>`,
  )
  sitemap = sitemap.replace(/\n  <url><loc>https:\/\/www\.flowiq\.info\/modules\/[^<]+<\/loc><lastmod>[^<]+<\/lastmod><\/url>/g, '')
  const moduleUrls = modules.map((entry) => `  <url><loc>https://www.flowiq.info${urlFor(entry)}</loc><lastmod>${today}</lastmod></url>`).join('\n')
  sitemap = sitemap.replace('\n</urlset>', `\n${moduleUrls}\n</urlset>`)
  fs.writeFileSync(sitemapPath, sitemap)
}

console.log(`Generated modules.html, ${modules.length} detail pages, and synchronized both sitemaps.`)
