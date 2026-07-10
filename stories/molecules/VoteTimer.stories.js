/**
 * Molecules / Vote Timer — `.gl-vote-timer`. The countdown driving the vote
 * window (section `#molecules`, "Minuteur de vote"; reused in the vote panel
 * organism and the OBS overlay header).
 */
export default {
  title: 'Molecules/Vote Timer',
  parameters: { layout: 'padded' },
  argTypes: {
    seconds: { control: { type: 'number', min: 0, max: 999 } },
    open: { control: 'boolean' },
  },
  args: {
    seconds: 42,
    open: true,
  },
};

function renderVoteTimer({ seconds, open }) {
  return `
    <div class="gl-vote-timer" style="display:flex;align-items:center;justify-content:space-between;gap:14px;max-width:360px;">
      <div>
        <div style="font-size:13px;color:var(--gl-color-text-muted);margin-bottom:6px;">Fin du vote dans</div>
        <div style="display:flex;align-items:baseline;gap:6px;">
          <span class="gl-vote-timer__seconds" style="font-family:var(--gl-font-display);font-weight:var(--gl-font-weight-extrabold);font-size:34px;color:var(--gl-color-text);">${seconds}</span>
          <span style="font-size:14px;color:var(--gl-color-text-muted);">s</span>
        </div>
      </div>
      <span class="gl-badge gl-badge--signal">
        <span class="gl-live-dot gl-live-dot--sm"${open ? '' : ' style="animation:none;background:var(--gl-color-text-muted);"'}></span>
        ${open ? 'VOTE OUVERT' : 'VOTE FERMÉ'}
      </span>
    </div>
  `;
}

export const Playground = {
  render: renderVoteTimer,
};

export const Closed = {
  argTypes: { open: { control: false } },
  render: (args) => renderVoteTimer({ ...args, open: false }),
};
