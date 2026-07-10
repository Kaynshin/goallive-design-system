import { describe, it, expect, vi } from 'vitest';
import { createCreatorDashboard } from '../../stories/organisms/creator-dashboard.js';

describe('Organisms / Creator Dashboard — creator-dashboard.js', () => {
  it('renders the session stats (gains, honored challenges, participation rate)', () => {
    const dashboard = createCreatorDashboard({ gains: 142, honored: '3 / 3', participation: 72 });
    expect(dashboard.querySelector('.gl-creator-dashboard__gains').textContent).toBe('142');
    expect(dashboard.textContent).toContain('3 / 3');
    expect(dashboard.textContent).toContain('72%');
  });

  it('pre-fills the propose form with the given title and target', () => {
    const dashboard = createCreatorDashboard({ proposedTitle: 'Battre le boss final', proposedTarget: 250 });
    expect(dashboard.querySelector('.gl-creator-dashboard__title-input').value).toBe('Battre le boss final');
    expect(dashboard.querySelector('.gl-creator-dashboard__target-input').value).toBe('250');
  });

  it('renders one row per queued challenge with its status', () => {
    const dashboard = createCreatorDashboard({
      queue: [
        { title: 'Parler en anglais 10 min', author: 'Maelyz', status: 'modéré' },
        { title: "No-hit jusqu'au check 3", author: 'Vortakk', status: 'en attente' },
      ],
    });
    const rows = dashboard.querySelectorAll('.gl-creator-dashboard__queue-row');
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain('Parler en anglais 10 min');
    expect(rows[0].textContent).toContain('Maelyz');
    expect(rows[0].querySelector('.gl-creator-dashboard__queue-status--moderated')).not.toBeNull();
    expect(rows[1].querySelector('.gl-creator-dashboard__queue-status--pending')).not.toBeNull();
  });

  it('submitting the propose form pushes a new "modéré" row onto the queue and emits dashboard:submit', () => {
    const dashboard = createCreatorDashboard({ queue: [] });
    const handler = vi.fn();
    dashboard.addEventListener('dashboard:submit', handler);

    dashboard.querySelector('.gl-creator-dashboard__title-input').value = 'Nouveau défi';
    dashboard.querySelector('.gl-creator-dashboard__submit').click();

    expect(dashboard.getQueue()).toHaveLength(1);
    expect(dashboard.getQueue()[0].title).toBe('Nouveau défi');
    expect(dashboard.getQueue()[0].status).toBe('modéré');
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
