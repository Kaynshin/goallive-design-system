/**
 * BackofficeStats organism — the operator dashboard measuring participation
 * rate, the platform's #1 metric (section `#organisms`, "Back-office · stats";
 * screen 11 of the Showcase). Participation %, contributors, tokens released,
 * and a small session-over-session bar chart.
 */

export function createBackofficeStats(options = {}) {
  const { participation = 72, contributors = 340, tokensReleased = 1240, bars = [40, 62, 50, 78, 90, 100] } = options;

  const el = document.createElement('div');
  el.className = 'gl-backoffice-stats';
  el.innerHTML = `
    <div class="gl-backoffice-stats__grid">
      <div class="gl-backoffice-stats__metric">
        <div class="gl-backoffice-stats__label">Participation</div>
        <div class="gl-backoffice-stats__value gl-backoffice-stats__value--signal"><span class="gl-backoffice-stats__participation">${participation}</span><span class="gl-backoffice-stats__unit">%</span></div>
      </div>
      <div class="gl-backoffice-stats__metric">
        <div class="gl-backoffice-stats__label">Contributeurs</div>
        <div class="gl-backoffice-stats__value"><span class="gl-backoffice-stats__contributors">${contributors}</span></div>
      </div>
      <div class="gl-backoffice-stats__metric">
        <div class="gl-backoffice-stats__label">Tokens libérés</div>
        <div class="gl-backoffice-stats__value gl-backoffice-stats__value--signal"><span class="gl-backoffice-stats__tokens">${tokensReleased}</span></div>
      </div>
    </div>
    <div class="gl-backoffice-stats__divider"></div>
    <div class="gl-backoffice-stats__chart-label">Participation &middot; sessions récentes</div>
    <div class="gl-backoffice-stats__chart"></div>
  `;

  const chart = el.querySelector('.gl-backoffice-stats__chart');
  const max = Math.max(...bars);
  bars.forEach((h) => {
    const bar = document.createElement('div');
    bar.className = 'gl-backoffice-stats__bar' + (h === max ? ' gl-backoffice-stats__bar--peak' : '');
    bar.style.height = `${h}%`;
    chart.appendChild(bar);
  });

  return el;
}
