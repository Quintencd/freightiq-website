import { chromium } from 'playwright';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { blockedModuleDemos, getModuleDemo, moduleDemos } from './modules.mjs';

const appBaseUrl = process.env.FLOWIQ_APP_BASE_URL || 'https://app.flowiq.info';
const authFile = process.env.FLOWIQ_AUTH_STATE || path.resolve('.auth/flowiq-demo-storage-state.json');
const rawDir = path.resolve('test-results/demo-recordings/raw');
const videoDir = path.resolve('assets/videos/demo-library');
const posterDir = path.resolve('assets/images/demo-library-posters');
const requestedId = process.argv[2];

if (!requestedId || requestedId === '--help' || requestedId === '-h') {
  console.log('Usage: npm run record:demo -- <module-id>');
  console.log('');
  console.log('Available module ids:');
  for (const demo of moduleDemos) console.log(`  - ${demo.id}`);
  if (blockedModuleDemos.length) {
    console.log('');
    console.log('Blocked module ids:');
    for (const demo of blockedModuleDemos) console.log(`  - ${demo.id}: ${demo.reason}`);
  }
  process.exit(requestedId ? 0 : 1);
}

const demo = getModuleDemo(requestedId);
if (!demo) {
  const blocked = blockedModuleDemos.find((entry) => entry.id === requestedId);
  if (blocked) {
    console.error(`Blocked module id: ${requestedId}`);
    console.error(blocked.reason);
    process.exit(1);
  }
  console.error(`Unknown module id: ${requestedId}`);
  process.exit(1);
}

await assertFileExists(authFile, `Missing auth state: ${authFile}. Run npm run auth:demo first.`);
await fs.mkdir(rawDir, { recursive: true });
await fs.mkdir(videoDir, { recursive: true });
await fs.mkdir(posterDir, { recursive: true });

const startedAt = Date.now();
const browser = await chromium.launch({
  headless: true,
  args: ['--hide-scrollbars', '--disable-notifications', '--window-size=1920,1080']
});
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
  storageState: authFile,
  recordVideo: {
    dir: rawDir,
    size: { width: 1920, height: 1080 }
  }
});
const page = await context.newPage();

try {
  await page.goto(new URL(demo.url, appBaseUrl).toString(), { waitUntil: 'domcontentloaded', timeout: 60000 });
  await waitForUsableApp(page, demo);

  if (page.url().includes('/login')) {
    throw new Error('Auth state is not logged in. Run npm run auth:demo again and complete login.');
  }

  await page.addStyleTag({
    content: [
      'html,body{scroll-behavior:smooth!important}',
      '*{caret-color:transparent!important}',
      '.MuiTooltip-popper,[role="tooltip"]{display:none!important}'
    ].join('')
  });

  await performActions(page, demo.actions);
  const remainingMs = Math.max(0, demo.durationMs - (Date.now() - startedAt));
  await page.waitForTimeout(remainingMs);
} finally {
  await context.close();
  await browser.close();
}

const rawVideo = await newestFile(rawDir, '.webm');
const outputVideo = path.join(videoDir, `${demo.asset}.mp4`);
const outputPoster = path.join(posterDir, `${demo.asset}.jpg`);

await run(ffmpegInstaller.path, [
  '-hide_banner',
  '-y',
  '-i',
  rawVideo,
  '-vf',
  'fps=24,format=yuv420p',
  '-an',
  '-c:v',
  'libx264',
  '-preset',
  'veryfast',
  '-crf',
  '21',
  '-movflags',
  '+faststart',
  outputVideo
]);

await run(ffmpegInstaller.path, [
  '-hide_banner',
  '-y',
  '-ss',
  '8',
  '-i',
  outputVideo,
  '-frames:v',
  '1',
  '-q:v',
  '3',
  outputPoster
]);

console.log(`Recorded ${demo.id}`);
console.log(`Video: ${outputVideo}`);
console.log(`Poster: ${outputPoster}`);

async function performActions(page, actions = []) {
  for (const action of actions) {
    if (action.type === 'wait') {
      await page.waitForTimeout(action.ms);
      continue;
    }

    if (action.type === 'scroll') {
      await page.mouse.wheel(0, action.y);
      await page.waitForTimeout(action.ms || 1200);
      continue;
    }

    if (action.type === 'press') {
      await page.keyboard.press(action.key);
      await page.waitForTimeout(action.ms || 800);
      continue;
    }

    if (action.type === 'clickText') {
      await clickLocator(page, page.getByText(action.text, { exact: false }).first(), action);
      continue;
    }

    if (action.type === 'clickFirst') {
      let clicked = false;
      for (const selector of action.selectors) {
        const locator = page.locator(selector).first();
        if (!(await locator.count())) continue;
        try {
          await locator.click({ timeout: 4000 });
          clicked = true;
          break;
        } catch {
          // Try the next selector.
        }
      }
      if (!clicked && !action.optional) throw new Error(`Could not click any selector: ${action.selectors.join(', ')}`);
      await page.waitForTimeout(action.ms || 1200);
    }
  }
}

async function waitForUsableApp(page, demo) {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForFunction(() => {
    const text = document.body?.innerText || '';
    return /Dashboard|TaskIQ|CompaniesIQ|FlowIQ PTY LTD|Access Denied|Page Not Found/i.test(text);
  }, { timeout: 60000 });
  await page.waitForTimeout(3500);

  const bodyText = await page.locator('body').innerText({ timeout: 10000 }).catch(() => '');
  if (/Page Not Found/i.test(bodyText)) {
    throw new Error(`Route not found for ${demo.id}: ${demo.url}`);
  }
}

async function clickLocator(page, locator, action) {
  try {
    await locator.click({ timeout: action.timeout || 4000 });
  } catch (error) {
    if (!action.optional) throw error;
  }
  await page.waitForTimeout(action.ms || 1200);
}

async function newestFile(dir, extension) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(extension)) continue;
    const file = path.join(dir, entry.name);
    const stat = await fs.stat(file);
    files.push({ file, mtime: stat.mtimeMs });
  }
  if (!files.length) throw new Error(`No ${extension} video found in ${dir}`);
  files.sort((a, b) => b.mtime - a.mtime);
  return files[0].file;
}

async function assertFileExists(file, message) {
  try {
    await fs.access(file);
  } catch {
    throw new Error(message);
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });
}
