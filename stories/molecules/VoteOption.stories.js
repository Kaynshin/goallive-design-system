/**
 * Molecules / Vote Option — `.gl-vote-option`. A challenge to vote for, with its
 * live vote-share progress fill and the sub-weighted percentage (section
 * `#molecules`, "Option de vote"; reused in the vote panel organism).
 */
export default {
  title: 'Molecules/Vote Option',
  parameters: { layout: 'padded' },
  argTypes: {
    label: { control: 'text' },
    meta: { control: 'text' },
    percent: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    selected: { control: 'boolean' },
  },
  args: {
    label: 'Speedrun World 1 < 4 min',
    meta: '',
    percent: 58,
    selected: true,
  },
};

function renderVoteOption({ label, meta, percent, selected }) {
  const border = selected ? '1px solid rgba(255,59,31,.4)' : '1px solid var(--gl-color-hairline)';
  const bg = selected ? 'var(--gl-color-signal-soft)' : 'var(--gl-color-canvas)';
  const ring = selected ? 'var(--gl-color-signal)' : 'var(--gl-color-hairline)';
  const labelColor = selected ? 'var(--gl-color-text)' : 'var(--gl-color-text-muted)';
  const pctColor = selected ? 'var(--gl-color-signal)' : 'var(--gl-color-text-muted)';
  return `
    <div class="gl-vote-option${selected ? ' gl-vote-option--selected' : ''}" style="position:relative;overflow:hidden;border:${border};border-radius:var(--gl-radius-md);padding:14px 15px;background:${bg};max-width:420px;">
      <div class="gl-vote-option__fill" style="position:absolute;left:0;top:0;bottom:0;width:${percent}%;background:rgba(255,59,31,.12);"></div>
      <div style="position:relative;display:flex;align-items:center;gap:12px;">
        <span style="width:18px;height:18px;border-radius:var(--gl-radius-pill);border:2px solid ${ring};display:inline-flex;align-items:center;justify-content:center;flex:none;" aria-hidden="true">
          ${selected ? '<span style="width:8px;height:8px;border-radius:var(--gl-radius-pill);background:var(--gl-color-signal);"></span>' : ''}
        </span>
        <span style="flex:1;font-family:var(--gl-font-sans);font-weight:600;font-size:14px;color:${labelColor};">${label}</span>
        <span style="font-family:var(--gl-font-sans);font-weight:700;font-size:13px;color:${pctColor};">${percent}%</span>
      </div>
      ${meta ? `<div style="position:relative;font-size:12px;color:var(--gl-color-text-muted);margin-top:6px;padding-left:30px;">${meta}</div>` : ''}
    </div>
  `;
}

export const Playground = {
  render: renderVoteOption,
};

export const AllStates = {
  argTypes: { label: { control: false }, percent: { control: false }, selected: { control: false } },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:10px;max-width:420px;">
      ${renderVoteOption({ label: 'Speedrun World 1 < 4 min', meta: '', percent: 58, selected: true })}
      ${renderVoteOption({ label: 'Finir le donjon sans mourir', meta: '', percent: 42, selected: false })}
    </div>
  `,
};
