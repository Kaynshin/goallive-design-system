import { describe, it, expect } from 'vitest';
import TooltipMeta, { Playground } from '../../stories/atoms/Tooltip.stories.js';

describe('Atoms / Tooltip', () => {
  it('renders the trigger label and the tooltip bubble text', () => {
    const html = Playground.render(TooltipMeta.args);
    expect(html).toContain('Vote pondéré ×2');
    expect(html).toContain('gl-tooltip__bubble');
    expect(html).toContain('Réservé aux subs de la chaîne');
  });

  it('renders custom label/tooltip text', () => {
    const html = Playground.render({ label: 'Aide', tooltip: 'Texte custom' });
    expect(html).toContain('>Aide</button>');
    expect(html).toContain('Texte custom');
  });
});
