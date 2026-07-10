import './goal-gauge.css';
import { createGoalGauge } from './goal-gauge.js';

/**
 * Molecules / Goal Gauge — `.gl-goalgauge`, Goallive's signature component
 * (section `#signatures` / `#molecules` of "Goallive Design System
 * (standalone).html"). A pill bar that fills with signal as the community
 * supports a challenge in tokens, with a live current/target counter and a
 * "GOAL UNLOCKED · GO ALIVE" banner once the target is reached.
 */
export default {
  title: 'Molecules/Goal Gauge',
  parameters: { layout: 'padded' },
  argTypes: {
    current: { control: { type: 'range', min: 0, max: 400, step: 5 } },
    target: { control: { type: 'range', min: 50, max: 400, step: 10 } },
    label: { control: 'text' },
    caption: { control: 'text' },
  },
  args: {
    current: 120,
    target: 300,
    label: 'GOAL EN COURS',
    caption: 'Speedrun World 1 en moins de 4 min',
  },
};

export const Playground = {
  render: ({ current, target, label, caption }) => {
    const gauge = createGoalGauge({ current, target, label, caption });
    gauge.style.maxWidth = '520px';
    return gauge;
  },
};

export const Unlocked = {
  argTypes: { current: { control: false }, target: { control: false } },
  render: ({ label, caption }) => {
    const gauge = createGoalGauge({ current: 300, target: 300, label, caption });
    gauge.style.maxWidth = '520px';
    return gauge;
  },
};

/**
 * Reproduces the "Jauge de goal · soutien en direct" demo card from
 * `#signatures`: +5 / +10 / +25 / +50 support buttons, a reset, and the
 * "GOAL UNLOCKED · GO ALIVE" banner sliding in once the target is reached.
 */
export const SupportDemo = {
  argTypes: { current: { control: false } },
  render: ({ target, label, caption }) => {
    const wrapper = document.createElement('div');
    wrapper.style.maxWidth = '520px';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '20px';

    const gauge = createGoalGauge({ current: 0, target, label, caption });
    wrapper.appendChild(gauge);

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.flexWrap = 'wrap';
    controls.style.gap = '10px';
    controls.style.alignItems = 'center';

    [5, 10, 25, 50].forEach((amount, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = i === 0 ? 'gl-btn gl-btn--primary gl-btn--sm' : 'gl-btn gl-btn--ghost gl-btn--sm';
      btn.textContent = `+${amount}`;
      btn.addEventListener('click', () => {
        gauge.setCurrent(gauge.getState().current + amount);
      });
      controls.appendChild(btn);
    });

    const reset = document.createElement('button');
    reset.type = 'button';
    reset.className = 'gl-btn gl-btn--link';
    reset.style.marginLeft = 'auto';
    reset.textContent = '↺ reset';
    reset.addEventListener('click', () => gauge.setCurrent(0));
    controls.appendChild(reset);

    wrapper.appendChild(controls);
    return wrapper;
  },
};
