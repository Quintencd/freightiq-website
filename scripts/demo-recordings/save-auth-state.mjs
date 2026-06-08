import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const appBaseUrl = process.env.FLOWIQ_APP_BASE_URL || 'https://app.flowiq.info';
const authFile = process.env.FLOWIQ_AUTH_STATE || path.resolve('.auth/flowiq-demo-storage-state.json');
const email = process.env.FLOWIQ_DEMO_EMAIL || '';
const password = process.env.FLOWIQ_DEMO_PASSWORD || '';

await fs.mkdir(path.dirname(authFile), { recursive: true });

const browser = await chromium.launch({ headless: false, args: ['--disable-notifications'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.goto(new URL('/login', appBaseUrl).toString(), { waitUntil: 'domcontentloaded', timeout: 60000 });

if (email && password) {
  await fillFirstVisible(page, 'input[type="email"], input[name="email"], input[placeholder*="email" i]', email);
  await fillFirstVisible(page, 'input[type="password"], input[name="password"], input[placeholder*="password" i]', password);
  await page.getByRole('button', { name: /log in|login|sign in/i }).first().click();
}

console.log('Complete login in the opened browser window if needed.');
await page.waitForFunction(() => {
  const text = document.body?.innerText || '';
  const path = window.location.pathname || '';
  return !path.includes('/login') && /Dashboard|TaskIQ|CompaniesIQ|FlowIQ PTY LTD/i.test(text);
}, { timeout: 180000 });

await page.waitForTimeout(2500);
await context.storageState({ path: authFile });
await browser.close();

console.log(`Saved demo auth state to ${authFile}`);

async function fillFirstVisible(page, selector, value) {
  const fields = page.locator(selector);
  const count = await fields.count();
  for (let index = 0; index < count; index += 1) {
    const field = fields.nth(index);
    if (!(await field.isVisible().catch(() => false))) continue;
    await field.fill(value, { timeout: 10000 });
    return;
  }
  throw new Error(`No visible field found for selector: ${selector}`);
}
