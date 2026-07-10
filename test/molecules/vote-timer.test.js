import { describe, it, expect } from 'vitest';
import VoteTimerMeta, { Playground, Closed } from '../../stories/molecules/VoteTimer.stories.js';

describe('Molecules / Vote Timer', () => {
  it('renders the remaining seconds and the "VOTE OUVERT" badge when open', () => {
    const html = Playground.render(VoteTimerMeta.args);
    expect(html).toContain('42');
    expect(html).toContain('VOTE OUVERT');
    expect(html).toContain('gl-live-dot gl-live-dot--sm');
  });

  it('renders "VOTE FERMÉ" when open is false', () => {
    const html = Closed.render(VoteTimerMeta.args);
    expect(html).toContain('VOTE FERMÉ');
    expect(html).not.toContain('VOTE OUVERT');
  });

  it('updates the displayed seconds', () => {
    const html = Playground.render({ ...VoteTimerMeta.args, seconds: 7 });
    expect(html).toContain('gl-vote-timer__seconds');
    expect(html).toContain('>7<');
  });
});
