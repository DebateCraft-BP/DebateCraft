import assert from 'node:assert/strict';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
const folder = resolve('.firecrawl/verification');
await mkdir(folder, { recursive: true });
const roster = JSON.parse(await readFile('public/data/team_members.json', 'utf8'));
const original = JSON.parse(await readFile('legacy/data/team_members.json', 'utf8'));
assert.deepEqual(roster, original.map(member => {
  if (!member.categories.includes('retired')) return member;
  const { image, ...text } = member;
  return text;
}));
const portraits = await readdir('public/Images');
assert.deepEqual(portraits.sort(), roster.filter(member => !member.categories.includes('retired')).map(member => member.image.split('/').at(-1)).sort());
const results = { assets: '35 source records preserved; 29 current portraits; retired image fields and assets excluded', views: [], interactions: [] };
const browser = await chromium.launch();

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  const height = page.viewportSize().height;
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += height) {
    await page.evaluate(y => scrollTo(0, y), y);
    await page.waitForTimeout(65);
  }
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(700);
}

try {
  for (const [width, height] of [[1440, 1000], [390, 844], [900, 1000], [1920, 1080]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    const response = await page.goto(`${base}/pages/team.html`);
    assert.equal(response.status(), 200);
    assert.equal(await page.title(), 'Our Team | DebateCraft');
    await page.getByRole('region', { name: 'Our Team', exact: true }).waitFor();
    await page.getByRole('button', { name: 'Accept & Close' }).click();
    await settle(page);
    const leadership = page.getByRole('region', { name: 'Leadership', exact: true });
    const team = page.getByRole('region', { name: 'Our Team', exact: true });
    assert.deepEqual(await leadership.locator('h3').allTextContents(), ['Adrian Chan', 'Gavin Zhao', 'Sandeep Chulani']);
    assert.equal(await team.locator('h3').count(), 26);
    for (const name of ['Matthew Wong', 'Bella Cai', 'Valmik Dagayach', 'Rachel Rhodes', 'Oliver Choi']) assert.equal(await team.getByRole('button', { name: `View biography for ${name}` }).count(), 1);
    assert.equal(await page.locator('a[href*="hejlfoundation"]').count(), 0);
    assert.doesNotMatch(await page.locator('body').innerText(), /Hejl|LinkedIn/);
    const health = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      background: getComputedStyle(document.body).backgroundColor,
      brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
      fontsLoaded: ['Inter', 'PP Editorial New'].every(family => [...document.fonts].some(font => font.family === family && font.status === 'loaded')),
      cards: [...document.querySelectorAll('.team-card')].slice(0, 4).map(card => {
        const box = card.getBoundingClientRect();
        return { name: card.querySelector('h3').textContent, x: box.x, y: box.y, width: box.width, height: box.height };
      }),
    }));
    assert.equal(health.overflow, false);
    assert.equal(health.background, 'rgb(242, 247, 254)');
    assert.deepEqual(health.brokenImages, []);
    assert.equal(health.fontsLoaded, true);
    assert.deepEqual(errors, []);
    await page.screenshot({ path: `${folder}/team-${width}.png`, fullPage: true });
    await page.screenshot({ path: `${folder}/team-overview-${width}.png` });
    await leadership.screenshot({ path: `${folder}/team-leadership-${width}.png` });

    const opener = page.getByRole('button', { name: 'View biography for Sandeep Chulani' });
    // Click the portrait itself to verify the stretched button covers the whole card.
    const portrait = leadership.getByRole('img', { name: 'Sandeep Chulani' });
    await portrait.scrollIntoViewIfNeeded();
    const portraitBox = await portrait.boundingBox();
    await page.mouse.click(portraitBox.x + portraitBox.width / 2, portraitBox.y + portraitBox.height / 2);
    const dialog = page.getByRole('dialog', { name: 'Sandeep Chulani' });
    await dialog.waitFor();
    await dialog.getByRole('img').evaluate(image => image.decode());
    assert.equal(await dialog.getByRole('link').count(), 0);
    assert.equal(await dialog.getByRole('button').count(), 1);
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    await page.screenshot({ path: `${folder}/team-bio-${width}.png` });
    for (const key of ['Tab', 'Tab', 'Shift+Tab']) {
      await page.keyboard.press(key);
      assert.equal(await dialog.evaluate(node => node.contains(document.activeElement)), true);
    }
    assert.equal(await dialog.evaluate(node => node.scrollWidth > innerWidth), false);
    if (width < 768) {
      const container = dialog.locator('.team-dialog__container');
      await container.evaluate(node => { node.scrollTop = node.scrollHeight; });
      assert.equal(await container.evaluate(node => node.scrollTop > 0), true, 'mobile biography scrolls to all details');
    }
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await opener.evaluate(node => node === document.activeElement), true);
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    assert.equal(new URL(page.url()).hash, '');

    for (const [label, category] of [['Leadership', 'executive'], ['Coaching', 'coaching'], ['Hong Kong', 'hk'], ['Bioethics', 'bioethics']]) {
      const button = page.getByRole('button', { name: label, exact: true });
      await button.click();
      assert.equal(await button.getAttribute('aria-pressed'), 'true');
      const expected = roster.filter(member => !member.categories.includes('retired') && member.categories.includes(category));
      assert.deepEqual((await page.locator('main h3').allTextContents()).sort(), expected.map(member => member.name).sort());
    }
    await page.getByRole('button', { name: 'All', exact: true }).click();
    const search = page.getByRole('searchbox');
    await search.fill(' mAtThEw ');
    assert.deepEqual(await page.locator('main h3').allTextContents(), ['Matthew Wong', 'Matthew H']);
    await page.getByRole('button', { name: 'Coaching', exact: true }).click();
    assert.deepEqual(await page.locator('main h3').allTextContents(), ['Matthew Wong']);
    await search.fill('not-a-member');
    assert.equal(await page.getByRole('status').innerText(), 'No team members match your search.');
    await search.fill('');
    await page.getByRole('button', { name: 'Retired', exact: true }).click();
    const retired = page.getByRole('region', { name: 'Retired Members' });
    assert.equal(await retired.getByRole('listitem').count(), 6);
    assert.equal(await retired.locator('img,button,a,.media,.team-initials,[tabindex]').count(), 0);
    await retired.getByText('Raul L', { exact: true }).click();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByRole('dialog').count(), 0);
    await page.screenshot({ path: `${folder}/team-retired-${width}.png`, fullPage: true });

    await page.goto(`${base}/pages/team.html#member-adrian-chan`);
    await page.getByRole('dialog', { name: 'Adrian Chan' }).waitFor();
    await page.reload();
    await page.getByRole('dialog', { name: 'Adrian Chan' }).waitFor();
    await page.keyboard.press('Escape');
    await page.goto(`${base}/pages/team.html#member-raul-l`);
    await page.getByRole('region', { name: 'Leadership', exact: true }).waitFor();
    assert.equal(await page.getByRole('dialog').count(), 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.reload();
    await page.getByRole('region', { name: 'Our Team', exact: true }).waitFor();
    assert.equal(await page.locator('main h3').count(), 29);
    assert.equal(await page.locator('h1').evaluate(node => getComputedStyle(node).opacity), '1');
    await page.getByRole('button', { name: 'View biography for Adrian Chan' }).click();
    await page.keyboard.press('Escape');
    if (width < 768) {
      await page.getByRole('button', { name: 'Menu', exact: true }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Our Team', exact: true }).click();
    } else await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'Our Team', exact: true }).click();
    assert.equal(new URL(page.url()).pathname, '/pages/team.html');
    await page.getByRole('region', { name: 'Leadership', exact: true }).waitFor();
    await page.getByRole('banner').getByRole('link', { name: 'DebateCraft home' }).click();
    await page.getByRole('link', { name: 'Meet Our Team' }).click();
    await page.getByRole('region', { name: 'Leadership', exact: true }).waitFor();
    assert.deepEqual(errors, []);
    results.views.push({ width, height, ...health, errors });
    console.log(`${width}×${height}: roster, filters, search, portrait click, keyboard/dialog, retired list, deep links/reload, shared navigation and reduced motion passed`);
    await page.close();
  }

  const recovery = await browser.newPage();
  let attempts = 0;
  await recovery.route('**/data/team_members.json', route => ++attempts === 1 ? route.fulfill({ status: 503, body: 'Unavailable' }) : route.continue());
  await recovery.goto(`${base}/pages/team.html`);
  await recovery.getByRole('alert').waitFor();
  await recovery.getByRole('button', { name: 'Retry' }).click();
  await recovery.getByRole('region', { name: 'Leadership', exact: true }).waitFor();
  assert.equal(attempts, 2);
  results.interactions.push('A failed HTTP request shows an error and Retry loads the actual roster');
  await recovery.close();
  const fallback = await browser.newPage();
  await fallback.route('**/Images/Adrian.jpg', route => route.abort());
  await fallback.goto(`${base}/pages/team.html`);
  await fallback.getByRole('img', { name: 'Portrait unavailable for Adrian Chan' }).waitFor();
  await fallback.getByRole('button', { name: 'Accept & Close' }).click();
  await fallback.getByRole('button', { name: 'View biography for Adrian Chan' }).click();
  await fallback.getByRole('dialog', { name: 'Adrian Chan' }).getByRole('img', { name: 'Portrait unavailable for Adrian Chan' }).waitFor();
  results.interactions.push('A failed portrait shows initials in the clickable current-member card and its biography');
  await fallback.close();
  await writeFile(`${folder}/team-browser-results.json`, JSON.stringify(results, null, 2));
  console.log(results.assets);
  console.log(results.interactions.join('\n'));
} finally { await browser.close(); }
