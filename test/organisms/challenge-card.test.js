import { describe, it, expect } from 'vitest';
import { createChallengeCard } from '../../stories/organisms/challenge-card.js';

describe('Organisms / Challenge Card — challenge-card.js', () => {
  it('renders the status and tier tags, the title, and the description', () => {
    const card = createChallengeCard({
      status: 'Actif',
      tier: 'Épique · SUB',
      title: 'Finir le Nightmare sans checkpoint',
      description: 'Une seule run, zéro mort.',
    });
    expect(card.classList.contains('gl-challenge-card')).toBe(true);
    const tags = card.querySelectorAll('.gl-challenge-card__tags .gl-tag');
    expect(tags).toHaveLength(2);
    expect(tags[0].textContent).toBe('Actif');
    expect(tags[1].textContent).toBe('Épique · SUB');
    expect(card.querySelector('.gl-challenge-card__title').textContent).toBe('Finir le Nightmare sans checkpoint');
    expect(card.querySelector('.gl-challenge-card__desc').textContent).toBe('Une seule run, zéro mort.');
  });

  it('mounts a GoalGauge sub-component sized to current/target', () => {
    const card = createChallengeCard({ current: 60, target: 200 });
    const gauge = card.querySelector('.gl-goalgauge');
    expect(gauge).not.toBeNull();
    expect(gauge.querySelector('.gl-goalgauge__count-current').textContent).toBe('60');
    expect(gauge.querySelector('.gl-goalgauge__count-target').textContent).toBe('200');
  });

  it('renders the support and share action buttons', () => {
    const card = createChallengeCard({ supportAmount: 25 });
    const support = card.querySelector('.gl-challenge-card__support');
    expect(support.textContent).toContain('Soutenir');
    expect(support.textContent).toContain('+25');
    const buttons = card.querySelectorAll('.gl-challenge-card__actions button');
    expect(buttons).toHaveLength(2);
    expect(buttons[1].textContent).toBe('Partager');
  });

  it('clicking "Soutenir" bids the configured amount onto the embedded gauge', () => {
    const card = createChallengeCard({ current: 100, target: 300, supportAmount: 25 });
    expect(card.gauge.getState().current).toBe(100);
    card.querySelector('.gl-challenge-card__support').click();
    expect(card.gauge.getState().current).toBe(125);
  });
});
