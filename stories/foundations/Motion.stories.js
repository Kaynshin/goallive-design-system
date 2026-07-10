/**
 * Foundations / Motion — durées fast/base/slow + ease, et démo du halo,
 * de l'ombre portée (shadow-drop) et de la lueur signal (glow-signal).
 */
export default {
  title: 'Foundations/Motion',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const DURATIONS = [
  ['motion-fast', '150ms', 'Micro-interactions (hover/active de bouton).'],
  ['motion', '220ms', 'Durée de transition par défaut (interrupteurs, slide-ins).'],
  ['motion-slow', '360ms', 'Slide-in / révélation de déblocage.'],
];

export const Durations = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 20px;">Motion</h2>
      <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);background:var(--gl-color-surface);padding:18px;font-family:var(--gl-font-mono);font-size:12px;color:var(--gl-color-text-muted);line-height:1.9;max-width:360px;">
        ${DURATIONS.map(([name, value]) => `<div><span style="color:var(--gl-color-signal);">--gl-${name}</span> ${value}</div>`).join('')}
        <div style="margin-top:6px;color:var(--gl-color-text);">ease · cubic-bezier(.3,.7,.2,1)</div>
      </div>
    </div>
  `,
};

export const ShadowAndGlow = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 20px;">Ombre portée &amp; lueur signal</h2>
      <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);background:var(--gl-color-surface);padding:18px;display:flex;align-items:center;gap:18px;">
        <div style="width:48px;height:48px;background:var(--gl-color-ink-700);border-radius:12px;box-shadow:var(--gl-effect-shadow-drop);"></div>
        <div style="width:48px;height:48px;background:var(--gl-color-signal);border-radius:12px;box-shadow:var(--gl-effect-glow-signal);"></div>
        <div style="font-family:var(--gl-font-mono);font-size:11px;color:var(--gl-color-text-muted);line-height:1.7;">--gl-effect-shadow-drop<br>--gl-effect-glow-signal</div>
      </div>
    </div>
  `,
};

export const Halo = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 20px;">Halo signature</h2>
      <div class="gl-halo" style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);background:var(--gl-color-surface);padding:24px;min-height:150px;">
        <div style="position:relative;font-family:var(--gl-font-display);font-weight:800;font-size:28px;letter-spacing:-.02em;color:var(--gl-color-text);max-width:60%;line-height:1.05;">
          Discret, en haut à droite. Partout.
        </div>
        <div style="position:relative;margin-top:12px;font-family:var(--gl-font-sans);font-size:13px;color:var(--gl-color-text-muted);max-width:54%;">
          Dégradé radial signal très peu opaque, réservé aux grandes surfaces (hero, fonds de section) — jamais décoratif seul.
        </div>
      </div>
    </div>
  `,
};
