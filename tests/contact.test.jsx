import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import Contact from '../src/components/Contact';

const ACCESS_KEY = '03926511-dade-45aa-9d38-40147f166d96';
afterEach(() => vi.restoreAllMocks());

async function fillForm(user) {
  await user.type(screen.getByRole('textbox', { name: /first name/i }), 'Ada');
  await user.type(screen.getByRole('textbox', { name: /last name/i }), 'Lovelace');
  await user.type(screen.getByRole('textbox', { name: /email address/i }), 'ada@example.com');
  await user.type(screen.getByRole('textbox', { name: /organization/i }), 'Analytical School');
  await user.type(screen.getByRole('textbox', { name: /your message/i }), 'We would like a workshop.');
}

test('the contact page leads with a DebateCraft heading and never mentions another organization', () => {
  render(<Contact />);
  expect(screen.getByRole('heading', { level: 1, name: 'Send us a message' })).toBeInTheDocument();
  expect(document.body).toHaveTextContent('We appreciate your interest in DebateCraft.');
  expect(document.body).not.toHaveTextContent(/Hejl/i);
  expect(screen.getByRole('link', { name: 'info@debatecraft.org' })).toHaveAttribute('href', 'mailto:info@debatecraft.org');
});

test('a visitor sends a message through Web3Forms and is told it was delivered', async () => {
  const user = userEvent.setup();
  const network = vi.spyOn(globalThis, 'fetch').mockResolvedValue({ json: async () => ({ success: true }) });
  render(<Contact />);
  await fillForm(user);
  await user.click(screen.getByRole('button', { name: 'Send message' }));

  expect(network).toHaveBeenCalledTimes(1);
  const [url, init] = network.mock.calls[0];
  expect(url).toBe('https://api.web3forms.com/submit');
  expect(init.method).toBe('POST');
  expect(init.body.get('access_key')).toBe(ACCESS_KEY);
  expect(init.body.get('name')).toBe('Ada Lovelace');
  expect(init.body.get('email')).toBe('ada@example.com');
  expect(init.body.get('organization')).toBe('Analytical School');
  expect(init.body.get('message')).toBe('We would like a workshop.');
  expect(init.body.get('subject')).toMatch(/DebateCraft/);

  expect(await screen.findByRole('status')).toHaveTextContent('Thank you. Your message has been sent');
  expect(screen.getByRole('textbox', { name: /first name/i })).toHaveValue('');
});

test('required fields and email format are checked before anything is sent', async () => {
  const user = userEvent.setup();
  const network = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected network request'));
  render(<Contact />);
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByRole('textbox', { name: /first name/i })).toBeInvalid();
  expect(screen.getByRole('textbox', { name: /your message/i })).toBeInvalid();
  expect(screen.getByRole('textbox', { name: /organization/i })).toBeValid();
  await user.type(screen.getByRole('textbox', { name: /email address/i }), 'not-an-email');
  expect(screen.getByRole('textbox', { name: /email address/i })).toBeInvalid();
  expect(network).not.toHaveBeenCalled();
});

test.each([
  ['Web3Forms rejects the submission', () => vi.spyOn(globalThis, 'fetch').mockResolvedValue({ json: async () => ({ success: false, message: 'Invalid key' }) })],
  ['the network is unreachable', () => vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'))],
])('when %s the visitor keeps their text and is shown a direct email fallback', async (_name, arrange) => {
  const user = userEvent.setup();
  arrange();
  render(<Contact />);
  await fillForm(user);
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(await screen.findByRole('alert')).toHaveTextContent('We couldn’t send your message. Please try again, or email info@debatecraft.org.');
  expect(screen.getByRole('textbox', { name: /your message/i })).toHaveValue('We would like a workshop.');
  expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();
  expect(screen.queryByRole('status')).not.toBeInTheDocument();
});

test('the button is disabled while a message is in flight so it cannot be sent twice', async () => {
  const user = userEvent.setup();
  let finish;
  vi.spyOn(globalThis, 'fetch').mockReturnValue(new Promise(resolve => { finish = resolve; }));
  render(<Contact />);
  await fillForm(user);
  await user.click(screen.getByRole('button', { name: 'Send message' }));
  expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
  finish({ json: async () => ({ success: true }) });
  expect(await screen.findByRole('status')).toBeInTheDocument();
});
