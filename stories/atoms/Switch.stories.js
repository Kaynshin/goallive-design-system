import './atoms.css';

/**
 * Atoms / Switch — interrupteur on/off. `.gl-switch` / `.gl-switch__knob`
 * (Storybook-only helper, see atoms.css). Piste signal-deep quand actif.
 */
export default {
  title: 'Atoms/Switch',
  parameters: { layout: 'padded' },
  argTypes: {
    on: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    on: true,
    disabled: false,
    label: 'Réglages & bascule de thème',
  },
};

function renderSwitch({ on, disabled, label }) {
  return `
    <div style="background:var(--gl-color-surface);padding:22px;border-radius:var(--gl-radius-md);">
      <div style="display:flex;align-items:center;gap:14px;">
        <button
          class="gl-switch ${on ? 'gl-switch--on' : ''}"
          type="button"
          role="switch"
          aria-checked="${on}"
          ${disabled ? 'disabled' : ''}
        >
          <span class="gl-switch__knob"></span>
        </button>
        <span style="font-family:var(--gl-font-sans);font-size:13px;font-weight:600;color:var(--gl-color-text);">${on ? 'Activé' : 'Désactivé'}</span>
      </div>
      <div style="margin-top:14px;font-family:var(--gl-font-sans);font-size:12px;color:var(--gl-color-text-muted);">${label}. Piste signal quand actif.</div>
    </div>
  `;
}

export const Playground = {
  render: renderSwitch,
};

export const OnOff = {
  argTypes: { on: { control: false } },
  render: (args) => `
    <div style="display:flex;gap:16px;flex-wrap:wrap;">
      ${renderSwitch({ ...args, on: true })}
      ${renderSwitch({ ...args, on: false })}
    </div>
  `,
};
