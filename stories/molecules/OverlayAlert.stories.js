/**
 * Molecules / Overlay Alert — `.gl-overlay-alert`. The "GOAL UNLOCKED · GO ALIVE"
 * banner (section `#molecules`, "Alerte overlay") reused across the live viewer
 * page, the OBS overlay, and the dispute settlement screen in the source bundle.
 * Slides in on `glslidein` (`--gl-motion-base`).
 */
export default {
  title: 'Molecules/Overlay Alert',
  parameters: { layout: 'padded' },
  argTypes: {
    creator: { control: 'text' },
    animated: { control: 'boolean' },
  },
  args: {
    creator: 'Nyxoraa',
    animated: true,
  },
};

function renderOverlayAlert({ creator, animated }) {
  return `
    <div class="gl-overlay-alert" style="position:relative;overflow:hidden;border-radius:var(--gl-radius-md);background:var(--gl-color-canvas);border:1px solid rgba(255,59,31,.4);padding:20px;max-width:420px;${animated ? 'animation:glslidein var(--gl-motion-base) var(--gl-motion-ease);' : ''}">
      <div style="position:absolute;inset:0;background:var(--gl-effect-halo-strong);pointer-events:none;"></div>
      <div style="position:relative;display:flex;align-items:center;gap:12px;">
        <span class="gl-live-dot gl-live-dot--lg" aria-hidden="true"></span>
        <div>
          <div class="gl-wordmark" style="font-size:18px;">GOAL UNLOCKED</div>
          <div style="font-family:var(--gl-font-sans);font-weight:var(--gl-font-weight-bold);font-size:13px;color:var(--gl-color-signal);margin-top:4px;letter-spacing:.06em;">GO ALIVE&nbsp;&middot; ${creator} relève le défi</div>
        </div>
      </div>
    </div>
  `;
}

export const Playground = {
  render: renderOverlayAlert,
};

export const Static = {
  argTypes: { animated: { control: false } },
  render: (args) => renderOverlayAlert({ ...args, animated: false }),
};
