/**
 * DisputeWindow organism — the "non honoré" challenge report window (section
 * `#organisms`, "Fenêtre de litige"; screen 09 & 14 of the Showcase, "Cycle de
 * vie & litige" / "Modération & recrédit"). A supermajority of contributor
 * reports auto-recredits tokens; the creator can also confirm the challenge
 * was honored.
 */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function createDisputeWindow(options = {}) {
  const {
    title = 'Défi signalé « non honoré »',
    description = 'Supermajorité par tête requise. Si validée, recrédit automatique en tokens des contributeurs.',
    flags = 18,
    total = 26,
    threshold = 0.6,
  } = options;

  const state = { flags, total, resolved: null };

  const el = document.createElement('div');
  el.className = 'gl-dispute-window';
  el.innerHTML = `
    <div class="gl-dispute-window__alert">
      <span class="gl-dispute-window__alert-icon" aria-hidden="true">&#9888;</span>
      <div>
        <div class="gl-dispute-window__alert-title">${escapeHtml(title)}</div>
        <div class="gl-dispute-window__alert-desc">${escapeHtml(description)}</div>
      </div>
    </div>
    <div class="gl-dispute-window__row">
      <span>Signalements</span>
      <span class="gl-dispute-window__count"><span class="gl-dispute-window__flags">${flags}</span> / ${total} contributeurs</span>
    </div>
    <div class="gl-dispute-window__track"><div class="gl-dispute-window__fill"></div></div>
    <div class="gl-dispute-window__actions">
      <button type="button" class="gl-btn gl-btn--ghost gl-dispute-window__honor">Honoré</button>
      <button type="button" class="gl-btn gl-btn--primary gl-dispute-window__flag">Signaler</button>
    </div>
    <div class="gl-dispute-window__result" hidden></div>
  `;

  const flagsEl = el.querySelector('.gl-dispute-window__flags');
  const fillEl = el.querySelector('.gl-dispute-window__fill');
  const resultEl = el.querySelector('.gl-dispute-window__result');

  function render() {
    const pct = state.total > 0 ? Math.min(100, Math.round((state.flags / state.total) * 100)) : 0;
    fillEl.style.width = `${pct}%`;
    flagsEl.textContent = String(state.flags);
  }

  function resolve(kind, message) {
    state.resolved = kind;
    resultEl.hidden = false;
    resultEl.textContent = message;
    resultEl.className = `gl-dispute-window__result gl-dispute-window__result--${kind}`;
    el.dispatchEvent(new CustomEvent('dispute:resolved', { detail: { kind } }));
  }

  el.querySelector('.gl-dispute-window__flag').addEventListener('click', () => {
    if (state.resolved) return;
    state.flags = Math.min(state.total, state.flags + 1);
    render();
    if (state.flags / state.total >= threshold) {
      resolve('refunded', 'Litige validé · recrédit automatique des contributeurs en tokens');
    }
  });

  el.querySelector('.gl-dispute-window__honor').addEventListener('click', () => {
    if (state.resolved) return;
    resolve('honored', 'Défi confirmé honoré · tokens libérés au créateur');
  });

  el.getState = () => ({ ...state });
  render();
  return el;
}
