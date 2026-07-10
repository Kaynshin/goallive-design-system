import './atoms.css';

/**
 * Atoms / Button — `.gl-btn` + `.gl-btn--{variant}` from dist/goallive.css.
 */
export default {
  title: 'Atoms/Button',
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'small', 'link', 'disabled'],
    },
    label: { control: 'text' },
  },
  args: {
    variant: 'primary',
    label: 'Soutenir le défi',
  },
};

function buttonMarkup({ variant, label }) {
  if (variant === 'ghost') {
    return `<button class="gl-btn gl-btn--ghost">${label}</button>`;
  }
  if (variant === 'small') {
    return `<button class="gl-btn gl-btn--primary gl-btn--sm">${label}</button>`;
  }
  if (variant === 'link') {
    return `<button class="gl-btn gl-btn--link">${label}</button>`;
  }
  if (variant === 'disabled') {
    return `<button class="gl-btn gl-btn--primary" disabled>${label}</button>`;
  }
  return `<button class="gl-btn gl-btn--primary">${label}</button>`;
}

function canvasWrap(innerHtml) {
  return `
    <div style="display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:16px;min-height:120px;background:var(--gl-color-surface);border-radius:var(--gl-radius-md);padding:32px;">
      ${innerHtml}
    </div>
  `;
}

export const Playground = {
  render: (args) => canvasWrap(buttonMarkup(args)),
};

export const AllVariants = {
  argTypes: { variant: { control: false } },
  render: (args) =>
    canvasWrap(
      ['primary', 'ghost', 'small', 'link', 'disabled'].map((variant) => buttonMarkup({ ...args, variant })).join('')
    ),
};
