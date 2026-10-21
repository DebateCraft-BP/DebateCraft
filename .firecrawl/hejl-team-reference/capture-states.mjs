import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const out = resolve('.firecrawl/hejl-team-reference');
const browser = await chromium.launch();
const records = [];
try {
  for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: name === 'mobile', hasTouch: name === 'mobile' });
    await page.goto('https://www.hejlfoundation.org/who-we-are/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.locator('.hero-about__heading').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1500);
    for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += height * 0.6) {
      await page.evaluate(y => window.scrollTo(0, y), y);
      await page.waitForTimeout(130);
    }
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${name}-settled.png`, fullPage: true });
    const record = { name, viewport: { width, height }, url: page.url(), screenshot: `${name}-settled.png`, metrics: await page.evaluate(() => {
      const selectors = ['.hero-about', '.hero-about__heading', '.about-about', '.mission-about', '.areas-about', '.leaders-about', '.leaders-about__item', '.members-about', '.members-about__item'];
      return { height: document.body.scrollHeight, background: getComputedStyle(document.body).backgroundColor, elements: Object.fromEntries(selectors.map(selector => {
        const element = document.querySelector(selector), rect = element.getBoundingClientRect(), css = getComputedStyle(element);
        return [selector, { x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height, font: css.font, borderRadius: css.borderRadius, clipPath: css.clipPath }];
      })) };
    }) };
    try {
      await page.locator('.cookies__dialog--basic button[data-button="manage"]').click({ timeout: 5000 });
      await page.locator('.cookies__dialog--manage button[data-button="deny"]').click();
      await page.locator('.leaders-about__item[data-target-dialog="#team-dialog-102"]').click();
      await page.locator('.team-dialog__content-name:visible').waitFor({ timeout: 10000 });
      await page.waitForTimeout(1000);
      await page.locator('.team-dialog__content-image:visible img').evaluate(image => image.decode().catch(() => {}));
      await page.screenshot({ path: `${out}/bio-${name}.png` });
      const dialog = page.locator('.team-dialog:visible');
      await writeFile(`${out}/bio-${name}.html`, await dialog.evaluate(node => node.outerHTML));
      record.bio = { screenshot: `bio-${name}.png`, heading: await page.locator('.team-dialog__content-name:visible').innerText(), closeControl: await page.locator('.team-dialog__close:visible').evaluate(node => ({ tag: node.tagName, label: node.getAttribute('aria-label') })) };
      await page.keyboard.press('Escape');
      await page.waitForTimeout(500);
      record.bio.escapeClosed = await page.locator('.team-dialog__content-name:visible').count() === 0;
    } catch (error) { record.bioError = error.message; }
    records.push(record);
    await writeFile(`${out}/.firecrawl/settled-captures.json`, JSON.stringify(records, null, 2));
    console.log(`${name}: ${record.metrics.height}px; biography ${record.bio ? 'captured' : 'unavailable'}`);
    await page.close();
  }
} finally { await browser.close(); }
