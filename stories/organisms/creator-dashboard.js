/**
 * CreatorDashboard organism — the creator's control room (section
 * `#organisms`, "Dashboard créateur"; screen 02 of the Showcase): propose a
 * challenge, session stats, and the moderation validation queue. Submitting
 * the propose form pushes a new "modéré" row onto the queue.
 */

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

const DEFAULT_QUEUE = [
  { title: 'Parler en anglais 10 min', author: 'Maelyz', status: 'modéré' },
  { title: "No-hit jusqu'au check 3", author: 'Vortakk', status: 'en attente' },
];

export function createCreatorDashboard(options = {}) {
  const {
    proposedTitle = 'Finir le Nightmare sans checkpoint',
    proposedTarget = 300,
    gains = 142,
    honored = '3 / 3',
    participation = 72,
    queue = DEFAULT_QUEUE,
  } = options;

  const state = { queue: [...queue] };

  const el = document.createElement('div');
  el.className = 'gl-creator-dashboard';

  el.innerHTML = `
    <div class="gl-creator-dashboard__stats">
      <div class="gl-creator-dashboard__stat">
        <div class="gl-creator-dashboard__stat-label">Gains libérés</div>
        <div class="gl-creator-dashboard__stat-value"><span class="gl-creator-dashboard__gains">${gains}</span><span class="gl-creator-dashboard__stat-unit">&euro;</span></div>
      </div>
      <div class="gl-creator-dashboard__stat">
        <div class="gl-creator-dashboard__stat-label">Défis honorés</div>
        <div class="gl-creator-dashboard__stat-value">${honored}</div>
      </div>
      <div class="gl-creator-dashboard__stat">
        <div class="gl-creator-dashboard__stat-label">Taux de participation</div>
        <div class="gl-creator-dashboard__stat-value gl-creator-dashboard__stat-value--signal">${participation}%</div>
      </div>
    </div>
    <div class="gl-creator-dashboard__body">
      <div class="gl-creator-dashboard__propose">
        <div class="gl-creator-dashboard__propose-head">
          <span class="gl-creator-dashboard__propose-title">Proposer un défi</span>
          <span class="gl-badge gl-badge--signal">&#10022; IA assist</span>
        </div>
        <input type="text" class="gl-input gl-creator-dashboard__title-input" value="${escapeHtml(proposedTitle)}" />
        <div class="gl-creator-dashboard__row">
          <div class="gl-creator-dashboard__target">
            <span>Cible</span>
            <input type="number" class="gl-creator-dashboard__target-input" value="${proposedTarget}" />
            <span>tok</span>
          </div>
          <select class="gl-creator-dashboard__tier-select">
            <option>Épique · sub</option>
            <option>Commun</option>
          </select>
        </div>
        <button type="button" class="gl-btn gl-btn--primary gl-creator-dashboard__submit">Valider &amp; ouvrir au vote</button>
      </div>
      <div class="gl-creator-dashboard__queue">
        <div class="gl-creator-dashboard__queue-title">File de validation</div>
        <div class="gl-creator-dashboard__queue-list"></div>
      </div>
    </div>
  `;

  const queueList = el.querySelector('.gl-creator-dashboard__queue-list');
  const titleInput = el.querySelector('.gl-creator-dashboard__title-input');
  const targetInput = el.querySelector('.gl-creator-dashboard__target-input');

  function renderQueueRow(item) {
    const row = document.createElement('div');
    row.className = 'gl-creator-dashboard__queue-row';
    row.innerHTML = `
      <div class="gl-creator-dashboard__queue-item">
        <div class="gl-creator-dashboard__queue-item-title">${escapeHtml(item.title)}</div>
        <div class="gl-creator-dashboard__queue-item-author">proposé par ${escapeHtml(item.author)}</div>
      </div>
      <span class="gl-creator-dashboard__queue-status gl-creator-dashboard__queue-status--${item.status === 'modéré' ? 'moderated' : 'pending'}">${item.status === 'modéré' ? '&#10003; modéré' : 'en attente'}</span>
    `;
    return row;
  }

  function renderQueue() {
    queueList.innerHTML = '';
    state.queue.forEach((item) => queueList.appendChild(renderQueueRow(item)));
  }

  el.querySelector('.gl-creator-dashboard__submit').addEventListener('click', () => {
    const title = titleInput.value.trim();
    if (!title) return;
    const newItem = { title, author: 'toi', status: 'modéré' };
    state.queue = [newItem, ...state.queue];
    renderQueue();
    el.dispatchEvent(new CustomEvent('dashboard:submit', { detail: { ...newItem, target: Number(targetInput.value) } }));
  });

  el.getQueue = () => [...state.queue];
  renderQueue();
  return el;
}
