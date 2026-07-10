/**
 * RechargeModal organism — the token top-up modal (section `#organisms`,
 * "Modale de recharge"; screen 03 of the Showcase, light theme). 2 / 5 / 10 /
 * 20 / 50 / 100 € tiers, 1 € = 10 tok, 10 € flagged "POPULAIRE" by default.
 */

const TIERS = [
  { price: 2, tok: 20 },
  { price: 5, tok: 50 },
  { price: 10, tok: 100, popular: true },
  { price: 20, tok: 200 },
  { price: 50, tok: 500 },
  { price: 100, tok: 1000 },
];

export function createRechargeModal(options = {}) {
  const { selected = 10, tiers = TIERS } = options;
  const state = { selected };

  const el = document.createElement('div');
  el.className = 'gl-recharge-modal';
  el.innerHTML = `
    <div class="gl-recharge-modal__title">Recharge de tokens</div>
    <div class="gl-recharge-modal__subtitle">Paiement sécurisé via Stripe. 1&nbsp;&euro; = 10&nbsp;tok.</div>
    <div class="gl-recharge-modal__tiers"></div>
    <button type="button" class="gl-btn gl-btn--primary gl-recharge-modal__pay"></button>
    <div class="gl-recharge-modal__note">&#128274; Aucune notion de pari — seulement du soutien.</div>
  `;

  const tiersEl = el.querySelector('.gl-recharge-modal__tiers');
  const payBtn = el.querySelector('.gl-recharge-modal__pay');

  function render() {
    tiersEl.innerHTML = '';
    tiers.forEach((t) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'gl-recharge-modal__tier' + (t.price === state.selected ? ' gl-recharge-modal__tier--selected' : '');
      card.dataset.price = String(t.price);
      card.innerHTML = `
        ${t.popular ? '<span class="gl-recharge-modal__badge">POPULAIRE</span>' : ''}
        <div class="gl-recharge-modal__price">${t.price}&nbsp;&euro;</div>
        <div class="gl-recharge-modal__tok">${t.tok} tok</div>
      `;
      card.addEventListener('click', () => {
        state.selected = t.price;
        render();
      });
      tiersEl.appendChild(card);
    });
    const current = tiers.find((t) => t.price === state.selected) || tiers[0];
    payBtn.textContent = `Payer ${current.price} € · Stripe`;
  }

  render();
  el.getSelected = () => state.selected;
  return el;
}
