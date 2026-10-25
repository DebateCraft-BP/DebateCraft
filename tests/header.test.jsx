import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Header from '../src/components/Header';

test('desktop and mobile headers show Who We Are, What We Do and How We Work in order', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const expected = ['Who We Are', 'What We Do', 'How We Work', 'Schools', 'Resources', 'Our Team', 'Contact'];
  const desktop = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getAllByRole('link');
  expect(desktop.map(link => link.textContent)).toEqual(expected);
  expect(desktop.map(link => link.getAttribute('href'))).toEqual([
    '/pages/who-we-are.html', '/pages/what-we-do.html', '/pages/how-we-work.html', '/pages/schools.html', '/pages/resources.html', '/pages/team.html', '/pages/contact.html',
  ]);
  await user.click(screen.getByRole('button', { name: 'Menu' }));
  const mobile = within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getAllByRole('link');
  expect(mobile.map(link => link.textContent)).toEqual(expected);
  expect(mobile.map(link => link.getAttribute('href'))).toEqual(desktop.map(link => link.getAttribute('href')));
});

test('a visitor opens navigation, tabs within it, and dismisses it with Escape back to the menu button', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const trigger = screen.getByRole('button', { name: 'Menu' });
  await user.click(trigger);
  const menu = screen.getByRole('dialog', { name: 'Site navigation' });
  const links = within(menu).getAllByRole('link');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  expect(links[0]).toHaveFocus();
  await user.tab({ shift: true });
  expect(within(menu).getByRole('button', { name: 'Close menu' })).toHaveFocus();
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
