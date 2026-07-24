import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { modules } from './module-catalog.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const errors = []

function check(condition, message) {
  if (!condition) errors.push(message)
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function localAssetExists(source) {
  if (!source || !source.startsWith('/') || source.startsWith('//')) return true
  const relative = source.split(/[?#]/)[0].replace(/^\//, '')
  return fs.existsSync(path.join(root, relative))
}

const directory = read('modules.html')
check(directory.includes('data-page-template="module-directory"'), 'modules.html is missing its directory analytics template')
check(directory.includes('id="moduleSearch"'), 'modules.html is missing module search')
check(directory.includes('data-module-filter="automate"'), 'modules.html is missing automation filtering')

for (const entry of modules) {
  const relativePath = `modules/${entry.slug}.html`
  check(fs.existsSync(path.join(root, relativePath)), `${relativePath} is missing`)
  if (!fs.existsSync(path.join(root, relativePath))) continue

  const html = read(relativePath)
  check(html.includes(`data-page-topic="${entry.slug}"`), `${relativePath} has the wrong analytics topic`)
  const escapedName = entry.name.replaceAll('&', '&amp;')
  check(html.includes(`<h1>${escapedName}:`), `${relativePath} has no module-specific H1`)
  check(html.includes(`https://www.flowiq.info/modules/${entry.slug}.html`), `${relativePath} has no self-canonical URL`)
  check(html.includes('data-page-template="module-detail"'), `${relativePath} is missing detail-page analytics metadata`)

  const schemaMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  check(schemaMatches.length > 0, `${relativePath} has no JSON-LD`)
  for (const match of schemaMatches) {
    try {
      JSON.parse(match[1])
    } catch (error) {
      errors.push(`${relativePath} has invalid JSON-LD: ${error.message}`)
    }
  }

  const sources = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((match) => match[1])
  for (const source of sources.filter((value) => /^\/(?:assets|flowiq-logo|favicon)/.test(value))) {
    check(localAssetExists(source), `${relativePath} references missing asset ${source}`)
  }
}

const rootSitemap = read('sitemap.xml')
const publicSitemap = read('public/sitemap.xml')
check(rootSitemap === publicSitemap, 'root and public sitemap.xml are not identical')

const sitemapUrls = [...rootSitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
check(new Set(sitemapUrls).size === sitemapUrls.length, 'sitemap.xml contains duplicate URLs')
for (const entry of modules) {
  const canonical = `https://www.flowiq.info/modules/${entry.slug}.html`
  check(sitemapUrls.includes(canonical), `sitemap.xml is missing ${canonical}`)
}

check(!/href=['"]\/modules#/.test(directory), 'modules.html still contains module anchor dead-ends')
check(!/role=['"]button['"]/.test(directory), 'modules.html contains nested button semantics inside module links')

if (errors.length) {
  console.error(errors.map((message) => `- ${message}`).join('\n'))
  process.exitCode = 1
} else {
  console.log(`Validated the module directory, ${modules.length} detail pages, JSON-LD, local assets, links, and sitemap parity.`)
}
