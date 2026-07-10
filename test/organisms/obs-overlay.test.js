import { describe, it, expect } from 'vitest';
import { createOBSOverlay } from '../../stories/organisms/obs-overlay.js';

describe('Organisms / OBS Overlay — obs-overlay.js', () => {
  it('renders the "EN DIRECT" badge and the last support caption', () => {
    const overlay = createOBSOverlay({ lastSupport: '« plus 25 » · Korrigan_TV' });
    expect(overlay.querySelector('.gl-obs-overlay__live').textContent).toContain('EN DIRECT');
    expect(overlay.querySelector('.gl-obs-overlay__mic').textContent).toContain('Korrigan_TV');
  });

  it('mounts a GoalGauge sub-component labelled "GOAL EN DIRECT"', () => {
    const overlay = createOBSOverlay({ current: 80, target: 250, challenge: 'Speedrun World 1' });
    const gauge = overlay.querySelector('.gl-goalgauge');
    expect(gauge).not.toBeNull();
    expect(gauge.querySelector('.gl-goalgauge__label').textContent).toBe('GOAL EN DIRECT');
    expect(gauge.querySelector('.gl-goalgauge__caption').textContent).toBe('Speedrun World 1');
  });

  it('hides the "GOAL UNLOCKED · GO ALIVE" banner until the gauge reaches its target', () => {
    const overlay = createOBSOverlay({ current: 0, target: 100 });
    const banner = overlay.querySelector('.gl-obs-overlay__unlocked');
    expect(banner.hidden).toBe(true);

    overlay.gauge.setCurrent(100);

    expect(banner.hidden).toBe(false);
    expect(banner.textContent).toContain('GOAL UNLOCKED');
    expect(banner.textContent).toContain('GO ALIVE');
  });
});
