import { render, screen, within } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from '../src/App';

afterEach(() => window.history.replaceState(null, '', '/'));

test.each([
  ['/', '/pages/donate.html', 'Support DebateCraft', 'Buy Me a Coffee', '/pages/cndonate.html'],
  ['/cnindex.html', '/pages/cndonate.html', '支持 DebateCraft', '喺 Buy Me a Coffee 支持我哋', '/pages/donate.html'],
])('visitors can find and use the support page from %s', (home, path, title, action, counterpart) => {
  window.history.replaceState(null, '', home);
  const homepage = render(<App />);
  expect(within(screen.getByRole('contentinfo')).getByRole('link', { name: title })).toHaveAttribute('href', path);
  homepage.unmount();

  window.history.replaceState(null, '', path);
  render(<App />);
  const main = within(screen.getByRole('main'));
  expect(main.getByRole('heading', { level: 1, name: title })).toBeVisible();
  expect(main.getByRole('link', { name: action })).toHaveAttribute('href', 'https://buymeacoffee.com/debatecraft');
  expect(screen.getAllByRole('link', { name: /Switch to Cantonese|切換到英文版/ }).length).toBeGreaterThan(0);
  for (const languageLink of screen.getAllByRole('link', { name: /Switch to Cantonese|切換到英文版/ })) {
    expect(languageLink).toHaveAttribute('href', counterpart);
  }
});
