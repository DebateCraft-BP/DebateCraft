import { act, cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import Resources from '../src/components/Resources';
import { frameworkLessons, guideResources, mitigationDifficulties, mitigationGameData, motionBank, practiceMotionBank, videoResources } from '../src/resources/data';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  window.history.replaceState(null, '', '/');
  window.localStorage.clear();
});
const tab = name => screen.getByRole('tab', { name: new RegExp(`^${name}`) });

test('nothing from the legacy resources pages was dropped', () => {
  expect(guideResources).toHaveLength(10);
  expect(videoResources).toHaveLength(11);
  expect(videoResources.filter(video => video.transcript)).toHaveLength(3);
  expect(frameworkLessons.map(lesson => lesson.id)).toEqual(['motion-types', 'wsdc-roles', 'cpr', 'peel', 'stakeholders', 'nile', 'rebuttals', 'pois', 'clashes']);
  expect(motionBank).toHaveLength(20);
  expect(practiceMotionBank).toHaveLength(22);
  expect(Object.keys(mitigationDifficulties)).toEqual(['RECRUIT', 'VETERAN', 'LEGEND']);
  expect(Object.values(mitigationGameData).map(rounds => rounds.length)).toEqual([5, 5, 5]);
  for (const video of videoResources) expect(video.embed).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\//);
});

test('the page keeps its skill-practice gallery and blog cards below the tools', () => {
  render(<Resources />);
  expect(screen.getByRole('heading', { level: 1, name: 'Debate Resource Library' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /Materials That Become Practice/ })).toBeInTheDocument();
  const gallery = screen.getAllByRole('img');
  expect(gallery).toHaveLength(3);
  for (const image of gallery) { expect(image).toHaveAttribute('width'); expect(image).toHaveAttribute('height'); expect(image.alt).not.toBe(''); }
  expect(screen.getByRole('heading', { level: 3, name: 'Why I Debate' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Subscribe/ })).toHaveAttribute('href', 'https://debatecraft.substack.com/subscribe');
});

test('all five tools are reachable by tab, arrow keys and the hash', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  const tabs = screen.getAllByRole('tab');
  expect(tabs.map(item => item.textContent)).toEqual(['GuidesPDF', 'Practice ToolkitTools', 'FrameworksDrills', 'MannerLab', 'Even IfGame']);
  expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
  tabs[0].focus();
  await user.keyboard('{ArrowDown}');
  expect(tabs[1]).toHaveFocus();
  expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
  expect(window.location.hash).toBe('#practice');
  expect(screen.getByRole('heading', { level: 2, name: 'Practice Toolkit' })).toBeInTheDocument();
  await user.keyboard('{End}');
  expect(screen.getByRole('heading', { level: 2, name: 'Even If Mitigation Game' })).toBeInTheDocument();
  await user.keyboard('{ArrowDown}');
  expect(screen.getByRole('heading', { level: 2, name: 'Guides and Video Library' })).toBeInTheDocument();
});

test.each([
  ['#cpr', 'heading', 'CPR Framework'],
  ['#learn', 'heading', 'Understanding Motion Types'],
  ['#mitigation', 'heading', 'Even If Mitigation Game'],
])('old deep link %s still opens the matching tool', (hash, role, name) => {
  window.location.hash = hash;
  render(<Resources />);
  expect(screen.getByRole(role, { name })).toBeInTheDocument();
});

test('guides can be searched and open in a new tab without leaking the opener', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  const links = () => screen.queryAllByRole('link', { name: /^Open Resource/ });
  expect(links()).toHaveLength(10);
  for (const link of links()) { expect(link).toHaveAttribute('target', '_blank'); expect(link).toHaveAttribute('rel', 'noopener noreferrer'); }
  const search = screen.getByRole('searchbox', { name: 'Search guides or videos' });
  await user.type(search, 'closing');
  expect(links()).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 3, name: 'BP Closing Teams Prep' })).toBeInTheDocument();
  await user.clear(search);
  await user.type(search, 'zzzz');
  expect(screen.getByRole('status')).toHaveTextContent('No guides match your search.');
});

test('videos play from a privacy-friendly embed and rounds link to their transcripts', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  await user.click(screen.getByRole('button', { name: 'Videos' }));
  expect(screen.getByTitle('Burdens of Proof')).toHaveAttribute('src', expect.stringContaining('youtube-nocookie.com/embed/gihbX8zt8kM'));
  await user.click(screen.getByRole('button', { name: /WSDC 2025 Grand Final/ }));
  expect(screen.getByTitle('WSDC 2025 Grand Final')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /^Read Transcript/ })).toHaveAttribute('href', expect.stringContaining('debating404.com'));
  await user.type(screen.getByRole('searchbox', { name: 'Search guides or videos' }), 'zzzz');
  expect(screen.getByRole('status')).toHaveTextContent('No videos match your search.');
});

test('framework drills reveal answers, deep-link each lesson and generate motions by difficulty', async () => {
  const user = userEvent.setup();
  vi.spyOn(Math, 'random').mockReturnValue(0);
  render(<Resources />);
  await user.click(tab('Frameworks'));
  expect(screen.getAllByRole('button', { name: /Show Answer/ })[0]).toHaveAttribute('aria-expanded', 'false');
  await user.click(screen.getByRole('button', { name: 'CPR Framework' }));
  expect(window.location.hash).toBe('#cpr');
  expect(screen.getByRole('heading', { level: 3, name: 'CPR Framework' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Show Answer' }));
  expect(screen.getByRole('button', { name: 'Hide Answer' })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(/Context: online records are permanent and searchable/)).toBeInTheDocument();
  await user.selectOptions(screen.getByRole('combobox', { name: 'Motion difficulty' }), 'Hard');
  await user.click(screen.getByRole('button', { name: 'Generate Motion' }));
  expect(screen.getByText('THW replace trial by jury with trial by professional judges.')).toBeInTheDocument();
});

test('the manner lab changes advice with the sliders, archetypes and emphasised word', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  await user.click(tab('Manner'));
  await user.click(screen.getByRole('button', { name: 'cooking' }));
  expect(screen.getByText('The praise is for this specific skill, not every quality she has.')).toBeInTheDocument();
  const [spectrumSlider] = screen.getAllByRole('slider', { name: 'Volume' });
  fireEvent.change(spectrumSlider, { target: { value: '5' } });
  expect(spectrumSlider).toHaveAttribute('aria-valuetext', 'Yelling');
  await user.click(screen.getByRole('button', { name: 'Boring Professor' }));
  expect(screen.getByText('Monotone delivery can lose attention quickly.')).toBeInTheDocument();
});

test('the motion bank filters, favorites persist and a motion carries into prep notes', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  await user.click(tab('Practice'));
  expect(document.querySelectorAll('.motion-card')).toHaveLength(22);
  await user.selectOptions(screen.getByRole('combobox', { name: 'Format' }), 'Bioethics');
  expect(document.querySelectorAll('.motion-card')).toHaveLength(2);
  await user.click(screen.getAllByRole('button', { name: 'Favorite' })[0]);
  expect(screen.getByRole('button', { name: 'Saved' })).toHaveAttribute('aria-pressed', 'true');
  expect(JSON.parse(window.localStorage.getItem('dcPracticeFavorites:v1'))).toEqual(['m17']);
  await user.click(screen.getAllByRole('button', { name: 'Use in Prep' })[0]);
  expect(screen.getByRole('tab', { name: 'Prep Workspace' })).toHaveAttribute('aria-selected', 'true');
  expect(screen.getByRole('textbox', { name: 'Motion' })).toHaveValue('THW allow parents to genetically enhance their unborn children.');
  expect(screen.getByRole('combobox', { name: 'Format' })).toHaveValue('WSDC');
  await user.type(screen.getByRole('textbox', { name: 'Context' }), 'Embryo screening exists today.');
  expect(JSON.parse(window.localStorage.getItem('dcPracticeDrafts:v1')).context).toBe('Embryo screening exists today.');
});

test('prep notes can be copied and the toolkit clears only after confirmation', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  await user.click(tab('Practice'));
  await user.click(screen.getAllByRole('button', { name: 'Favorite' })[0]);
  await user.click(screen.getByRole('tab', { name: 'Prep Workspace' }));
  await user.type(screen.getByRole('textbox', { name: 'Model' }), 'Ban by 2030.');
  const copy = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
  await user.click(screen.getByRole('button', { name: 'Copy Notes' }));
  expect(copy).toHaveBeenCalledWith(expect.stringMatching(/^Motion: THW ban zoos\.[\s\S]*Model: Ban by 2030\./));
  expect(await screen.findByRole('status')).toHaveTextContent('Copied to clipboard');
  const confirm = vi.spyOn(window, 'confirm').mockReturnValueOnce(false).mockReturnValueOnce(true);
  await user.click(screen.getByRole('button', { name: 'Clear toolkit data' }));
  expect(screen.getByRole('textbox', { name: 'Model' })).toHaveValue('Ban by 2030.');
  await user.click(screen.getByRole('button', { name: 'Clear toolkit data' }));
  expect(confirm).toHaveBeenCalledTimes(2);
  expect(screen.getByRole('textbox', { name: 'Model' })).toHaveValue('');
  expect(JSON.parse(window.localStorage.getItem('dcPracticeFavorites:v1'))).toEqual([]);
});

test('the speech timer protects the first minute, opens POIs, pauses and resets', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(<Resources />);
  await user.click(tab('Practice'));
  await user.click(screen.getByRole('tab', { name: 'Speech Timer' }));
  expect(screen.getByRole('timer')).toHaveTextContent('05:00');
  expect(screen.getByText('Protected time')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Start' }));
  await act(async () => { vi.advanceTimersByTime(61000); });
  expect(screen.getByRole('timer')).toHaveTextContent('03:59');
  expect(screen.getByText('POI window open')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Pause' }));
  await act(async () => { vi.advanceTimersByTime(10000); });
  expect(screen.getByRole('timer')).toHaveTextContent('03:59');
  await user.click(screen.getByRole('button', { name: 'Reset' }));
  expect(screen.getByRole('timer')).toHaveTextContent('05:00');
  await user.click(screen.getByRole('button', { name: 'Custom' }));
  expect(screen.getByRole('spinbutton', { name: 'Custom minutes' })).toHaveValue(4);
  expect(screen.getByRole('timer')).toHaveTextContent('04:00');
});

const optionsFor = argument => Object.values(mitigationGameData).flat().find(item => item.t === argument).o;
const currentArgument = () => document.querySelector('.game-argument h3').textContent;

test('the Even If game scores turns, penalises traps and ends when the defence collapses', async () => {
  const user = userEvent.setup();
  render(<Resources />);
  await user.click(tab('Even If'));
  const turn = optionsFor(currentArgument()).find(option => option.type === 'TURN').text;
  await user.click(screen.getByRole('button', { name: turn }));
  expect(screen.getByRole('status')).toHaveTextContent('CRITICAL HIT');
  expect(screen.getByRole('status')).toHaveTextContent(/\+\d[\d,]* points/);
  await user.click(screen.getByRole('button', { name: 'Next Round' }));
  expect(screen.getByText('2/5')).toBeInTheDocument();
  for (let strike = 1; strike <= 4; strike += 1) {
    const trap = optionsFor(currentArgument()).find(option => option.type === 'TRAP').text;
    await user.click(screen.getByRole('button', { name: trap }));
    if (strike < 4) {
      expect(screen.getByRole('status')).toHaveTextContent('BREACHED');
      expect(screen.getByText(`${100 - strike * 25}%`)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Next Round' }));
    }
  }
  expect(screen.getByRole('heading', { level: 3, name: 'Try Again' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Restart' }));
  expect(screen.getByText('100%')).toBeInTheDocument();
  expect(screen.getByText('1/5')).toBeInTheDocument();
});

test('running out of time in the Even If game counts as a breach', async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  render(<Resources />);
  await user.click(tab('Even If'));
  await act(async () => { vi.advanceTimersByTime(30000); });
  expect(screen.getByRole('status')).toHaveTextContent('You need a direct response before the timer expires.');
  expect(screen.getByText('75%')).toBeInTheDocument();
  const hud = within(screen.getByText('Timer').closest('.hud-card'));
  expect(hud.getByText('0s')).toBeInTheDocument();
});
