import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { JSDOM } from 'jsdom';

const root = resolve('.firecrawl/hejl-pages-reference');
const context = { capturedAt: new Date().toISOString(), mode: 'UI design-system reference', fresh: true, pages: [] };
await mkdir(`${root}/.firecrawl`, { recursive: true });
const stylesheets = new Set();
for (const name of ['what-we-do', 'how-we-work']) {
  const folder = `${root}/${name}`;
  const raw = JSON.parse(await readFile(`${folder}/.firecrawl/design-reference.json`, 'utf8'));
  const data = raw.data || raw;
  for (const [field, filename] of [['markdown', 'page.md'], ['html', 'page.html'], ['rawHtml', 'page.raw.html']]) {
    if (data[field]) await writeFile(`${folder}/${filename}`, data[field]);
  }
  if (data.screenshot) execFileSync('curl', ['--fail', '-sL', data.screenshot, '-o', `${folder}/.firecrawl/design-reference.png`], { stdio: 'pipe' });
  const document = new JSDOM(data.rawHtml || data.html, { url: data.metadata.sourceURL }).window.document;
  const css = [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.href).filter(url => /\/dist\/styles\.css/.test(url));
  css.forEach(url => stylesheets.add(url));
  const images = [...document.images].map(image => {
    const ancestry = [];
    let node = image.parentElement;
    for (let level = 0; node && level < 6; level++, node = node.parentElement) ancestry.push({ tag: node.tagName, class: node.className });
    return { src: image.getAttribute('src'), srcset: image.getAttribute('srcset'), alt: image.alt, width: image.getAttribute('width'), height: image.getAttribute('height'), ancestry };
  });
  await writeFile(`${folder}/image-inventory.json`, JSON.stringify({ returnedImages: data.images || [], htmlImages: images }, null, 2));
  context.pages.push({ name, url: data.metadata.sourceURL, metadata: data.metadata, stylesheetURLs: css, formats: { markdown: !!data.markdown, html: !!data.html, rawHtml: !!data.rawHtml, branding: !!data.branding, images: !!data.images, screenshot: !!data.screenshot }, cliScreenshot: '.firecrawl/design-reference.png', imageCount: images.length });
  console.log(JSON.stringify({ name, metadata: data.metadata, fonts: data.branding?.fonts, colors: data.branding?.colors, typography: data.branding?.typography, returnedImageCount: data.images?.length, htmlImageCount: images.length, stylesheets: css }, null, 2));
}
context.stylesheets = [];
for (const [index, url] of [...stylesheets].entries()) {
  const file = index === 0 ? 'styles.source.css' : `styles.source-${index}.css`;
  execFileSync('curl', ['--fail', '-sL', url, '-o', `${root}/${file}`], { stdio: 'pipe' });
  const contents = await readFile(`${root}/${file}`);
  context.stylesheets.push({ url, file, sha256: createHash('sha256').update(contents).digest('hex') });
}
await writeFile(`${root}/.firecrawl/source-context.json`, JSON.stringify(context, null, 2));
