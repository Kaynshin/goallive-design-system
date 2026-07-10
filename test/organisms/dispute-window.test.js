import { describe, it, expect, vi } from 'vitest';
import { createDisputeWindow } from '../../stories/organisms/dispute-window.js';

describe('Organisms / Dispute Window — dispute-window.js', () => {
  it('renders the report title, description, and the flags / total count', () => {
    const win = createDisputeWindow({ flags: 18, total: 26 });
    expect(win.textContent).toContain('non honoré');
    expect(win.querySelector('.gl-dispute-window__flags').textContent).toBe('18');
    expect(win.textContent).toContain('26 contributeurs');
  });

  it('sets the progress fill width from flags / total', () => {
    const win = createDisputeWindow({ flags: 13, total: 26 });
    expect(win.querySelector('.gl-dispute-window__fill').style.width).toBe('50%');
  });

  it('clicking "Signaler" increments the flag count', () => {
    const win = createDisputeWindow({ flags: 10, total: 26 });
    win.querySelector('.gl-dispute-window__flag').click();
    expect(win.getState().flags).toBe(11);
  });

  it('crossing the 60% threshold auto-resolves as "refunded" and emits dispute:resolved', () => {
    const win = createDisputeWindow({ flags: 15, total: 26, threshold: 0.6 });
    const handler = vi.fn();
    win.addEventListener('dispute:resolved', handler);

    win.querySelector('.gl-dispute-window__flag').click();

    expect(win.getState().flags).toBe(16);
    expect(win.getState().resolved).toBe('refunded');
    const result = win.querySelector('.gl-dispute-window__result');
    expect(result.hidden).toBe(false);
    expect(result.textContent).toContain('recrédit automatique');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('clicking "Honoré" resolves the dispute as "honored"', () => {
    const win = createDisputeWindow({ flags: 5, total: 26 });
    win.querySelector('.gl-dispute-window__honor').click();
    expect(win.getState().resolved).toBe('honored');
    expect(win.querySelector('.gl-dispute-window__result').textContent).toContain('honoré');
  });

  it('does not change the resolution once it has already resolved', () => {
    const win = createDisputeWindow({ flags: 5, total: 26 });
    win.querySelector('.gl-dispute-window__honor').click();
    win.querySelector('.gl-dispute-window__flag').click();
    expect(win.getState().resolved).toBe('honored');
    expect(win.getState().flags).toBe(5);
  });
});
