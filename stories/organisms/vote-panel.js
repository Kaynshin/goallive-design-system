/**
 * VotePanel organism — the weighted vote panel choosing the next active
 * challenge (section `#organisms`, "Panneau de vote"; second-screen variant
 * in "Goallive Showcase (standalone).html", screen 12). Composed from the
 * Vote Option and Vote Timer molecules' markup. One vote per Twitch identity,
 * sub votes count double by default.
 */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

const DEFAULT_OPTIONS = [
  { id: 'o1', label: 'Speedrun World 1 < 4 min', percent: 58 },
  { id: 'o2', label: 'Donjon sans mourir', percent: 30 },
  { id: 'o3', label: '10 min en anglais', percent: 12 },
];

export function createVotePanel(options = {}) {
  const {
    question = 'Quel défi Nyxoraa relève cette session ?',
    voteOptions = DEFAULT_OPTIONS,
    countdown = 42,
    subWeight = 2,
  } = options;

  const state = { selected: null, voted: false };

  const el = document.createElement('div');
  el.className = 'gl-vote-panel';

  el.innerHTML = `
    <div class="gl-vote-panel__head">
      <span class="gl-vote-panel__question">${escapeHtml(question)}</span>
      <span class="gl-vote-panel__timer"><span class="gl-live-dot gl-live-dot--sm"></span><span class="gl-vote-panel__seconds">${countdown}</span>s</span>
    </div>
    <div class="gl-vote-panel__hint">Sub = vote&nbsp;&times;<span class="gl-vote-panel__weight">${subWeight}</span></div>
    <div class="gl-vote-panel__options"></div>
    <button type="button" class="gl-btn gl-btn--primary gl-vote-panel__submit">Voter&nbsp;&middot; &times;${subWeight}</button>
    <div class="gl-vote-panel__confirm" hidden>Vote enregistré&nbsp;&middot; pondéré&nbsp;&times;${subWeight} (sub)</div>
  `;

  const optionsEl = el.querySelector('.gl-vote-panel__options');
  const submitBtn = el.querySelector('.gl-vote-panel__submit');
  const confirmEl = el.querySelector('.gl-vote-panel__confirm');

  voteOptions.forEach((opt) => {
    const row = document.createElement('div');
    row.className = 'gl-vote-panel__option';
    row.dataset.id = opt.id;
    row.setAttribute('role', 'radio');
    row.setAttribute('aria-checked', 'false');
    row.tabIndex = 0;
    row.innerHTML = `
      <div class="gl-vote-panel__fill" style="width:${opt.percent}%"></div>
      <div class="gl-vote-panel__row">
        <span class="gl-vote-panel__label">${escapeHtml(opt.label)}</span>
        <span class="gl-vote-panel__pct">${opt.percent}%</span>
      </div>
    `;
    function select() {
      if (state.voted) return;
      state.selected = opt.id;
      [...optionsEl.children].forEach((c) => {
        const isSelected = c === row;
        c.classList.toggle('gl-vote-panel__option--selected', isSelected);
        c.setAttribute('aria-checked', String(isSelected));
      });
    }
    row.addEventListener('click', select);
    row.addEventListener('keydown', (evt) => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        select();
      }
    });
    optionsEl.appendChild(row);
  });

  submitBtn.addEventListener('click', () => {
    if (!state.selected || state.voted) return;
    state.voted = true;
    submitBtn.hidden = true;
    confirmEl.hidden = false;
    el.dispatchEvent(new CustomEvent('votepanel:voted', { detail: { selected: state.selected } }));
  });

  el.getState = () => ({ ...state });
  return el;
}
