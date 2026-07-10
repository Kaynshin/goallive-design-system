import { describe, it, expect } from 'vitest';
import { createRechargeModal } from '../../stories/organisms/recharge-modal.js';

describe('Organisms / Recharge Modal — recharge-modal.js', () => {
  it('renders the six 2/5/10/20/50/100 € tiers', () => {
    const modal = createRechargeModal();
    const tiers = modal.querySelectorAll('.gl-recharge-modal__tier');
    expect(tiers).toHaveLength(6);
    const prices = [...tiers].map((t) => t.dataset.price);
    expect(prices).toEqual(['2', '5', '10', '20', '50', '100']);
  });

  it('flags the 10 € tier as "POPULAIRE" and no other tier', () => {
    const modal = createRechargeModal();
    const tiers = [...modal.querySelectorAll('.gl-recharge-modal__tier')];
    const popular = tiers.filter((t) => t.querySelector('.gl-recharge-modal__badge'));
    expect(popular).toHaveLength(1);
    expect(popular[0].dataset.price).toBe('10');
  });

  it('defaults to the 10 € tier selected, and the pay button reflects it', () => {
    const modal = createRechargeModal();
    expect(modal.getSelected()).toBe(10);
    expect(modal.querySelector('.gl-recharge-modal__pay').textContent).toContain('10');
    expect(modal.querySelector('.gl-recharge-modal__pay').textContent).toContain('Stripe');
    const selectedTier = modal.querySelector('.gl-recharge-modal__tier--selected');
    expect(selectedTier.dataset.price).toBe('10');
  });

  it('clicking a tier selects it and updates the pay button label', () => {
    const modal = createRechargeModal();
    const fiveEuroTier = modal.querySelector('[data-price="5"]');
    fiveEuroTier.click();
    expect(modal.getSelected()).toBe(5);
    expect(modal.querySelector('.gl-recharge-modal__pay').textContent).toContain('5');
    expect(modal.querySelector('.gl-recharge-modal__tier--selected').dataset.price).toBe('5');
  });

  it('renders the "no betting" reassurance note', () => {
    const modal = createRechargeModal();
    expect(modal.textContent).toContain('Aucune notion de pari');
  });
});
