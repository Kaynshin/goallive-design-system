import { describe, it, expect, vi } from 'vitest';
import { createVotePanel } from '../../stories/organisms/vote-panel.js';

describe('Organisms / Vote Panel — vote-panel.js', () => {
  it('renders the question, countdown, and one option row per challenge', () => {
    const panel = createVotePanel({ question: 'Quel défi ?', countdown: 30 });
    expect(panel.querySelector('.gl-vote-panel__question').textContent).toBe('Quel défi ?');
    expect(panel.querySelector('.gl-vote-panel__seconds').textContent).toBe('30');
    expect(panel.querySelectorAll('.gl-vote-panel__option')).toHaveLength(3);
  });

  it('renders the sub weight in the hint and the submit button', () => {
    const panel = createVotePanel({ subWeight: 2 });
    expect(panel.querySelector('.gl-vote-panel__weight').textContent).toBe('2');
    expect(panel.querySelector('.gl-vote-panel__submit').hidden).toBe(false);
    expect(panel.querySelector('.gl-vote-panel__confirm').hidden).toBe(true);
  });

  it('clicking an option selects it and clears the previous selection', () => {
    const panel = createVotePanel();
    const [first, second] = panel.querySelectorAll('.gl-vote-panel__option');
    first.click();
    expect(first.classList.contains('gl-vote-panel__option--selected')).toBe(true);
    second.click();
    expect(first.classList.contains('gl-vote-panel__option--selected')).toBe(false);
    expect(second.classList.contains('gl-vote-panel__option--selected')).toBe(true);
  });

  it('clicking "Voter" without a selection does nothing', () => {
    const panel = createVotePanel();
    panel.querySelector('.gl-vote-panel__submit').click();
    expect(panel.getState().voted).toBe(false);
    expect(panel.querySelector('.gl-vote-panel__confirm').hidden).toBe(true);
  });

  it('selecting an option then voting reveals the confirmation and hides the submit button', () => {
    const panel = createVotePanel();
    const handler = vi.fn();
    panel.addEventListener('votepanel:voted', handler);

    panel.querySelectorAll('.gl-vote-panel__option')[0].click();
    panel.querySelector('.gl-vote-panel__submit').click();

    expect(panel.getState().voted).toBe(true);
    expect(panel.querySelector('.gl-vote-panel__submit').hidden).toBe(true);
    expect(panel.querySelector('.gl-vote-panel__confirm').hidden).toBe(false);
    expect(panel.querySelector('.gl-vote-panel__confirm').textContent).toContain('pondéré');
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('accepts a custom set of challenges', () => {
    const panel = createVotePanel({
      voteOptions: [
        { id: 'a', label: 'Défi A', percent: 70 },
        { id: 'b', label: 'Défi B', percent: 30 },
      ],
    });
    expect(panel.querySelectorAll('.gl-vote-panel__option')).toHaveLength(2);
    expect(panel.textContent).toContain('Défi A');
    expect(panel.textContent).toContain('Défi B');
  });
});
