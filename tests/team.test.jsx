import { render, screen, within, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import App from '../src/App';
import roster from '../legacy/data/team_members.json';

function loadRoster(data = roster) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => data }));
}

afterEach(() => {
  window.history.replaceState(null, '', '/');
  vi.unstubAllGlobals();
});

function renderTeam(hash = '') {
  window.history.replaceState(null, '', `/pages/team.html${hash}`);
  return render(<App />);
}

test('the Team URL renders its own page with shared navigation and a dark header', () => {
  loadRoster();
  renderTeam();
  expect(screen.getByRole('heading', { level: 1, name: 'The people behind DebateCraft.' })).toBeInTheDocument();
  expect(screen.queryByText('The DebateCraft Method')).not.toBeInTheDocument();
  expect(screen.getByRole('banner')).not.toHaveClass('header-light');
  expect(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Our Team' })).toHaveAttribute('href', '/pages/team.html');
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();
});

test('the roster shows three leaders and 26 team members once each, using the current JSON', async () => {
  loadRoster();
  renderTeam();
  const leadership = await screen.findByRole('region', { name: 'Leadership' });
  const team = screen.getByRole('region', { name: 'Our Team' });
  expect(within(leadership).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Adrian Chan', 'Gavin Zhao', 'Sandeep Chulani']);
  expect(within(team).getAllByRole('heading', { level: 3 })).toHaveLength(26);
  for (const name of ['Matthew Wong', 'Bella Cai', 'Valmik Dagayach', 'Rachel Rhodes', 'Oliver Choi']) {
    expect(within(team).getByRole('heading', { name })).toBeInTheDocument();
  }
  for (const member of roster) {
    const names = screen.queryAllByRole('heading', { level: 3, name: member.name });
    expect(names).toHaveLength(member.categories.includes('retired') ? 0 : 1);
  }
  expect(fetch).toHaveBeenCalledWith('/data/team_members.json', expect.objectContaining({ signal: expect.any(AbortSignal) }));
});

test('the original category buttons keep their matching behavior and combine with name search', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam();
  await screen.findByRole('region', { name: 'Leadership' });
  for (const [label, category] of [['Leadership', 'executive'], ['Coaching', 'coaching'], ['Hong Kong', 'hk'], ['Bioethics', 'bioethics'], ['All', null]]) {
    const button = screen.getByRole('button', { name: label, exact: true });
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    const expected = roster.filter(member => !member.categories.includes('retired') && (!category || member.categories.includes(category)));
    expect(screen.getAllByRole('heading', { level: 3 }).map(node => node.textContent).sort()).toEqual(expected.map(member => member.name).sort());
    if (category === 'executive') expect(within(screen.getByRole('region', { name: 'Our Team' })).getByRole('heading', { name: 'Matthew Wong' })).toBeInTheDocument();
  }
  const search = screen.getByRole('searchbox', { name: 'Search team members by name' });
  await user.type(search, '  mAtThEw  ');
  expect(screen.getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Matthew Wong', 'Matthew H']);
  await user.click(screen.getByRole('button', { name: 'Coaching', exact: true }));
  expect(screen.getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(['Matthew Wong']);
  await user.clear(search);
  await user.type(search, 'no-such-member');
  expect(screen.getByText('No team members match your search.')).toBeInTheDocument();
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
});

test('Retired shows six text-only entries with no portrait, initials, profile controls or click action', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam();
  await screen.findByRole('region', { name: 'Leadership' });
  await user.click(screen.getByRole('button', { name: 'Retired', exact: true }));
  const retired = screen.getByRole('region', { name: 'Retired Members' });
  expect(within(retired).getAllByRole('listitem')).toHaveLength(6);
  expect(within(retired).queryByRole('img')).not.toBeInTheDocument();
  expect(within(retired).queryByRole('button')).not.toBeInTheDocument();
  expect(within(retired).queryByRole('link')).not.toBeInTheDocument();
  expect(within(retired).getAllByRole('heading', { level: 3 }).map(node => node.textContent)).toEqual(roster.filter(member => member.categories.includes('retired')).map(member => member.name));
  await user.click(within(retired).getByText('Raul L'));
  await user.keyboard('{Enter}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await user.type(screen.getByRole('searchbox'), 'Raul');
  expect(within(retired).getAllByRole('listitem')).toHaveLength(1);
});

test('a current member card opens their real biography without website or LinkedIn buttons', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam();
  const trigger = await screen.findByRole('button', { name: 'View biography for Adrian Chan' });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Adrian Chan' });
  const member = roster.find(member => member.name === 'Adrian Chan');
  expect(within(dialog).getByText(member.bio)).toBeInTheDocument();
  expect(within(dialog).getByText(member.role)).toBeInTheDocument();
  expect(within(dialog).getByText(member.school)).toBeInTheDocument();
  for (const achievement of member.achievements) expect(within(dialog).getByText(achievement)).toBeInTheDocument();
  expect(within(dialog).getByRole('img', { name: member.name })).toHaveAttribute('src', '/Images/Adrian.jpg');
  expect(within(dialog).queryByRole('link')).not.toBeInTheDocument();
  expect(within(dialog).getAllByRole('button')).toHaveLength(1);
  await user.click(within(dialog).getByRole('button', { name: 'Close biography' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('a biography keeps keyboard focus inside, locks scrolling, and Escape returns to its card', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam();
  const trigger = await screen.findByRole('button', { name: 'View biography for Matthew Wong' });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Matthew Wong' });
  const close = within(dialog).getByRole('button', { name: 'Close biography' });
  expect(close).toHaveFocus();
  expect(document.body.style.overflow).toBe('hidden');
  await user.tab();
  expect(dialog).toContainElement(document.activeElement);
  await user.tab({ shift: true });
  expect(dialog).toContainElement(document.activeElement);
  await user.keyboard('{Escape}');
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
  expect(document.body.style.overflow).not.toBe('hidden');
});

test('current-member hash links open and close the matching biography, while retired hashes do not', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam('#member-matthew-wong');
  const dialog = await screen.findByRole('dialog', { name: 'Matthew Wong' });
  await user.click(within(dialog).getByRole('button', { name: 'Close biography' }));
  expect(window.location.hash).toBe('');
  await user.click(screen.getByRole('button', { name: 'View biography for Adrian Chan' }));
  expect(window.location.hash).toBe('#member-adrian-chan');
  await user.keyboard('{Escape}');
  window.history.replaceState(null, '', '#member-raul-l');
  fireEvent(window, new HashChangeEvent('hashchange'));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('a failed roster request shows a clear error and Retry loads the actual roster', async () => {
  const user = userEvent.setup();
  vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({ ok: false }).mockResolvedValueOnce({ ok: true, json: async () => roster }));
  renderTeam();
  expect(screen.getByRole('status')).toHaveTextContent('Loading our team');
  expect(await screen.findByRole('alert')).toHaveTextContent('We couldn’t load the team.');
  expect(screen.queryByRole('heading', { level: 3 })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Retry' }));
  await screen.findByRole('region', { name: 'Leadership' });
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(29);
});

test('a failed current-member portrait becomes initials while its biography stays accessible', async () => {
  const user = userEvent.setup();
  loadRoster();
  renderTeam();
  const portrait = await screen.findByRole('img', { name: 'Adrian Chan' });
  fireEvent.error(portrait);
  expect(screen.queryByRole('img', { name: 'Adrian Chan', exact: true })).not.toBeInTheDocument();
  expect(screen.getByRole('img', { name: 'Portrait unavailable for Adrian Chan' })).toHaveTextContent('AC');
  await user.click(screen.getByRole('button', { name: 'View biography for Adrian Chan' }));
  expect(screen.getByRole('dialog', { name: 'Adrian Chan' })).toBeInTheDocument();
});

test('malformed profile details show the roster error rather than exposing a broken biography', async () => {
  loadRoster([{ name: 'Invalid profile', categories: ['coaching'], achievements: 'not-a-list' }]);
  renderTeam();
  expect(await screen.findByRole('alert')).toHaveTextContent('We couldn’t load the team.');
  expect(screen.queryByRole('button', { name: 'View biography for Invalid profile' })).not.toBeInTheDocument();
});
