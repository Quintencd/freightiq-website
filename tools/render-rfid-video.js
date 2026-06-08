#!/usr/bin/env node

const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawnSync } = require('child_process');
const { chromium } = require('playwright');
const ffmpeg = require('@ffmpeg-installer/ffmpeg');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.FLOWIQ_RFID_VIDEO_PORT || 4317);
const PREVIEW = `http://127.0.0.1:${PORT}/rfid-video-preview.html`;
const OUT_DIR = path.join(ROOT, 'assets', 'videos');
const WEBM_PATH = path.join(OUT_DIR, 'flowiq-rfid-stock-tracking-90s.webm');
const MP4_PATH = path.join(OUT_DIR, 'flowiq-rfid-stock-tracking-90s.mp4');
const POSTER_PATH = path.join(OUT_DIR, 'flowiq-rfid-stock-tracking-90s-poster.jpg');

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const server = await startStaticServer();

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    fs.rmSync(WEBM_PATH, { force: true });
    await page.exposeBinding('flowiqWriteVideoChunk', async (_source, bytes) => {
      fs.appendFileSync(WEBM_PATH, Buffer.from(bytes));
    });
    await page.goto(PREVIEW, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.FLOWIQ_RFID_VIDEO.ready);

    await page.evaluate(() => window.FLOWIQ_RFID_VIDEO.renderAt(3.2));
    const canvas = page.locator('#film');
    await canvas.screenshot({ path: POSTER_PATH, quality: 92, type: 'jpeg' });

    await page.evaluate(() => window.FLOWIQ_RFID_VIDEO.recordWebmToBinding());
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const result = spawnSync(ffmpeg.path, [
    '-y',
    '-i', WEBM_PATH,
    '-an',
    '-vf', 'tpad=stop_mode=clone:stop_duration=0.2',
    '-t', '90',
    '-c:v', 'libx264',
    '-profile:v', 'high',
    '-pix_fmt', 'yuv420p',
    '-r', '30',
    '-movflags', '+faststart',
    '-crf', '20',
    MP4_PATH,
  ], { stdio: 'inherit' });

  if (result.status !== 0) {
    throw new Error(`ffmpeg failed with exit code ${result.status}`);
  }

  const probe = spawnSync(ffmpeg.path, [
    '-i', MP4_PATH,
    '-hide_banner',
  ], { encoding: 'utf8' });

  console.log('\nCreated FlowIQ RFID marketing video:');
  console.log(`- MP4: ${MP4_PATH}`);
  console.log(`- Poster: ${POSTER_PATH}`);
  console.log(`- Preview source: ${path.join(ROOT, 'rfid-video-preview.html')}`);
  console.log('\nffmpeg probe:');
  console.log((probe.stderr || probe.stdout || '').split('\n').slice(0, 14).join('\n'));
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
    const cleanPath = requestPath === '/' ? '/rfid-video-preview.html' : requestPath;
    const filePath = path.normalize(path.join(ROOT, cleanPath));

    if (!filePath.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': contentType(filePath) });
      res.end(data);
    });
  });

  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.js') return 'text/javascript; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.mp4') return 'video/mp4';
  return 'application/octet-stream';
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
