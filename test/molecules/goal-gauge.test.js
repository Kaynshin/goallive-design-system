import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createGoalGauge } from '../../src/goal-gauge.js';

describe('Molecules / Goal Gauge — goal-gauge.js', () => {
  it('renders the label, caption, and initial current/target counters', () => {
    const gauge = createGoalGauge({ current: 40, target: 200, label: 'GOAL EN COURS', caption: 'Speedrun World 1' });
    expect(gauge.classList.contains('gl-goalgauge')).toBe(true);
    expect(gauge.querySelector('.gl-goalgauge__label').textContent).toBe('GOAL EN COURS');
    expect(gauge.querySelector('.gl-goalgauge__caption').textContent).toBe('Speedrun World 1');
    // The current-value counter is a RollingNumber odometer, not plain text:
    // its aria-label mirrors the formatted value, and `.value` is the live number.
    expect(gauge.querySelector('.gl-goalgauge__count-current').getAttribute('aria-label')).toBe('40');
    expect(gauge.querySelector('.gl-goalgauge__count-current').value).toBe(40);
    expect(gauge.querySelector('.gl-goalgauge__count-target').textContent).toBe('/ 200 tok');
  });

  it('renders an empty caption (still present in the DOM) when none is provided', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    const caption = gauge.querySelector('.gl-goalgauge__caption');
    expect(caption).not.toBeNull();
    expect(caption.textContent).toBe('');
  });

  it('.setCaption updates the caption text', () => {
    const gauge = createGoalGauge({ current: 0, target: 100, caption: 'Ancien titre' });
    gauge.setCaption('Nouveau titre du défi');
    expect(gauge.querySelector('.gl-goalgauge__caption').textContent).toBe('Nouveau titre du défi');
  });

  it('sets the fill width proportional to current / target', () => {
    const gauge = createGoalGauge({ current: 50, target: 200 });
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('25%');
  });

  it('clamps the fill width at 100% when current exceeds target', () => {
    const gauge = createGoalGauge({ current: 500, target: 200 });
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('100%');
  });

  it('.setCurrent updates the fill width and the RollingNumber counter', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    gauge.setCurrent(30);
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('30%');
    expect(gauge.querySelector('.gl-goalgauge__count-current').value).toBe(30);
  });

  it('the RollingNumber counter is colored with the --gl-color-signal token, never a hard-coded hex', () => {
    const gauge = createGoalGauge({ current: 10, target: 100 });
    const counter = gauge.querySelector('.gl-goalgauge__count-current');
    expect(counter.style.color).toContain('var(--gl-color-signal');
  });

  it('.setCurrent reveals the "GOAL ATTEINT · GO ALIVE" line once the target is reached', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    const unlocked = gauge.querySelector('.gl-goalgauge__unlocked');
    expect(unlocked.hidden).toBe(true);

    gauge.setCurrent(100);

    expect(unlocked.hidden).toBe(false);
    expect(gauge.classList.contains('gl-goalgauge--unlocked')).toBe(true);
    expect(unlocked.textContent).toContain('GOAL ATTEINT');
    expect(unlocked.textContent).toContain('GO ALIVE');
  });

  it('emits a "goalgauge:unlocked" event exactly once when crossing the target', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    const handler = vi.fn();
    gauge.addEventListener('goalgauge:unlocked', handler);

    gauge.setCurrent(60);
    expect(handler).not.toHaveBeenCalled();

    gauge.setCurrent(100);
    expect(handler).toHaveBeenCalledTimes(1);

    gauge.setCurrent(120);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('applies the near-target glow class once the fill crosses 80%, including once unlocked', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    gauge.setCurrent(85);
    expect(gauge.classList.contains('gl-goalgauge--near')).toBe(true);
    gauge.setCurrent(100);
    expect(gauge.classList.contains('gl-goalgauge--near')).toBe(true);
  });

  it('.setStatus("failed") marks the gauge as failed and it sticks across .setCurrent, clearing the glow', () => {
    const gauge = createGoalGauge({ current: 40, target: 100 });
    gauge.setStatus('failed');
    expect(gauge.classList.contains('gl-goalgauge--failed')).toBe(true);

    gauge.setCurrent(90);
    expect(gauge.classList.contains('gl-goalgauge--failed')).toBe(true);
    expect(gauge.classList.contains('gl-goalgauge--unlocked')).toBe(false);
    expect(gauge.classList.contains('gl-goalgauge--near')).toBe(false);
  });

  it('.setTarget updates the target counter and re-derives the fill width', () => {
    const gauge = createGoalGauge({ current: 50, target: 100 });
    gauge.setTarget(200);
    expect(gauge.querySelector('.gl-goalgauge__count-target').textContent).toBe('/ 200 tok');
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('25%');
  });

  it('accepts a custom track height via the `height` option', () => {
    const gauge = createGoalGauge({ current: 10, target: 100, height: 24 });
    expect(gauge.querySelector('.gl-goalgauge__track').style.height).toBe('24px');
  });

  it('defaults the track height to 18px', () => {
    const gauge = createGoalGauge({ current: 10, target: 100 });
    expect(gauge.querySelector('.gl-goalgauge__track').style.height).toBe('18px');
  });

  it('exposes an aria progressbar wired to current/target', () => {
    const gauge = createGoalGauge({ current: 30, target: 120, label: 'GOAL' });
    const track = gauge.querySelector('[role="progressbar"]');
    expect(track.getAttribute('aria-valuemax')).toBe('120');
    expect(track.getAttribute('aria-valuenow')).toBe('30');
    expect(track.getAttribute('aria-label')).toBe('GOAL');
  });

  it('.getState returns a snapshot, not a live reference', () => {
    const gauge = createGoalGauge({ current: 10, target: 100 });
    const snapshot = gauge.getState();
    gauge.setCurrent(50);
    expect(snapshot.current).toBe(10);
    expect(gauge.getState().current).toBe(50);
  });

  describe('bump animation', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('bumps the track scale on increment, then settles back to scale(1) after ~220ms', () => {
      const gauge = createGoalGauge({ current: 0, target: 100 });
      const track = gauge.querySelector('.gl-goalgauge__track');

      gauge.setCurrent(10);
      expect(track.style.transform).toBe('scale(1.018)');

      vi.advanceTimersByTime(220);
      expect(track.style.transform).toBe('scale(1)');
    });

    it('does not bump when prefers-reduced-motion is set', () => {
      const gauge = createGoalGauge({ current: 0, target: 100 });
      const track = gauge.querySelector('.gl-goalgauge__track');
      const originalMatchMedia = window.matchMedia;
      window.matchMedia = (query) => ({ matches: true, media: query });
      try {
        gauge.setCurrent(10);
        expect(track.style.transform).toBe('');
      } finally {
        window.matchMedia = originalMatchMedia;
      }
    });
  });
});
