import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const browser = await chromium.launch();
const base = process.env.TEST_URL || 'http://127.0.0.1:5173';
const report = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base);
  assert.match(await page.title(), /DebateCraft/);
  assert.equal(await page.locator('a[href*="hejlfoundation"]').count(), 0, 'all active destinations belong to DebateCraft');
  assert.doesNotMatch(await page.locator('body').innerText(), /Hejl|Grant Database|Florida Grand Opera/);
  report.push('DebateCraft identity, content and destinations replace the reference content');
  await page.getByRole('button', { name: 'Accept & Close' }).click();
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await page.getByRole('dialog', { name: 'Site navigation' }).waitFor();
  await page.setViewportSize({ width: 900, height: 1000 });
  await page.waitForTimeout(100);
  assert.equal(await page.getByRole('dialog', { name: 'Site navigation' }).count(), 0, 'mobile menu closes when moving to a desktop viewport');
  report.push('Mobile menu closes on desktop resize');
  await page.setViewportSize({ width: 1440, height: 1000 });
  const card = page.locator('.programs-card').first();
  await card.scrollIntoViewIfNeeded();
  const before = await card.boundingBox();
  await page.mouse.move(before.x + before.width / 2, before.y + before.height / 2);
  await page.mouse.down();
  await page.mouse.move(before.x + before.width / 2 + 60, before.y + before.height / 2 + 35, { steps: 8 });
  const dragged = await card.boundingBox();
  assert.ok(dragged.x - before.x > 45, 'desktop program card follows the pointer');
  await page.mouse.up();
  await page.waitForTimeout(350);
  const settled = await card.boundingBox();
  assert.ok(Math.abs(settled.x - before.x) < 1, 'released card returns to its editorial layout');
  report.push('Program cards drag and settle back');
  await page.reload();
  assert.equal(await page.getByRole('region', { name: 'Cookie consent' }).count(), 0, 'accepted consent persists across reload');
  await page.getByRole('contentinfo').hover();
  await page.getByRole('button', { name: 'Cookie preferences' }).click();
  assert.equal(await page.getByRole('checkbox', { name: 'Analytics' }).isChecked(), true);
  await page.getByRole('button', { name: 'Deny', exact: true }).click();
  await page.reload();
  await page.getByRole('contentinfo').hover();
  await page.getByRole('button', { name: 'Cookie preferences' }).click();
  assert.equal(await page.getByRole('checkbox', { name: 'Analytics' }).isChecked(), false, 'denied analytics persists');
  await page.keyboard.press('Escape');
  assert.equal(await page.getByRole('dialog', { name: 'Manage Cookies' }).count(), 0);
  report.push('Accepted/denied consent survives reload; native settings dialog dismisses with Escape');
  let outbound = 0;
  await page.route('https://**/*', route => { outbound++; return route.abort(); });
  await page.getByRole('textbox', { name: 'Email address' }).fill('invalid');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  assert.equal(await page.getByRole('textbox', { name: 'Email address' }).evaluate(node => node.checkValidity()), false);
  await page.getByRole('textbox', { name: 'Email address' }).fill('reader@example.com');
  await page.getByRole('button', { name: 'Submit', exact: true }).click();
  assert.match(await page.getByRole('status').innerText(), /unavailable in this preview/);
  assert.equal(outbound, 0, 'newsletter never sends an external request');
  report.push('Native email validation and honest preview feedback; no subscription request');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.waitForTimeout(700);
  assert.equal(await page.locator('video').count(), 0, 'the reference video is replaced by a DebateCraft photograph');
  assert.equal(await page.locator('#impact-title').evaluate(node => getComputedStyle(node).opacity), '1');
  report.push('Reduced-motion page keeps complete headings visible');
  await page.close();

  for (const [width, height] of [[1440, 1000], [390, 844], [1920, 1080], [900, 1000]]) {
    const screen = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    screen.on('pageerror', error => errors.push(error.message));
    screen.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await screen.goto(base, { waitUntil: 'domcontentloaded' });
    await screen.locator('.hero-home__heading').waitFor();
    await screen.evaluate(() => document.fonts.ready);
    for (let y = 0; y < await screen.evaluate(() => document.body.scrollHeight); y += height) {
      await screen.evaluate(y => window.scrollTo(0, y), y);
      await screen.waitForTimeout(100);
    }
    await screen.waitForTimeout(700);
    const health = await screen.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      broken: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
      fonts: ['Inter', 'PP Editorial New'].every(family => [...document.fonts].some(font => font.family === family && font.status === 'loaded')),
    }));
    assert.equal(health.overflow, false, `${width}px viewport has no horizontal overflow`);
    assert.equal(health.background, 'rgb(242, 247, 254)', 'homepage shares the Team page blue background');
    assert.deepEqual(health.broken, [], `${width}px viewport has no missing images`);
    assert.equal(health.fonts, true, 'original fonts loaded');
    assert.deepEqual(errors, [], `${width}px viewport has no browser errors`);
    report.push(`${width}×${height}: no overflow, missing images, missing fonts or browser errors`);
    await screen.close();
  }
  await mkdir(resolve('.firecrawl/verification'), { recursive: true });
  await writeFile(resolve('.firecrawl/verification/browser-results.json'), JSON.stringify(report, null, 2));
  console.log(report.join('\n'));
} finally { await browser.close(); }
