import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '../src/App';

test('visitors explore DebateCraft programs and guides without Hejl branding or destinations', () => {
  render(<App />);
  const main = screen.getByRole('main');
  expect(within(main).getAllByRole('heading', { level: 2 }).map(node => node.textContent)).toEqual([
    '400+ Students. 19 Countries. A Shared Love of Debate.',
    'The DebateCraft Method', 'Our Programs', 'Learn & Explore',
  ]);
  expect(within(main).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Introduction to Debate', 'World Schools (WSDC)', 'British Parliamentary', 'Bioethics']);
  expect(screen.getByRole('link', { name: 'Meet Our Team' })).toHaveAttribute('href', '/pages/team.html');
  expect(screen.getByRole('link', { name: /Building a case that stands up to scrutiny/ })).toHaveAttribute('href', 'https://debatecraft.substack.com/');
  expect(screen.getByRole('heading', { level: 1, name: 'Clear thinking. Confident voices. Debate without limits.' })).toBeInTheDocument();
  expect(document.body).not.toHaveTextContent(/Hejl|Grant Database|Florida Grand Opera|Grant-related/i);
  for (const link of screen.getAllByRole('link')) expect(link.href).not.toMatch(/hejlfoundation/i);
  for (const image of [...document.images]) expect(image.getAttribute('src')).toMatch(/^\/media\/debatecraft\//);
  expect(document.querySelector('video')).not.toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});
