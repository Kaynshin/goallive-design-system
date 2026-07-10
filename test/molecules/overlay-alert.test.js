import { describe, it, expect } from 'vitest';
import OverlayAlertMeta, { Playground, Static } from '../../stories/molecules/OverlayAlert.stories.js';

describe('Molecules / Overlay Alert', () => {
  it('renders the "GOAL UNLOCKED" / "GO ALIVE" copy and the creator name', () => {
    const html = Playground.render(OverlayAlertMeta.args);
    expect(html).toContain('GOAL UNLOCKED');
    expect(html).toContain('GO ALIVE');
    expect(html).toContain('Nyxoraa');
  });

  it('interpolates a different creator name', () => {
    const html = Playground.render({ ...OverlayAlertMeta.args, creator: 'Korrigan_TV' });
    expect(html).toContain('Korrigan_TV relève le défi');
  });

  it('renders the live dot signal indicator', () => {
    const html = Playground.render(OverlayAlertMeta.args);
    expect(html).toContain('gl-live-dot gl-live-dot--lg');
  });

  it('applies the glslidein animation when animated is true', () => {
    const html = Playground.render({ ...OverlayAlertMeta.args, animated: true });
    expect(html).toContain('animation:glslidein');
  });

  it('the Static variant renders without the slide-in animation', () => {
    const html = Static.render(OverlayAlertMeta.args);
    expect(html).not.toContain('animation:glslidein');
  });
});
