import './atoms.css';
import { createRollingNumber } from './rolling-number.js';

/**
 * Atoms / RollingNumber — compteur roulant signature (odomètre vertical).
 * Chaque chiffre roule verticalement, stagger 28ms — voir stories/atoms/rolling-number.js.
 * Respecte `prefers-reduced-motion` (état final instantané).
 *
 * L'animation ne se déclenche que via `.update(next)` sur une instance déjà montée
 * (un nouvel élément est toujours rendu à l'état final, sans roll). Les stories
 * ci-dessous conservent donc une instance persistante et appellent `.update()`
 * au lieu de recréer le compteur à chaque changement.
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

function randomDelta(min = 5, max = 99) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Instance persistante du Playground : recréée seulement quand fontSize/color
// changent (paramètres structurels du DOM), sinon simplement mise à jour via
// `.update()` pour que le control `value` déclenche bien le roll de l'odomètre.
let playgroundInst = null;
let playgroundKey = null;

export const Playground = {
  render: ({ value, fontSize, color }) => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-direction:column;gap:14px;';

    const counterHost = document.createElement('div');
    const key = `${fontSize}|${color}`;

    if (!playgroundInst || playgroundKey !== key) {
      playgroundInst = createRollingNumber({ value, fontSize, color: colorVar(color), weight: 700 });
      playgroundKey = key;
    } else if (playgroundInst.value !== value) {
      // Même structure (taille/couleur inchangées) : anime vers la nouvelle valeur.
      playgroundInst.update(value);
    }

    counterHost.appendChild(playgroundInst);
    wrapper.appendChild(counterHost);

    const replayBtn = document.createElement('button');
    replayBtn.type = 'button';
    replayBtn.textContent = '▶ Rejouer';
    replayBtn.style.cssText =
      'align-self:flex-start;font-family:var(--gl-font-sans);font-size:13px;padding:6px 12px;border-radius:var(--gl-radius-sm, 6px);border:1px solid var(--gl-color-border, currentColor);background:transparent;color:var(--gl-color-text);cursor:pointer;';
    replayBtn.addEventListener('click', () => {
      playgroundInst.update(playgroundInst.value + randomDelta());
    });
    wrapper.appendChild(replayBtn);

    return wrapper;
  },
};

export const AutoPlay = {
  argTypes: { value: { control: false }, fontSize: { control: false }, color: { control: false } },
  parameters: {
    docs: {
      description: {
        story:
          'Plusieurs compteurs mis à jour en continu (~1.6s) via `.update()`, pour démontrer le roll de l\'odomètre en temps réel.',
      },
    },
  },
  render: () => {
    const wrapper = document.createElement('div');
    wrapper.style.cssText =
      'background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-direction:column;gap:18px;';

    const rows = [
      { value: 1240, fontSize: 38, color: colorVar('signal'), suffix: 'solde tok', min: 5, max: 99 },
      { value: 87, fontSize: 28, color: colorVar('text'), suffix: 'contributeurs', min: 1, max: 5 },
      { value: 512, fontSize: 28, color: colorVar('text'), suffix: 'viewers', min: 1, max: 30 },
    ];

    rows.forEach(({ value, fontSize, color, suffix, min, max }) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:baseline;gap:10px;';
      const counter = createRollingNumber({ value, fontSize, color, weight: 700 });
      const label = document.createElement('span');
      label.style.cssText = 'font-family:var(--gl-font-sans);font-size:13px;color:var(--gl-color-text-muted);';
      label.textContent = suffix;
      row.appendChild(counter);
      row.appendChild(label);
      wrapper.appendChild(row);

      const intervalId = setInterval(() => {
        // Storybook html-vite n'expose pas de hook unmount fiable pour cette
        // story : on garde l'intervalle actif seulement tant que l'élément
        // racine est monté, sinon on le nettoie pour éviter la fuite.
        if (!wrapper.isConnected) {
          clearInterval(intervalId);
          return;
        }
        counter.update(counter.value + randomDelta(min, max));
      }, 1600);
    });

    const caption = document.createElement('div');
    caption.style.cssText = 'font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);margin-top:0;';
    caption.textContent = 'Mise à jour automatique toutes les 1.6s via .update() — odomètre mécanique en continu.';
    wrapper.appendChild(caption);

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
