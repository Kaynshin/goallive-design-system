import './recharge-modal.css';
import { createRechargeModal } from './recharge-modal.js';

/**
 * Organisms / Recharge Modal — `.gl-recharge-modal`. 2/5/10/20/50/100 € tiers,
 * 1 € = 10 tok (section `#organisms`, "Modale de recharge"; screen 03 of the
 * Showcase — canonically light theme).
 */
export default {
  title: 'Organisms/Recharge Modal',
  parameters: { layout: 'padded' },
  argTypes: {
    selected: { control: 'select', options: [2, 5, 10, 20, 50, 100] },
  },
  args: {
    selected: 10,
  },
};

export const Playground = {
  render: (args) => createRechargeModal(args),
};
