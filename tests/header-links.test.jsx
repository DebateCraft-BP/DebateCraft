import { existsSync } from 'node:fs';
import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../src/App';

test('every header link lands on a page or section that exists', () => {
  render(<App />);
  const links = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getAllByRole('link');
  for (const link of links) {
    const href = link.getAttribute('href');
    if (href.startsWith('mailto:')) continue;
    expect(href, `${link.textContent} must not leave the site`).toMatch(/^\//);
    const [path, hash] = href.split('#');
    if (path !== '/') expect(existsSync(`.${path}`), `${link.textContent} -> ${path}`).toBe(true);
    if (hash) expect(document.getElementById(hash), `${link.textContent} -> #${hash}`).not.toBeNull();
  }
});
