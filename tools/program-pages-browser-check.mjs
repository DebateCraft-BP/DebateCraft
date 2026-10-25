import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const base = process.env.TEST_URL || 'http://127.0.0.1:4173';
const folder = resolve('.firecrawl/verification');
await mkdir(folder, { recursive: true });
const aliases = [
  ['about', 'who-we-are', ''], ['offerings', 'what-we-do', ''],
  ['biology', 'what-we-do', '#bioethics'],
  ['training-pathway', 'schools', '#pathway'], ['partnership', 'schools', '#inquiries'],
];
const pages = [
  ['who-we-are', 'Who We Are', 'Young people helping young people find their voice.'],
  ['what-we-do', 'What We Do', 'Clear thinking. Confident voices. New possibilities.'],
  ['how-we-work', 'How We Work', 'Learn by questioning. Improve through practice.'],
  ['schools', 'Schools', 'Build a school team that keeps growing.'],
];
const results = { aliases: [], views: [], interactions: [] };
const browser = await chromium.launch();
async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
  for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += page.viewportSize().height) {
    await page.evaluate(y => scrollTo(0, y), y);
    await page.waitForTimeout(35);
  }
  await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(700);
}
try {
  const redirectPage = await browser.newPage();
  for (const [alias, canonical, hash] of aliases) {
    await redirectPage.goto(`${base}/pages/${alias}.html`);
    await redirectPage.waitForURL(`${base}/pages/${canonical}.html${hash}`, { timeout: 4000 });
    await redirectPage.reload();
    assert.equal(new URL(redirectPage.url()).pathname, `/pages/${canonical}.html`);
    assert.equal(new URL(redirectPage.url()).hash, hash);
    assert.equal(await redirectPage.locator('link[rel="canonical"]').getAttribute('href'), `https://debatecraft.org/pages/${canonical}.html`);
    results.aliases.push({ alias, canonical, hash, reload: true });
  }
  await redirectPage.goto(`${base}/pages/offerings.html?source=legacy#holiday`);
  await redirectPage.waitForURL(`${base}/pages/what-we-do.html?source=legacy#holiday`);
  for (const [alias, fragment] of [['training-pathway', '#pathway'], ['partnership', '#inquiries']]) {
    await redirectPage.goto(`${base}/pages/${alias}.html?source=school-email`);
    await redirectPage.waitForURL(`${base}/pages/schools.html?source=school-email${fragment}`);
  }
  await redirectPage.close();
  for (const [width, height] of [[1440, 1000], [390, 844], [900, 1000], [1920, 1080]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(base);
    await page.getByRole('button', { name: 'Accept & Close' }).click();
    for (const [slug, label, heading] of pages) {
      if (width < 768) await page.getByRole('button', { name: 'Menu', exact: true }).click();
      const nav = page.getByRole('navigation', { name: width < 768 ? 'Mobile navigation' : 'Primary navigation' });
      await nav.getByRole('link', { name: label, exact: true }).click();
      await page.waitForURL(`${base}/pages/${slug}.html`);
      assert.equal(await page.title(), `${label} | DebateCraft`);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').innerText().then(text => text.replace(/\s+/g, ' ').trim()), heading);
      assert.equal(await page.locator('a[aria-current="page"]').count(), 1);
      if (width >= 768) {
        const navigation = page.getByRole('navigation', { name: 'Primary navigation' });
        assert.deepEqual(await navigation.getByRole('link').allTextContents(), ['Who We Are', 'What We Do', 'How We Work', 'Schools', 'Resources', 'Our Team', 'Contact']);
        const navBox = await navigation.boundingBox();
        const logoBox = await page.getByRole('banner').getByRole('link', { name: 'DebateCraft home' }).boundingBox();
        assert.ok(navBox.x >= logoBox.x + logoBox.width, `header does not overlap at ${width}`);
        assert.ok(navBox.x + navBox.width <= width, `header fits at ${width}`);
      }
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://debatecraft.org/pages/${slug}.html`);
      await page.reload();
      await settle(page);
      const health = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        background: getComputedStyle(document.body).backgroundColor,
        brokenImages: [...document.images].filter(image => !image.complete || !image.naturalWidth).map(image => image.src),
        fontsLoaded: ['Inter', 'PP Editorial New'].every(family => [...document.fonts].some(font => font.family === family && font.status === 'loaded')),
        forms: document.querySelector('.editorial-page').querySelectorAll('form,iframe,a[href*="forms.gle"],a[href*="docs.google.com/forms"],a[href*="jotform"]').length,
        hero: (() => { const rect = document.querySelector('h1').getBoundingClientRect(); return { x: rect.x, y: rect.y, width: rect.width, height: rect.height }; })(),
      }));
      assert.equal(health.overflow, false, `${slug} ${width}: overflow`);
      assert.equal(health.background, 'rgb(242, 247, 254)');
      assert.deepEqual(health.brokenImages, []);
      assert.equal(health.fontsLoaded, true);
      assert.equal(health.forms, 0);
      assert.equal(await page.locator('.editorial-page a[href^="mailto:info@debatecraft.org"]').count() >= 2, true);
      assert.equal(await page.locator('a[href*="hejlfoundation"]').count(), 0);
      await page.screenshot({ path: `${folder}/${slug}-${width}.png`, fullPage: true });
      await page.screenshot({ path: `${folder}/${slug}-hero-${width}.png` });
      if (slug === 'who-we-are') {
        assert.equal(await page.getByRole('link', { name: 'Meet our team', exact: true }).getAttribute('href'), '/pages/team.html');
      }
      if (slug === 'what-we-do') {
        for (const [name, id] of [['Schools', 'schools'], ['Holiday Programs', 'holiday'], ['Bioethics', 'bioethics']]) {
          await page.getByRole('navigation', { name: 'Our programs' }).getByRole('link', { name, exact: true }).click();
          assert.equal(new URL(page.url()).hash, `#${id}`);
          const top = await page.locator(`#${id}`).evaluate(node => node.getBoundingClientRect().top);
          const bottom = await page.locator('.header').evaluate(node => node.getBoundingClientRect().bottom);
          assert.ok(top >= bottom - 1, `${id} anchor must clear header`);
        }
        const intro = page.getByRole('button', { name: 'Introduction to Debate', exact: true });
        await intro.click();
        assert.equal(await intro.getAttribute('aria-expanded'), 'true');
        const second = page.getByRole('button', { name: 'Intermediate Debate', exact: true });
        await second.click();
        assert.equal(await intro.getAttribute('aria-expanded'), 'true');
        await page.locator('#holiday').screenshot({ path: `${folder}/what-we-do-courses-${width}.png` });
        const project = page.getByRole('button', { name: 'Project work', exact: true });
        await project.click();
        assert.equal(await project.getAttribute('aria-expanded'), 'true');
        await page.getByRole('link', { name: 'How bioethics learning works' }).click();
        await page.waitForURL(`${base}/pages/how-we-work.html#bioethics`);
        const top = await page.locator('#bioethics').evaluate(node => node.getBoundingClientRect().top);
        assert.ok(top > 60 && top < height, `deep-linked pathway is positioned below header: ${top}`);
        await page.goto(`${base}/pages/what-we-do.html`);
        await settle(page);
      }
      if (slug === 'schools') {
        const pathway = page.getByRole('region', { name: 'From first speeches to a lasting team.' });
        assert.equal(await pathway.getByRole('listitem').count(), 5);
        assert.equal(await pathway.getByText('We adapt the sequence and timing with your school.').isVisible(), true);
        for (const [name, id] of [['Pathway', 'pathway'], ['Delivery', 'delivery'], ['School inquiries', 'inquiries']]) {
          await page.getByRole('navigation', { name: 'School program' }).getByRole('link', { name, exact: true }).click();
          assert.equal(new URL(page.url()).hash, `#${id}`);
          const top = await page.locator(`#${id}`).evaluate(node => node.getBoundingClientRect().top);
          const bottom = await page.locator('.header').evaluate(node => node.getBoundingClientRect().bottom);
          assert.ok(top >= bottom - 1 && top < height, `school ${id} anchor clears header`);
        }
        assert.equal(await page.getByRole('link', { name: 'Email a school inquiry' }).getAttribute('href'), 'mailto:info@debatecraft.org?subject=School%20debate%20program');
        assert.equal(await page.getByRole('link', { name: 'Meet our team', exact: true }).getAttribute('href'), '/pages/team.html');
        await pathway.screenshot({ path: `${folder}/schools-pathway-${width}.png` });
        await page.locator('#inquiries').screenshot({ path: `${folder}/schools-inquiries-${width}.png` });
        await page.goto(`${base}/pages/what-we-do.html#schools`);
        await page.getByRole('link', { name: 'Explore school programs' }).click();
        await page.waitForURL(`${base}/pages/schools.html`);
        await page.goto(`${base}/pages/how-we-work.html#schools`);
        await page.getByRole('link', { name: 'Explore the school pathway' }).click();
        await page.waitForURL(`${base}/pages/schools.html#pathway`);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(120);
        const top = await page.locator('#pathway').evaluate(node => node.getBoundingClientRect().top);
        const bottom = await page.locator('.header').evaluate(node => node.getBoundingClientRect().bottom);
        assert.ok(top >= bottom - 1 && top < height, 'cross-page school pathway fragment is positioned correctly');
      }
      if (slug === 'how-we-work') {
        const gallery = page.getByRole('region', { name: 'Learning at DebateCraft' });
        const next = gallery.getByRole('button', { name: 'Next photograph' });
        await next.focus();
        await page.keyboard.press('Enter');
        assert.equal(await gallery.getByRole('status').innerText(), '2 / 3');
        await gallery.getByRole('img', { name: 'Building a structured argument' }).waitFor();
        await gallery.getByRole('button', { name: 'Previous photograph' }).click();
        await gallery.getByRole('button', { name: 'Previous photograph' }).click();
        assert.equal(await gallery.getByRole('status').innerText(), '3 / 3');
        await gallery.screenshot({ path: `${folder}/how-we-work-gallery-${width}.png` });
        const faq = page.getByRole('region', { name: 'Frequently asked questions' });
        const cost = faq.getByRole('button', { name: 'Are student group classes free?' });
        const level = faq.getByRole('button', { name: 'How do I choose a debate level?' });
        await cost.click(); await level.click();
        assert.equal(await cost.getAttribute('aria-expanded'), 'true');
        assert.equal(await level.getAttribute('aria-expanded'), 'true');
        await level.click();
        assert.equal(await faq.getByRole('link', { name: 'View the track comparison' }).count(), 0);
        await page.keyboard.press('Tab');
        assert.equal(await faq.getByRole('button', { name: 'What does a school need to provide?' }).evaluate(node => node === document.activeElement), true);
        await faq.screenshot({ path: `${folder}/how-we-work-faq-${width}.png` });
        const sticky = await page.locator('.approach-photo').evaluate(node => getComputedStyle(node).position);
        assert.equal(sticky, width < 768 ? 'static' : 'sticky');
      }
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForFunction(() => getComputedStyle(document.querySelector('h1')).opacity === '1');
      if (slug === 'what-we-do') assert.equal(await page.locator('.learning-strip span').first().evaluate(node => getComputedStyle(node).animationName), 'none');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      assert.deepEqual(errors, []);
      results.views.push({ slug, width, height, ...health });
      console.log(`${slug} ${width}: navigation, reload, assets, layout and interactions passed`);
    }
    await page.close();
  }
  results.interactions.push('Desktop/mobile shared navigation; direct reloads; five compatibility URLs including school redirects; preserved query/hash; school pathway and inquiry anchors; seven-item navigation fit; school summary entry points;  offering anchors; course and curriculum disclosures; pathway deep links; keyboard gallery; independent FAQs and hidden-answer focus; email-only inquiry actions; reduced motion.');
  await writeFile(`${folder}/program-pages-browser-results.json`, JSON.stringify(results, null, 2));
} finally { await browser.close(); }
