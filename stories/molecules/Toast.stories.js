/**
 * Molecules / Toast — `.gl-toast`. Confirmation toasts (section `#molecules`,
 * "Toast · confirmation"): a support confirmation (signal) and a token
 * recredit notice (ok / green) for a challenge that wasn't funded. Slides in
 * on `glslidein`.
 */
export default {
  title: 'Molecules/Toast',
  parameters: { layout: 'padded' },
  argTypes: {
    kind: { control: 'inline-radio', options: ['confirmation', 'recredit'] },
    message: { control: 'text' },
    sub: { control: 'text' },
  },
  args: {
    kind: 'confirmation',
    message: 'Soutien confirmé · +25 tok',
    sub: 'séquestrés sur « Battre Margit sans soin »',
  },
};

const KIND_STYLES = {
  confirmation: { icon: '◆', color: 'var(--gl-color-signal)', bg: 'var(--gl-color-signal-soft)', border: 'rgba(255,59,31,.4)' },
  recredit: { icon: '↺', color: 'var(--gl-color-ok)', bg: 'rgba(31,138,59,.12)', border: 'rgba(31,138,59,.4)' },
};

function renderToast({ kind, message, sub }) {
  const cfg = KIND_STYLES[kind] || KIND_STYLES.confirmation;
  return `
    <div class="gl-toast gl-toast--${kind}" style="display:flex;align-items:center;gap:12px;background:var(--gl-color-canvas);border:1px solid ${cfg.border};border-radius:var(--gl-radius-md);padding:12px 15px;box-shadow:var(--gl-effect-shadow-drop);max-width:360px;animation:glslidein var(--gl-motion-base) var(--gl-motion-ease);">
      <span style="width:26px;height:26px;border-radius:9px;background:${cfg.bg};color:${cfg.color};display:inline-flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex:none;" aria-hidden="true">${cfg.icon}</span>
      <div style="flex:1;min-width:0;">
        <div style="font-weight:700;font-size:13px;color:var(--gl-color-text);">${message}</div>
        <div style="font-size:11px;color:var(--gl-color-text-muted);">${sub}</div>
      </div>
      <span style="font-size:12px;color:var(--gl-color-text-muted);cursor:pointer;flex:none;" role="button" aria-label="Fermer">✕</span>
    </div>
  `;
}

export const Playground = {
  render: renderToast,
};

export const AllKinds = {
  argTypes: { kind: { control: false }, message: { control: false }, sub: { control: false } },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:10px;max-width:360px;">
      ${renderToast({ kind: 'confirmation', message: 'Soutien confirmé · +25 tok', sub: 'séquestrés sur « Battre Margit sans soin »' })}
      ${renderToast({ kind: 'recredit', message: 'Goal non financé · +46 tok recrédités', sub: "jamais d'argent — uniquement des tokens" })}
    </div>
  `,
};
