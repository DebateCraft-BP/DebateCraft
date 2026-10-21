import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
import Newsletter from '../src/components/Newsletter';

test('the newsletter rejects malformed email and honestly reports unavailable delivery without a network request', async () => {
  const user = userEvent.setup();
  const network = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Unexpected network request'));
  try {
    render(<Newsletter />);
    const email = screen.getByRole('textbox', { name: 'Email address' });
    await user.type(email, 'invalid');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(email).toBeInvalid();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    await user.clear(email);
    await user.type(email, 'reader@example.com');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByRole('status')).toHaveTextContent('Newsletter signup is unavailable in this preview.');
    expect(network).not.toHaveBeenCalled();
  } finally { network.mockRestore(); }
});
