/**
 * ChallengeCard organism — assembled from the GoalGauge molecule (section
 * `#organisms`, "Carte de défi" of "Goallive Design System (standalone).html").
 * Status/tier tags, title, description, the live gauge, and the support +
 * share actions. Clicking "Soutenir" bids the configured `supportAmount`
 * straight onto the embedded gauge.
 */
import { createGoalGauge } from '../../src/goal-gauge.js';

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

export function createChallengeCard(options = {}) {
  const {
    status = 'Actif',
    tier = 'Épique · SUB',
    title = 'Finir le Nightmare sans checkpoint',
    description = 'Une seule run, zéro mort. Si la communauté remplit le goal, Nyxoraa tente le run en direct, immédiatement.',
    current = 120,
    target = 300,
    supportAmount = 25,
  } = options;

  const el = document.createElement('div');
  el.className = 'gl-challenge-card';

  el.innerHTML = `
    <div class="gl-challenge-card__tags">
      <span class="gl-tag gl-tag--active">${escapeHtml(status)}</span>
      <span class="gl-tag">${escapeHtml(tier)}</span>
    </div>
    <h3 class="gl-challenge-card__title">${escapeHtml(title)}</h3>
    <p class="gl-challenge-card__desc">${escapeHtml(description)}</p>
    <div class="gl-challenge-card__gauge"></div>
    <div class="gl-challenge-card__actions">
      <button type="button" class="gl-btn gl-btn--primary gl-challenge-card__support">Soutenir&nbsp;&middot; +${supportAmount}</button>
      <button type="button" class="gl-btn gl-btn--ghost">Partager</button>
    </div>
  `;

  const gauge = createGoalGauge({ current, target, label: 'GOAL', caption: title });
  el.querySelector('.gl-challenge-card__gauge').appendChild(gauge);

  el.querySelector('.gl-challenge-card__support').addEventListener('click', () => {
    gauge.setCurrent(gauge.getState().current + supportAmount);
  });

  el.gauge = gauge;
  return el;
}
