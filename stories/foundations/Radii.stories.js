/**
 * Foundations / Radii — l'échelle `--gl-radius-*` : sm 11 / md 14 / lg 18 / pill 999.
 */
export default {
  title: 'Foundations/Radii',
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    actions: { disable: true },
  },
};

const RADII = [
  ['sm', '11px'],
  ['md', '14px'],
  ['lg', '18px'],
  ['pill', '999px'],
];

export const AllRadii = {
  render: () => `
    <div style="padding:24px;">
      <h2 style="font-family:var(--gl-font-sans);font-weight:700;font-size:20px;margin:0 0 20px;">Rayons</h2>
      <div style="border:1px solid var(--gl-color-hairline);border-radius:var(--gl-radius-md);background:var(--gl-color-surface);padding:18px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
        ${RADII.map(
          ([name, value]) => `
          <div style="width:48px;height:48px;background:var(--gl-color-ink-700);border:1px solid var(--gl-color-ink-600);border-radius:var(--gl-radius-${name});"></div>
        `
        ).join('')}
        <div style="font-family:var(--gl-font-mono);font-size:11px;color:var(--gl-color-text-muted);line-height:1.7;">
          ${RADII.map(([name, value]) => `--gl-radius-${name} ${value}`).join('<br>')}
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:24px;margin-top:20px;">
        ${RADII.map(
          ([name, value]) => `
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
            <div style="width:88px;height:88px;background:var(--gl-color-signal);border-radius:var(--gl-radius-${name});"></div>
            <div style="font-family:var(--gl-font-mono);font-size:11px;color:var(--gl-color-text-muted);">--gl-radius-${name}</div>
            <div style="font-family:var(--gl-font-mono);font-size:12px;color:var(--gl-color-text-muted);">${value}</div>
          </div>
        `
        ).join('')}
      </div>
    </div>
  `,
};
