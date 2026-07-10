import './atoms.css';

/**
 * Atoms / Focus — démo focus-visible. Anneau signal 2px, décalé 3px — appliqué
 * globalement via `:focus-visible` (build/primitives.css). Le style est forcé
 * ici (inline) car un build Storybook statique ne peut pas déclencher un vrai
 * focus clavier.
 */
export default {
  title: 'Atoms/Focus',
  parameters: { layout: 'padded' },
};

export const Playground = {
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <div style="display:flex;flex-wrap:wrap;gap:14px;align-items:center;">
        <button class="gl-btn gl-btn--primary" style="outline:2px solid var(--gl-color-signal);outline-offset:3px;">Soutenir</button>
        <button class="gl-btn gl-btn--ghost" style="outline:2px solid var(--gl-color-signal);outline-offset:3px;">Ghost</button>
      </div>
      <div style="margin-top:14px;font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">Anneau signal 2 px, décalé 3 px — appliqué globalement sur :focus-visible (clavier, WCAG 2.2 AA).</div>
    </div>
  `,
};
