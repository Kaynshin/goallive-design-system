/**
 * GoalGauge — Goallive's signature component (`<dc-import name="GoalGauge">` in the
 * source bundle, section `#signatures` / `#molecules` of "Goallive Design System
 * (standalone).html", reused live in the viewer overlay and OBS overlay of
 * "Goallive Showcase (standalone).html", screens 01 & 13).
 *
 * A pill-shaped track that fills with `--gl-color-signal` as the community supports
 * a challenge in tokens: label + goal caption on the left, a live current/target
 * token counter (RollingNumber odometer for the current value) on the right, a
 * soft glow on the fill as it approaches the target, and a
 * "GOAL ATTEINT · GO ALIVE" line once the target is reached.
 *
 * createGoalGauge({ current, target, label, caption, theme, status, height }) -> HTMLElement
 *   .setCurrent(n)  updates the current token count (and the internal RollingNumber).
 *                   The fill width animates on `--gl-motion-slow`-equivalent (700ms
 *                   cubic-bezier) with a light "bump" (track scale 1 -> 1.018 -> 1)
 *                   — skipped when the user prefers reduced motion. Reveals the
 *                   "GOAL ATTEINT" line and fires `goalgauge:unlocked` the first
 *                   time current >= target.
 *   .setTarget(n)   updates the target token count.
 *   .setCaption(t)  updates the goal caption (the title of the challenge).
 *   .setStatus(s)   forces a status: 'filling' | 'unlocked' | 'failed'. 'failed'
 *                   sticks until explicitly cleared with another setStatus call
 *                   (a subsequent .setCurrent will not silently clear it).
 *   .getState()     returns a snapshot `{ current, target, status }`.
 */

import { createRollingNumber } from './rolling-number.js';

function prefersReducedMotion() {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const STATUSES = ['filling', 'unlocked', 'failed'];
const BUMP_MS = 220;

export function createGoalGauge(options = {}) {
  const {
    current = 0,
    target = 100,
    label = 'GOAL EN COURS',
    caption = '',
    theme = 'dark',
    status: initialStatus,
    height = 18,
  } = options;

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
      <div class="gl-goalgauge__head-left">
        <span class="gl-goalgauge__label"></span>
        <p class="gl-goalgauge__caption"></p>
      </div>
      <div class="gl-goalgauge__count">
        <span class="gl-goalgauge__count-target"></span>
      </div>
    </div>
    <div class="gl-goalgauge__track" role="progressbar" aria-valuemin="0">
      <div class="gl-goalgauge__fill"></div>
    </div>
    <div class="gl-goalgauge__unlocked" hidden>
      <span class="gl-goalgauge__unlocked-dot"></span>
      <span class="gl-goalgauge__unlocked-text">GOAL ATTEINT&nbsp;&middot; GO ALIVE</span>
    </div>
  `;

  const labelEl = el.querySelector('.gl-goalgauge__label');
  const captionEl = el.querySelector('.gl-goalgauge__caption');
  const countEl = el.querySelector('.gl-goalgauge__count');
  const targetEl = el.querySelector('.gl-goalgauge__count-target');
  const trackEl = el.querySelector('.gl-goalgauge__track');
  const fillEl = el.querySelector('.gl-goalgauge__fill');
  const unlockedEl = el.querySelector('.gl-goalgauge__unlocked');

  labelEl.textContent = label;
  captionEl.textContent = caption;
  trackEl.setAttribute('aria-label', label);
  trackEl.style.height = `${Math.max(1, Number(height) || 18)}px`;

  // The current-value counter is a RollingNumber odometer, mounted directly inside
  // the `.gl-goalgauge__count` container (before the "/ target tok" text), colored
  // with the `--gl-color-signal` token (the design system's single brand accent) —
  // never a hard-coded hex, so retheming the token retints the counter everywhere.
  const rolling = createRollingNumber({ value: state.current, fontSize: 26, color: 'var(--gl-color-signal)', weight: 700 });
  rolling.classList.add('gl-goalgauge__count-current');
  countEl.insertBefore(rolling, targetEl);

  let bumpTimer;

  function applyStatusClasses() {
    el.classList.toggle('gl-goalgauge--filling', state.status === 'filling');
    el.classList.toggle('gl-goalgauge--unlocked', state.status === 'unlocked');
    el.classList.toggle('gl-goalgauge--failed', state.status === 'failed');
    unlockedEl.hidden = state.status !== 'unlocked';
  }

  function render() {
    const pct = state.target > 0 ? Math.min(100, Math.max(0, (state.current / state.target) * 100)) : 0;
    fillEl.style.width = `${pct}%`;
    targetEl.textContent = `/ ${Math.round(state.target)} tok`;
    trackEl.setAttribute('aria-valuemax', String(Math.round(state.target)));
    trackEl.setAttribute('aria-valuenow', String(Math.min(Math.round(state.current), Math.round(state.target))));
    el.classList.toggle('gl-goalgauge--near', pct >= 80 && state.status !== 'failed');
    applyStatusClasses();
  }

  // Track-level "bump": scale(1) -> scale(1.018) -> scale(1), on every increment of
  // `current`. Relies on the `.gl-goalgauge__track` CSS transition (transform, 320ms
  // cubic-bezier(.3,.7,.2,1)) for the actual animation; this only drives the target
  // value. Skipped entirely under `prefers-reduced-motion: reduce`.
  function bump() {
    if (prefersReducedMotion()) return;
    window.clearTimeout(bumpTimer);
    trackEl.style.transform = 'scale(1.018)';
    bumpTimer = window.setTimeout(() => {
      trackEl.style.transform = 'scale(1)';
    }, BUMP_MS);
  }

  el.setCurrent = function setCurrent(n) {
    const nextCurrent = Math.max(0, Number(n) || 0);
    const increased = nextCurrent > state.current;
    const wasUnlocked = state.status === 'unlocked';
    state.current = nextCurrent;
    if (state.status !== 'failed') {
      state.status = state.current >= state.target ? 'unlocked' : 'filling';
    }
    rolling.update(state.current);
    render();
    if (increased) bump();
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

  el.setCaption = function setCaption(text) {
    captionEl.textContent = text == null ? '' : String(text);
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
