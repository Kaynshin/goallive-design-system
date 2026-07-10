import './atoms.css';
import { createRollingNumber } from './rolling-number.js';

/**
 * Atoms / RollingNumber — compteur roulant signature (odomètre vertical).
 * Chaque chiffre roule verticalement, stagger 28ms — voir stories/atoms/rolling-number.js.
 * Respecte `prefers-reduced-motion` (état final instantané).
 */
export default {
  title: 'Atoms/RollingNumber',
  parameters: { layout: 'padded' },
  argTypes: {
    value: { control: 'number' },
    fontSize: { control: { type: 'range', min: 16, max: 64, step: 2 } },
    color: { control: 'select', options: ['signal', 'text'] },
  },
  args: {
    value: 1240,
    fontSize: 38,
    color: 'signal',
  },
};

function colorVar(name) {
  return name === 'signal' ? 'var(--gl-color-signal)' : 'var(--gl-color-text)';
}

export const Playground = {
  render: ({ value, fontSize, color }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);';
    const counter = createRollingNumber({ value, fontSize, color: colorVar(color), weight: 700 });
    wrapper.appendChild(counter);
    return wrapper;
  },
};

export const SoldeContributeursViewers = {
  argTypes: { value: { control: false }, fontSize: { control: false }, color: { control: false } },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-direction:column;gap:18px;';

    const rows = [
      { value: 1240, fontSize: 38, color: colorVar('signal'), suffix: 'solde tok' },
      { value: 87, fontSize: 28, color: colorVar('text'), suffix: 'contributeurs' },
      { value: 512, fontSize: 28, color: colorVar('text'), suffix: 'viewers' },
    ];

    rows.forEach(({ value, fontSize, color, suffix }) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:baseline;gap:10px;';
      const counter = createRollingNumber({ value, fontSize, color, weight: 700 });
      const label = document.createElement('span');
      label.style.cssText = 'font-family:var(--gl-font-sans);font-size:13px;color:var(--gl-color-text-muted);';
      label.textContent = suffix;
      row.appendChild(counter);
      row.appendChild(label);
      wrapper.appendChild(row);
    });

    const caption = document.createElement('div');
    caption.style.cssText = 'font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);margin-top:0;';
    caption.textContent = 'Chaque chiffre roule verticalement, stagger 28 ms — odomètre mécanique.';
    wrapper.appendChild(caption);

    return wrapper;
  },
};
