import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

process.env.PLAYWRIGHT_BROWSERS_PATH ||= resolve('.cache/ms-playwright');
const { chromium } = await import('playwright');
const root = resolve('.firecrawl/hejl-pages-reference');
const browser = await chromium.launch();
const records = [];
const pages = [
  { name: 'what-we-do', selectors: ['.hero-areas', '.hero-areas__bubbles', '.heading-bubbles__bubble', '.areas-areas', '.areas-areas__header', '.areas-areas__list', '.areas-areas__item', '.areas-areas__item-content', '.areas-areas__item-heading', '.areas-areas__item-description', '.areas-areas__item-image', '.headings-areas', '.scrolling-heading', '.scrolling-heading__heading', '.scrolling-heading__image'] },
  { name: 'how-we-work', selectors: ['.page-grant-resources', '.hero-gr', '.hero-gr__bubbles', '.slider-gr', '.slider-gr__container', '.slider-gallery', '.slider-gallery__media', '.slider-gallery__content', '.slider-navigation__button', '.areas-gr', '.areas-gr__header', '.areas-gr__heading', '.areas-gr__description', '.cards', '.card', '.card__thumbnail', '.card__title', '.card__description', '.approach', '.approach__container', '.approach__title', '.approach__content', '.approach__image', '.approach__list', '.approach__card', '.video-gr', '.video-gr__heading', '.video-player', '.accordions-faq', '.faq-marquee', '.accordions-faq__content', '.accordions-faq__button', '.accordions-faq__item', '.accordion__heading', '.accordion__num', '.accordion__title', '.accordion__content'] },
];

async function captureMetrics(page, selectors) {
  return page.evaluate(selectors => {
    const styles = node => {
      const css = getComputedStyle(node);
      return Object.fromEntries(['backgroundColor', 'color', 'fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'padding', 'margin', 'gap', 'gridTemplateColumns', 'gridColumn', 'borderRadius', 'boxShadow', 'aspectRatio', 'objectFit', 'objectPosition', 'transform', 'clipPath'].map(key => [key, css[key]]));
    };
    return {
      viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
      documentHeight: document.body.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      bodyClass: document.body.className,
      body: styles(document.body),
      rootFontSize: getComputedStyle(document.documentElement).fontSize,
      fonts: [...document.fonts].map(font => ({ family: font.family, weight: font.weight, status: font.status })),
      sections: [...document.querySelectorAll('main section')].map(node => ({ class: node.className, headings: [...node.querySelectorAll('h1,h2,h3')].map(heading => heading.textContent.trim().replace(/\s+/g, ' ')) })),
      elements: Object.fromEntries(selectors.map(selector => [selector, [...document.querySelectorAll(selector)].map(node => {
        const rect = node.getBoundingClientRect();
        return { text: node.textContent.trim().replace(/\s+/g, ' ').slice(0, 150), x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height, styles: styles(node) };
      })])),
      images: [...document.querySelectorAll('main img')].map(node => ({ src: node.src, currentSrc: node.currentSrc, dataSrc: node.getAttribute('data-src'), complete: node.complete, naturalWidth: node.naturalWidth, naturalHeight: node.naturalHeight, styles: styles(node), parentClass: node.closest('.media')?.className })),
      videos: [...document.querySelectorAll('main video')].map(video => ({ src: video.currentSrc || video.getAttribute('data-src'), readyState: video.readyState, paused: video.paused, loop: video.loop, muted: video.muted })),
    };
  }, selectors);
}

try {
  for (const target of pages) {
    const folder = `${root}/${target.name}`;
    await mkdir(`${folder}/.firecrawl`, { recursive: true });
    for (const [name, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: name === 'mobile', hasTouch: name === 'mobile' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      const response = await page.goto(`https://www.hejlfoundation.org/${target.name}/`, { waitUntil: 'domcontentloaded', timeout: 45000 });
      await page.locator(target.selectors[0]).waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(1500);
      for (let y = 0; y < await page.evaluate(() => document.body.scrollHeight); y += height * .6) {
        await page.evaluate(y => scrollTo(0, y), y);
        await page.waitForTimeout(140);
      }
      await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
      await page.waitForTimeout(1000);
      await page.evaluate(() => { document.querySelectorAll('video').forEach(video => video.pause()); scrollTo(0, 0); });
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${folder}/${name}-settled.png`, fullPage: true });
      const record = { page: target.name, name, capturedAt: new Date().toISOString(), url: page.url(), status: response.status(), errors, metrics: await captureMetrics(page, target.selectors), states: {} };
      await writeFile(`${folder}/.firecrawl/${name}-metrics.json`, JSON.stringify(record, null, 2));
      const manage = page.locator('.cookies__dialog--basic button[data-button="manage"]');
      if (await manage.isVisible()) {
        await manage.click();
        await page.locator('.cookies__dialog--manage button[data-button="deny"]').click();
        await page.waitForTimeout(600);
      }
      await page.screenshot({ path: `${folder}/${name}-clean.png`, fullPage: true });
      await page.screenshot({ path: `${folder}/${name}-hero.png` });
      if (target.name === 'what-we-do') {
        await page.locator('.areas-areas__item').nth(0).screenshot({ path: `${folder}/${name}-program-1.png` });
        await page.locator('.areas-areas__item').nth(1).screenshot({ path: `${folder}/${name}-program-2.png` });
        await page.locator('.headings-areas').screenshot({ path: `${folder}/${name}-marquee.png` });
        record.states.marquee = { captured: true, note: 'One observed frame; timing and complete scroll sequence are not established.' };
      } else {
        const gallery = page.locator('.slider-gallery');
        record.states.gallery = { initialIndex: await gallery.getAttribute('data-current-index') };
        await page.locator('.slider-gr').screenshot({ path: `${folder}/${name}-gallery-1.png` });
        await page.getByRole('button', { name: 'Next', exact: true }).click();
        await page.waitForTimeout(900);
        record.states.gallery.nextIndex = await gallery.getAttribute('data-current-index');
        record.states.gallery.nextCaption = await page.locator('.slider-gallery__caption').evaluateAll(nodes => nodes.map(node => ({ text: node.textContent.trim(), class: node.className })));
        await page.locator('.slider-gr').screenshot({ path: `${folder}/${name}-gallery-2.png` });
        await page.getByRole('button', { name: 'Previous', exact: true }).click();
        await page.waitForTimeout(700);
        record.states.gallery.previousIndex = await gallery.getAttribute('data-current-index');
        await page.locator('.areas-gr').screenshot({ path: `${folder}/${name}-cards.png` });
        await page.locator('.approach').screenshot({ path: `${folder}/${name}-approach.png` });
        await page.locator('.video-gr').screenshot({ path: `${folder}/${name}-video-poster.png` });
        await page.locator('.accordions-faq__container').screenshot({ path: `${folder}/${name}-faq-closed.png` });
        const first = page.locator('[data-accordion-trigger]').nth(0);
        await first.click();
        await page.waitForTimeout(750);
        record.states.faq = { firstExpanded: await first.getAttribute('aria-expanded'), firstContentInert: await page.locator('[data-accordion-content]').nth(0).getAttribute('inert') };
        await page.locator('.accordions-faq__container').screenshot({ path: `${folder}/${name}-faq-open.png` });
        await writeFile(`${folder}/${name}-faq-open.html`, await page.locator('.accordions-faq').evaluate(node => node.outerHTML));
        await page.locator('[data-accordion-trigger]').nth(1).click();
        await page.waitForTimeout(650);
        record.states.faq.afterSecond = await page.locator('[data-accordion-trigger]').evaluateAll(nodes => nodes.slice(0, 2).map(node => node.getAttribute('aria-expanded')));
        await first.click();
        await page.waitForTimeout(650);
        record.states.faq.afterFirstToggle = await first.getAttribute('aria-expanded');
        record.states.video = { posterCaptured: true, playbackTested: false };
      }
      await writeFile(`${folder}/.firecrawl/${name}-states.json`, JSON.stringify(record, null, 2));
      records.push(record);
      await writeFile(`${root}/.firecrawl/settled-captures.json`, JSON.stringify(records, null, 2));
      console.log(`${target.name} ${name}: ${record.metrics.documentHeight}px; ${record.metrics.images.filter(image => !image.naturalWidth).length} undecoded images; ${errors.length} page errors`);
      await page.close();
    }
  }
} finally { await browser.close(); }
