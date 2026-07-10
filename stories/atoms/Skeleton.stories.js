import './atoms.css';

/**
 * Atoms / Skeleton — squelette de chargement. `.gl-skeleton` (Storybook-only
 * helper, see atoms.css) drives the `glshimmer` keyframes shipped in
 * build/primitives.css. Jamais de spinner — la jauge se dessine en squelette.
 */
export default {
  title: 'Atoms/Skeleton',
  parameters: { layout: 'padded' },
};

export const Playground = {
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="gl-skeleton" style="height:14px;width:60%;"></div>
        <div class="gl-skeleton" style="height:14px;width:85%;"></div>
        <div class="gl-skeleton gl-skeleton--pill" style="height:18px;width:100%;"></div>
      </div>
      <div style="margin-top:14px;font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">Jamais de spinner — la jauge se dessine en squelette.</div>
    </div>
  `,
};
