import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import CookieConsent from '../src/components/CookieConsent';

test('a visitor selects analytics consent and their saved choice survives a new visit', async () => {
  const user = userEvent.setup();
  const { unmount } = render(<CookieConsent />);
  await user.click(screen.getByRole('button', { name: 'Manage Cookies' }));
  const settings = screen.getByRole('dialog', { name: 'Manage Cookies' });
  expect(within(settings).getByRole('checkbox', { name: 'Required (Always Active)' })).toBeChecked();
  expect(within(settings).getByRole('checkbox', { name: 'Required (Always Active)' })).toBeDisabled();
  await user.click(within(settings).getByRole('checkbox', { name: 'Analytics' }));
  await user.click(within(settings).getByRole('button', { name: 'Allow Selected' }));
  expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument();
  unmount();
  render(<CookieConsent />);
  expect(screen.queryByRole('region', { name: 'Cookie consent' })).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Cookie preferences' }));
  expect(screen.getByRole('checkbox', { name: 'Analytics' })).toBeChecked();
});
