import './atoms.css';

/**
 * Atoms / StateTag — tags d'état de défi. `.gl-tag` / `.gl-tag--active` /
 * `.gl-tag--refused` from dist/goallive.css, plus two Storybook-only text/bg
 * modifiers (`.gl-tag--soft`, `.gl-tag--muted-bg`, see atoms.css) for the
 * two states that share the neutral tag shell but tweak a single channel.
 */
export default {
  title: 'Atoms/StateTag',
  parameters: { layout: 'padded' },
};

const STATES = [
  { label: 'Proposé', className: 'gl-tag' },
  { label: 'Au vote', className: 'gl-tag gl-tag--soft' },
  { label: 'Actif', className: 'gl-tag gl-tag--active' },
  { label: 'Financé', className: 'gl-tag gl-tag--active' },
  { label: 'Honoré', className: 'gl-tag gl-tag--soft' },
  { label: 'Réglé', className: 'gl-tag' },
  { label: '↺ Non financé · recrédit', className: 'gl-tag gl-tag--muted-bg' },
  { label: '⛔ Refusé · modération', className: 'gl-tag gl-tag--refused' },
];

function renderTag({ label, className }) {
  return `<span class="${className}">${label}</span>`;
}

export const AllStates = {
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;flex-wrap:wrap;gap:8px;">
      ${STATES.map(renderTag).join('')}
    </div>
  `,
};
