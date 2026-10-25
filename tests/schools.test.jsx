import { render, screen, within } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import App from '../src/App';

afterEach(() => window.history.replaceState(null, '', '/'));
function visit(page) {
  window.history.replaceState(null, '', `/pages/${page}.html`);
  return render(<App />);
}

test('Schools opens its own page from the shared header and keeps How We Work separate', () => {
  visit('schools');
  expect(screen.getByRole('heading', { level: 1, name: 'Build a school team that keeps growing.' })).toBeInTheDocument();
  const navigation = screen.getByRole('navigation', { name: 'Primary navigation' });
  expect(within(navigation).getByRole('link', { name: 'Schools', exact: true })).toHaveAttribute('href', '/pages/schools.html');
  expect(within(navigation).getByRole('link', { name: 'Schools', exact: true })).toHaveAttribute('aria-current', 'page');
  expect(within(navigation).getByRole('link', { name: 'How We Work', exact: true })).toHaveAttribute('href', '/pages/how-we-work.html');
  expect(screen.getByRole('banner')).not.toHaveClass('header-light');
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('school leads can review all five stages and find the school-specific email inquiry', () => {
  visit('schools');
  const pathway = screen.getByRole('region', { name: 'From first speeches to a lasting team.' });
  expect(pathway).toHaveAttribute('id', 'pathway');
  expect(within(pathway).getAllByRole('listitem')).toHaveLength(5);
  for (const text of ['Weeks 1–2', '8–12 weeks', 'One term', '6–10 weeks per event', 'Annual review']) {
    expect(within(pathway).getByText(text)).toBeVisible();
  }
  expect(within(pathway).getByText('We adapt the sequence and timing with your school.')).toBeVisible();
  expect(screen.getByRole('link', { name: 'Email a school inquiry' })).toHaveAttribute('href', 'mailto:info@debatecraft.org?subject=School%20debate%20program');
  const jumps = screen.getByRole('navigation', { name: 'School program' });
  for (const [name, id] of [['Pathway', 'pathway'], ['Delivery', 'delivery'], ['School inquiries', 'inquiries']]) {
    expect(within(jumps).getByRole('link', { name })).toHaveAttribute('href', `#${id}`);
    expect(document.getElementById(id)).not.toBeNull();
  }
  expect(screen.getByText(/Live online groups of 5–10 students/)).toBeVisible();
  expect(screen.getByRole('link', { name: 'Meet our team', exact: true })).toHaveAttribute('href', '/pages/team.html');
  expect(screen.queryByRole('form', { name: 'School inquiry' })).not.toBeInTheDocument();
});

test('What We Do gives school leads a direct entry to the dedicated Schools page', () => {
  visit('what-we-do');
  const school = screen.getByRole('region', { name: 'Schools', exact: true });
  expect(within(school).getByRole('link', { name: 'Explore school programs' })).toHaveAttribute('href', '/pages/schools.html');
  expect(within(school).getByRole('link', { name: 'How school training works' })).toHaveAttribute('href', '/pages/how-we-work.html#schools');
});
