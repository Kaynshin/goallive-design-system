import './atoms.css';

/**
 * Atoms / LiveDot — point live (pulse `glpulse`). `.gl-live-dot` /
 * `.gl-live-dot--sm` / `.gl-live-dot--lg` from dist/goallive.css, plus the
 * pill « EN DIRECT » composed from `.gl-badge--signal`.
 */
export default {
  title: 'Atoms/LiveDot',
  parameters: { layout: 'padded' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
  },
  args: {
    size: 'default',
  },
};

function dotMarkup(size) {
  const className = size === 'default' ? 'gl-live-dot' : `gl-live-dot gl-live-dot--${size}`;
  return `<span class="${className}"></span>`;
}

export const Playground = {
  render: ({ size }) => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;align-items:center;gap:26px;">
      ${dotMarkup(size)}
    </div>
  `,
};

export const AllSizes = {
  argTypes: { size: { control: false } },
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);display:flex;align-items:center;gap:26px;">
      ${dotMarkup('sm')}
      ${dotMarkup('default')}
      ${dotMarkup('lg')}
    </div>
  `,
};

export const LivePill = {
  render: () => `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <span class="gl-badge gl-badge--signal">
        <span class="gl-live-dot gl-live-dot--sm"></span>
        <span>EN DIRECT</span>
      </span>
    </div>
  `,
};
