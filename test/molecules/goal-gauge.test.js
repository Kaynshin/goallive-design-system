import { describe, it, expect, vi } from 'vitest';
import { createGoalGauge } from '../../stories/molecules/goal-gauge.js';

describe('Molecules / Goal Gauge — goal-gauge.js', () => {
  it('renders the label, caption, and initial current/target counters', () => {
    const gauge = createGoalGauge({ current: 40, target: 200, label: 'GOAL EN COURS', caption: 'Speedrun World 1' });
    expect(gauge.classList.contains('gl-goalgauge')).toBe(true);
    expect(gauge.querySelector('.gl-goalgauge__label').textContent).toBe('GOAL EN COURS');
    expect(gauge.querySelector('.gl-goalgauge__caption').textContent).toBe('Speedrun World 1');
    expect(gauge.querySelector('.gl-goalgauge__count-current').textContent).toBe('40');
    expect(gauge.querySelector('.gl-goalgauge__count-target').textContent).toBe('200');
  });

  it('omits the caption element when no caption is provided', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    expect(gauge.querySelector('.gl-goalgauge__caption')).toBeNull();
  });

  it('sets the fill width proportional to current / target', () => {
    const gauge = createGoalGauge({ current: 50, target: 200 });
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('25%');
  });

  it('clamps the fill width at 100% when current exceeds target', () => {
    const gauge = createGoalGauge({ current: 500, target: 200 });
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('100%');
  });

  it('.setCurrent updates the fill width and the counter', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    gauge.setCurrent(30);
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('30%');
    expect(gauge.querySelector('.gl-goalgauge__count-current').textContent).toBe('30');
  });

  it('.setCurrent reveals the "GOAL UNLOCKED · GO ALIVE" banner once the target is reached', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    const unlocked = gauge.querySelector('.gl-goalgauge__unlocked');
    expect(unlocked.hidden).toBe(true);

    gauge.setCurrent(100);

    expect(unlocked.hidden).toBe(false);
    expect(gauge.classList.contains('gl-goalgauge--unlocked')).toBe(true);
    expect(unlocked.textContent).toContain('GOAL UNLOCKED');
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

  it('applies the near-target glow class once the fill crosses 85%, but not once unlocked', () => {
    const gauge = createGoalGauge({ current: 0, target: 100 });
    gauge.setCurrent(90);
    expect(gauge.classList.contains('gl-goalgauge--near')).toBe(true);
    gauge.setCurrent(100);
    expect(gauge.classList.contains('gl-goalgauge--near')).toBe(false);
  });

  it('.setStatus("failed") marks the gauge as failed and it sticks across .setCurrent', () => {
    const gauge = createGoalGauge({ current: 40, target: 100 });
    gauge.setStatus('failed');
    expect(gauge.classList.contains('gl-goalgauge--failed')).toBe(true);

    gauge.setCurrent(50);
    expect(gauge.classList.contains('gl-goalgauge--failed')).toBe(true);
    expect(gauge.classList.contains('gl-goalgauge--unlocked')).toBe(false);
  });

  it('.setTarget updates the target counter and re-derives the fill width', () => {
    const gauge = createGoalGauge({ current: 50, target: 100 });
    gauge.setTarget(200);
    expect(gauge.querySelector('.gl-goalgauge__count-target').textContent).toBe('200');
    expect(gauge.querySelector('.gl-goalgauge__fill').style.width).toBe('25%');
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
});
