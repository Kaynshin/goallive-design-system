/**
 * OBSOverlay organism — the browser-source overlay incrusted on the live
 * game feed (section `#organisms`, "Overlay OBS · à incruster sur le live";
 * screen 13 of "Goallive Showcase (standalone).html", route
 * `/overlay/[channel]?token=`). Transparent/dark background, EN DIRECT +
 * last-support badges, the GoalGauge, and the "GOAL UNLOCKED · GO ALIVE"
 * banner that appears once the embedded gauge crosses its target.
 */
import { createGoalGauge } from '../../src/goal-gauge.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function createOBSOverlay(options = {}) {
  const {
    current = 120,
    target = 300,
    challenge = 'Speedrun World 1 < 4 min',
    lastSupport = '« plus 25 » · Korrigan_TV',
  } = options;

  const el = document.createElement('div');
  el.className = 'gl-obs-overlay';

  el.innerHTML = `
    <div class="gl-obs-overlay__bg" aria-hidden="true"></div>
    <div class="gl-obs-overlay__top">
      <span class="gl-badge gl-badge--signal gl-obs-overlay__live"><span class="gl-live-dot gl-live-dot--sm"></span>EN DIRECT</span>
      <span class="gl-badge gl-obs-overlay__mic">🎙&nbsp;${escapeHtml(lastSupport)}</span>
    </div>
    <div class="gl-obs-overlay__unlocked" hidden>
      <span class="gl-live-dot"></span>
      <span>GOAL UNLOCKED&nbsp;&middot; <span class="gl-obs-overlay__unlocked-accent">GO ALIVE</span></span>
    </div>
    <div class="gl-obs-overlay__gauge"></div>
  `;

  const gauge = createGoalGauge({ current, target, label: 'GOAL EN DIRECT', caption: challenge });
  el.querySelector('.gl-obs-overlay__gauge').appendChild(gauge);

  const unlockedEl = el.querySelector('.gl-obs-overlay__unlocked');
  gauge.addEventListener('goalgauge:unlocked', () => {
    unlockedEl.hidden = false;
  });

  el.gauge = gauge;
  return el;
}
