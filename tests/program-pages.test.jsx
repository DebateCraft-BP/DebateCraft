import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test } from 'vitest';
import App from '../src/App';

afterEach(() => window.history.replaceState(null, '', '/'));
function visit(path) {
  window.history.replaceState(null, '', `/pages/${path}.html`);
  return render(<App />);
}

test('What We Do is a full page with three offerings and links to their delivery pathways', () => {
  visit('what-we-do');
  expect(screen.getByRole('heading', { level: 1, name: 'Clear thinking. Confident voices. New possibilities.' })).toBeInTheDocument();
  for (const [name, id] of [['Schools', 'schools'], ['Holiday Programs', 'holiday'], ['Bioethics', 'bioethics']]) {
    const section = screen.getByRole('region', { name, exact: true });
    expect(section).toHaveAttribute('id', id);
    expect(within(section).getByRole('link', { name: /^How .* works?$/ })).toHaveAttribute('href', `/pages/how-we-work.html#${id}`);
    expect(within(screen.getByRole('navigation', { name: 'Our programs' })).getByRole('link', { name })).toHaveAttribute('href', `#${id}`);
  }
  expect(screen.queryByRole('heading', { name: 'The DebateCraft Method' })).not.toBeInTheDocument();
  expect(screen.getByRole('banner')).not.toHaveClass('header-light');
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('course and curriculum details expand independently without hiding eligibility', async () => {
  const user = userEvent.setup();
  visit('what-we-do');
  const holiday = screen.getByRole('region', { name: 'Holiday Programs', exact: true });
  expect(within(holiday).getByText('Ages 9+ · Beginners · 13 sessions · 8 students')).toBeVisible();
  const intro = screen.getByRole('button', { name: 'Introduction to Debate' });
  const intermediate = screen.getByRole('button', { name: 'Intermediate Debate' });
  expect(intro).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText(/PEEL argumentation/)).not.toBeVisible();
  await user.click(intro);
  expect(screen.getByText(/PEEL argumentation/)).toBeVisible();
  await user.click(intermediate);
  expect(intro).toHaveAttribute('aria-expanded', 'true');
  expect(intermediate).toHaveAttribute('aria-expanded', 'true');
  await user.click(intro);
  expect(screen.getByText(/PEEL argumentation/)).not.toBeVisible();
  await user.click(screen.getByRole('button', { name: 'Project work' }));
  expect(screen.getByText(/Parents may attend/)).toBeVisible();
});

test('How We Work keeps its method and three delivery summaries with a link to the full school pathway', () => {
  visit('how-we-work');
  expect(screen.getByRole('heading', { level: 1, name: 'Learn by questioning. Improve through practice.' })).toBeInTheDocument();
  for (const name of ['Analyze', 'Practice', 'Discuss', 'Reflect']) expect(screen.getByRole('heading', { name, exact: true })).toBeInTheDocument();
  for (const name of ['Schools', 'Holiday Programs', 'Bioethics']) expect(screen.getByRole('region', { name, exact: true })).toBeInTheDocument();
  const school = screen.getByRole('region', { name: 'Schools', exact: true });
  expect(within(school).getByRole('link', { name: 'Explore the school pathway' })).toHaveAttribute('href', '/pages/schools.html#pathway');
  expect(within(school).queryByRole('list')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Compare debate tracks' })).toHaveAttribute('href', '/pages/what-we-do.html#holiday');
  expect(screen.getByRole('link', { name: 'Explore the bioethics curriculum' })).toHaveAttribute('href', '/pages/what-we-do.html#bioethics');
});

test('the learning gallery updates image, caption and count by keyboard and wraps in both directions', async () => {
  const user = userEvent.setup();
  visit('how-we-work');
  const gallery = screen.getByRole('region', { name: 'Learning at DebateCraft' });
  const next = within(gallery).getByRole('button', { name: 'Next photograph' });
  const previous = within(gallery).getByRole('button', { name: 'Previous photograph' });
  expect(within(gallery).getByRole('status')).toHaveTextContent('1 / 3');
  next.focus();
  await user.keyboard('{Enter}');
  expect(within(gallery).getByRole('img', { name: 'Building a structured argument' })).toHaveAttribute('src', '/media/debatecraft/Image7.png');
  expect(within(gallery).getByRole('status')).toHaveTextContent('2 / 3');
  await user.click(previous);
  await user.click(previous);
  expect(within(gallery).getByRole('img', { name: 'Timed speaking practice' })).toBeInTheDocument();
  expect(within(gallery).getByRole('status')).toHaveTextContent('3 / 3');
  await user.click(next);
  expect(within(gallery).getByRole('status')).toHaveTextContent('1 / 3');
});

test('FAQ answers open independently and collapsed answer links leave the keyboard order', async () => {
  const user = userEvent.setup();
  visit('how-we-work');
  const faq = screen.getByRole('region', { name: 'Frequently asked questions' });
  expect(within(faq).getAllByRole('button')).toHaveLength(8);
  const cost = within(faq).getByRole('button', { name: 'Are student group classes free?' });
  const level = within(faq).getByRole('button', { name: 'How do I choose a debate level?' });
  expect(within(faq).queryByRole('link', { name: 'View the track comparison' })).not.toBeInTheDocument();
  await user.click(cost);
  await user.click(level);
  expect(cost).toHaveAttribute('aria-expanded', 'true');
  expect(level).toHaveAttribute('aria-expanded', 'true');
  expect(within(faq).getByRole('link', { name: 'View the track comparison' })).toBeVisible();
  await user.click(level);
  expect(within(faq).queryByRole('link', { name: 'View the track comparison' })).not.toBeInTheDocument();
  await user.tab();
  expect(within(faq).getByRole('button', { name: 'What does a school need to provide?' })).toHaveFocus();
  expect(cost).toHaveAttribute('aria-expanded', 'true');
});

test('Who We Are introduces DebateCraft’s mission and values and connects to the existing Team page', () => {
  visit('who-we-are');
  expect(screen.getByRole('heading', { level: 1, name: 'Young people helping young people find their voice.' })).toBeInTheDocument();
  expect(screen.getByText(/student-run initiative/)).toBeInTheDocument();
  expect(screen.getByRole('region', { name: 'Our mission' })).toBeInTheDocument();
  const values = screen.getByRole('region', { name: 'What we believe in.' });
  for (const name of ['Access', 'Reasoning', 'Practice', 'Community']) expect(within(values).getByRole('heading', { name })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Meet our team' })).toHaveAttribute('href', '/pages/team.html');
  expect(screen.getByRole('link', { name: 'Explore our programs' })).toHaveAttribute('href', '/pages/what-we-do.html');
  expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
});
