import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch({ headless: true });
const folder = resolve('.firecrawl/verification');
await mkdir(folder, { recursive: true });
const includeReference = process.argv.includes('--reference');
const referenceOnly = process.argv.includes('--reference-only');
const localName = process.env.CAPTURE_NAME || 'local';
const requestedWidth = Number(process.argv.find(arg => arg.startsWith('--width='))?.split('=')[1]);
const sizes = requestedWidth ? [[requestedWidth, requestedWidth === 390 ? 844 : requestedWidth === 1920 ? 1080 : 1000]] : process.argv.includes('--all') ? [[1440, 1000], [390, 844], [1920, 1080], [900, 1000]] : [[1440, 1000], [390, 844]];
let results;
const metricsFile = `${folder}/${referenceOnly ? 'reference' : localName === 'local' ? 'comparison' : localName}-metrics.json`;
try { results = JSON.parse(await readFile(metricsFile, 'utf8')); } catch { results = []; }
try {
  for (const [width, height] of sizes) {
    for (const [name, url] of [...(referenceOnly ? [] : [[localName, process.env.TEST_URL || 'http://127.0.0.1:5173/']]), ...(includeReference || referenceOnly ? [['reference', 'https://www.hejlfoundation.org/?ref=land-book.com']] : [])]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.locator('.hero-home__heading').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += height * 0.65) {
        await page.evaluate(y => window.scrollTo(0, y), y);
        await page.waitForTimeout(130);
      }
      await page.waitForTimeout(1200);
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(1000);
      await page.evaluate(async () => {
        const v = document.querySelector('video');
        if (v?.readyState >= 2) {
          v.pause();
          await new Promise(resolve => { v.addEventListener('seeked', resolve, { once: true }); v.currentTime = 0.4; setTimeout(resolve, 1000); });
        }
      });
      const metrics = await page.evaluate(() => {
        const selectors = ['.hero-home', '.hero-home__heading', '.hero-home__link-button', '.grant-database-home', '.grant-database-home__heading', '.grant-database-home__shape', '.our-programs-home', '.programs-cards', '.programs-card', '.programs-card__desc', '.blog-posts', '.blog-post__link', '.footer', '.footer__newsletter-description', '.cookies__dialog--basic'];
        return {
          viewport: { width: innerWidth, height: innerHeight }, height: document.body.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
          brokenImages: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src),
          elements: Object.fromEntries(selectors.map(selector => {
            const el = document.querySelector(selector);
            if (!el) return [selector, null];
            const rect = el.getBoundingClientRect(), css = getComputedStyle(el);
            return [selector, { x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height, font: css.font, color: css.color, text: el.textContent.trim().replace(/\s+/g, ' ') }];
          })),
        };
      });
      await page.screenshot({ path: `${folder}/${name}-${width}.png`, fullPage: true });
      const record = { name, width, errors, ...metrics };
      results = results.filter(item => item.name !== name || item.width !== width);
      results.push(record);
      await writeFile(`${folder}/${name}-${width}.json`, JSON.stringify(record, null, 2));
      console.log(`${name} ${width}: height=${metrics.height}, overflow=${metrics.overflow}, brokenImages=${metrics.brokenImages.length}, errors=${errors.length}`);
      await writeFile(metricsFile, JSON.stringify(results, null, 2));
      await page.close();
    }
  }
} finally { await browser.close(); }
