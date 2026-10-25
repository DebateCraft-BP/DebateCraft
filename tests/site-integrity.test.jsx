import { existsSync, readFileSync } from 'node:fs';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from '../src/App';
import {localePairs} from '../src/i18n';

const origin = 'https://debatecraft.org';
const pages = ['/', '/pages/team.html', '/pages/resources.html', '/pages/contact.html', '/pages/who-we-are.html', '/pages/what-we-do.html', '/pages/how-we-work.html', '/pages/schools.html', ...localePairs.map(([,cn])=>cn)];
const htmlFor = path => (path === '/' ? 'index.html' : path.slice(1));
const parse = file => new DOMParser().parseFromString(readFileSync(file, 'utf8'), 'text/html');
afterEach(() => { cleanup(); window.history.pushState(null, '', '/'); });

test.each(pages)('every link on %s reaches a page that still exists', path => {
  window.history.pushState(null, '', path);
  render(<App />);
  for (const link of screen.getAllByRole('link')) {
    const href = link.getAttribute('href');
    expect(href, `${link.textContent}`).not.toMatch(/debatecraft\.org\/pages\//);
    if (!href.startsWith('/')) continue;
    const [target] = href.split('#');
    const file = target === '/' ? 'index.html' : target.slice(1);
    expect(existsSync(file) || existsSync(`public/${file}`), `${link.textContent} -> ${href}`).toBe(true);
  }
});

test('the homepage has a single visible h1 that carries the tagline', () => {
  render(<App />);
  const h1s = screen.getAllByRole('heading', { level: 1 });
  expect(h1s.map(node => node.textContent)).toEqual(['Clear thinking. Confident voices. Debate without limits.']);
  expect(h1s[0]).not.toHaveClass('visually-hidden');
});

test('the sitemap lists exactly the pages that exist and robots.txt points to it', () => {
  const sitemap = readFileSync('public/sitemap.xml', 'utf8');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  expect(urls).toEqual(pages.map(path => `${origin}${path}`));
  for (const path of pages) expect(existsSync(htmlFor(path)), path).toBe(true);
  const robots = readFileSync('public/robots.txt', 'utf8');
  expect(robots).toMatch(/^User-agent: \*$/m);
  expect(robots).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(robots).not.toMatch(/Disallow:\s*\/data/);
});

test.each(pages)('%s has complete Open Graph and Twitter card tags', path => {
  const doc = parse(htmlFor(path));
  const meta = (attr, name) => doc.querySelector(`meta[${attr}="${name}"]`)?.getAttribute('content');
  expect(meta('property', 'og:type')).toBe('website');
  expect(meta('property', 'og:url')).toBe(doc.querySelector('link[rel="canonical"]').getAttribute('href'));
  expect(meta('property', 'og:title')).toBe(doc.title);
  expect(meta('property', 'og:description')).toBe(meta('name', 'description'));
  expect(meta('property', 'og:image')).toMatch(/^https:\/\/debatecraft\.org\/media\/debatecraft\/.+\.(jpe?g|png)$/);
  expect(existsSync(`public${new URL(meta('property', 'og:image')).pathname}`)).toBe(true);
  expect(meta('property', 'og:image:alt')).toBeTruthy();
  expect(meta('name', 'twitter:card')).toBe('summary_large_image');
  expect(meta('name', 'twitter:title')).toBe(doc.title);
  expect(meta('name', 'twitter:description')).toBe(meta('name', 'description'));
  expect(meta('name', 'twitter:image')).toBe(meta('property', 'og:image'));
});
