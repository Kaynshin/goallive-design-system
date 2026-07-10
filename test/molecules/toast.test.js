import { describe, it, expect } from 'vitest';
import ToastMeta, { Playground, AllKinds } from '../../stories/molecules/Toast.stories.js';

describe('Molecules / Toast', () => {
  it('renders the message and sub text for a confirmation toast', () => {
    const html = Playground.render(ToastMeta.args);
    expect(html).toContain('gl-toast gl-toast--confirmation');
    expect(html).toContain('Soutien confirmé · +25 tok');
    expect(html).toContain('séquestrés sur');
  });

  it('renders the ok/green recredit toast with the ↺ icon', () => {
    const html = Playground.render({ kind: 'recredit', message: 'Goal non financé · +46 tok recrédités', sub: "jamais d'argent" });
    expect(html).toContain('gl-toast gl-toast--recredit');
    expect(html).toContain('↺');
    expect(html).toContain('rgba(31,138,59');
  });

  it('applies the glslidein animation', () => {
    const html = Playground.render(ToastMeta.args);
    expect(html).toContain('animation:glslidein');
  });

  it('AllKinds renders one confirmation and one recredit toast', () => {
    const html = AllKinds.render();
    expect(html).toContain('gl-toast--confirmation');
    expect(html).toContain('gl-toast--recredit');
  });
});
