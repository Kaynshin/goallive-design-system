/**
 * GoalGauge — Goallive's signature component (`<dc-import name="GoalGauge">` in the
 * source bundle, section `#signatures` / `#molecules` of "Goallive Design System
 * (standalone).html", reused live in the viewer overlay and OBS overlay of
 * "Goallive Showcase (standalone).html", screens 01 & 13).
 *
 * A pill-shaped bar that fills with `--gl-color-signal` as the community supports
 * a challenge in tokens: label + caption + live current/target token counter,
 * a soft glow as the fill approaches the target, and a "GOAL UNLOCKED · GO ALIVE"
 * banner once the target is reached.
 *
 * createGoalGauge({ current, target, label, caption, theme, status }) -> HTMLElement
 *   .setCurrent(n)  updates the current token count. The fill width animates on
 *                   `--gl-motion-slow` (CSS transition) with a light "bump"
 *                   (scaleY 1 -> ~1.5 -> 1) — skipped when the user prefers
 *                   reduced motion. Reveals the unlock banner and fires
 *                   `goalgauge:unlocked` the first time current >= target.
 *   .setTarget(n)   updates the target token count.
 *   .setStatus(s)   forces a status: 'filling' | 'unlocked' | 'failed'. 'failed'
 *                   sticks until explicitly cleared with another setStatus call
 *                   (a subsequent .setCurrent will not silently clear it).
 *   .getState()     returns a snapshot `{ current, target, status }`.
 */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const STATUSES = ['filling', 'unlocked', 'failed'];

export function createGoalGauge(options = {}) {
  const { current = 0, target = 100, label = 'GOAL EN COURS', caption = '', theme = 'dark', status: initialStatus } = options;

  const state = {
    current: Math.max(0, Number(current) || 0),
    target: Math.max(1, Number(target) || 1),
    status: STATUSES.includes(initialStatus) ? initialStatus : undefined,
  };
  if (!state.status) state.status = state.current >= state.target ? 'unlocked' : 'filling';

  const el = document.createElement('div');
  el.className = 'gl-goalgauge';
  el.dataset.theme = theme;

  el.innerHTML = `
    <div class="gl-goalgauge__head">
      <span class="gl-goalgauge__label">${escapeHtml(label)}</span>
      <span class="gl-goalgauge__count"><strong class="gl-goalgauge__count-current"></strong><span class="gl-goalgauge__count-sep"> / </span><span class="gl-goalgauge__count-target"></span><span class="gl-goalgauge__count-unit"> tok</span></span>
    </div>
    <div class="gl-goalgauge__track" role="progressbar" aria-valuemin="0" aria-label="${escapeHtml(label)}">
      <div class="gl-goalgauge__fill"></div>
    </div>
    ${caption ? `<p class="gl-goalgauge__caption">${escapeHtml(caption)}</p>` : ''}
    <div class="gl-goalgauge__unlocked" hidden>
      <span class="gl-live-dot"></span>
      <span class="gl-goalgauge__unlocked-text">GOAL UNLOCKED&nbsp;&middot; <span class="gl-goalgauge__unlocked-accent">GO ALIVE</span></span>
    </div>
  `;

  const fillEl = el.querySelector('.gl-goalgauge__fill');
  const trackEl = el.querySelector('.gl-goalgauge__track');
  const currentEl = el.querySelector('.gl-goalgauge__count-current');
  const targetEl = el.querySelector('.gl-goalgauge__count-target');
  const unlockedEl = el.querySelector('.gl-goalgauge__unlocked');

  function applyStatusClasses() {
    el.classList.toggle('gl-goalgauge--filling', state.status === 'filling');
    el.classList.toggle('gl-goalgauge--unlocked', state.status === 'unlocked');
    el.classList.toggle('gl-goalgauge--failed', state.status === 'failed');
    unlockedEl.hidden = state.status !== 'unlocked';
  }

  function render() {
    const pct = state.target > 0 ? Math.min(100, Math.max(0, (state.current / state.target) * 100)) : 0;
    fillEl.style.width = `${pct}%`;
    currentEl.textContent = String(Math.round(state.current));
    targetEl.textContent = String(Math.round(state.target));
    trackEl.setAttribute('aria-valuemax', String(Math.round(state.target)));
    trackEl.setAttribute('aria-valuenow', String(Math.min(Math.round(state.current), Math.round(state.target))));
    el.classList.toggle('gl-goalgauge--near', pct >= 85 && state.status !== 'unlocked');
    applyStatusClasses();
  }

  function bump() {
    if (prefersReducedMotion()) return;
    fillEl.classList.remove('gl-goalgauge__fill--bump');
    // Force reflow so the animation restarts even on consecutive bumps.
    void fillEl.offsetWidth;
    fillEl.classList.add('gl-goalgauge__fill--bump');
  }

  el.setCurrent = function setCurrent(n) {
    const nextCurrent = Math.max(0, Number(n) || 0);
    const wasUnlocked = state.status === 'unlocked';
    state.current = nextCurrent;
    if (state.status !== 'failed') {
      state.status = state.current >= state.target ? 'unlocked' : 'filling';
    }
    render();
    bump();
    if (!wasUnlocked && state.status === 'unlocked') {
      el.dispatchEvent(new CustomEvent('goalgauge:unlocked', { detail: { ...state } }));
    }
    return el;
  };

  el.setTarget = function setTarget(n) {
    state.target = Math.max(1, Number(n) || 1);
    if (state.status !== 'failed') {
      state.status = state.current >= state.target ? 'unlocked' : 'filling';
    }
    render();
    return el;
  };

  el.setStatus = function setStatus(next) {
    if (!STATUSES.includes(next)) return el;
    state.status = next;
    render();
    return el;
  };

  el.getState = function getState() {
    return { ...state };
  };

  render();
  return el;
}
