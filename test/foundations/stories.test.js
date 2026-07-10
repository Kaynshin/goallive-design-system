import { describe, it, expect } from 'vitest';
import { Usage } from '../../stories/foundations/Introduction.stories.js';
import { Palette, NeutralRamp, Contrast } from '../../stories/foundations/Colors.stories.js';
import { Specimen, Scale } from '../../stories/foundations/Typography.stories.js';
import { AllRadii } from '../../stories/foundations/Radii.stories.js';
import { Durations, ShadowAndGlow, Halo } from '../../stories/foundations/Motion.stories.js';

describe('Foundations / Introduction', () => {
  it('renders the "Goal" + signal "live" wordmark and the invariants list', () => {
    const html = Usage.render();
    expect(html).toContain('gl-wordmark');
    expect(html).toContain('<span class="gl-wordmark__live">live</span>');
    expect(html).toContain('Invariants de marque');
    expect(html).toMatch(/dark.{0,40}par défaut|thème sombre.{0,20}par défaut/i);
  });
});

describe('Foundations / Colors', () => {
  it('Palette renders the three brand swatches: Encre, Papier, Signal', () => {
    const html = Palette.render();
    ['Encre', 'Papier', 'Signal'].forEach((name) => expect(html).toContain(name));
    expect(html).toContain('#FF3B1F');
  });

  it('NeutralRamp renders the neutral + signal-state swatches', () => {
    const html = NeutralRamp.render();
    ['ink-900', 'ink-800', 'ink-700', 'ink-600', 'grey-400', 'grey-600', 'paper-50', 'line', 'signal-deep', 'signal-deep-hover', 'signal-soft', 'ok'].forEach(
      (name) => expect(html).toContain(name)
    );
  });

  it('Contrast renders the five WCAG AA contrast pairs from the source bundle', () => {
    const html = Contrast.render();
    ['18,4 : 1', '5,6 : 1', '5,5 : 1', '4,9 : 1', '5,3 : 1'].forEach((ratio) => expect(html).toContain(ratio));
  });
});

describe('Foundations / Typography', () => {
  it('Specimen renders Display XL, H2, the Bricolage variant, H3, body, and caption rows', () => {
    const html = Specimen.render();
    expect(html).toContain('Display XL · Unbounded 800');
    expect(html).toContain('Titre H2 · Unbounded 800');
    expect(html).toContain("Bricolage Grotesque 800");
    expect(html).toContain('H3 · Space Grotesk 700');
    expect(html).toContain('Corps · Space Grotesk');
    expect(html).toContain('Caption · 12–13px');
  });

  it('Scale renders every .gl-t-* utility size', () => {
    const html = Scale.render();
    ['caption', 'sm', 'body', 'lg', 'h3', 'h2', 'display-xl'].forEach((size) => {
      expect(html).toContain(`gl-t-${size}`);
    });
  });
});

describe('Foundations / Radii', () => {
  it('renders the sm/md/lg/pill radius scale', () => {
    const html = AllRadii.render();
    expect(html).toContain('--gl-radius-sm 11px');
    expect(html).toContain('--gl-radius-md 14px');
    expect(html).toContain('--gl-radius-lg 18px');
    expect(html).toContain('--gl-radius-pill 999px');
  });
});

describe('Foundations / Motion', () => {
  it('Durations renders fast/base/slow + the shared ease curve', () => {
    const html = Durations.render();
    expect(html).toContain('--gl-motion-fast');
    expect(html).toContain('150ms');
    expect(html).toContain('--gl-motion-slow');
    expect(html).toContain('360ms');
    expect(html).toMatch(/--gl-motion<\/span> 220ms/);
    expect(html).toContain('cubic-bezier(.3,.7,.2,1)');
  });

  it('ShadowAndGlow renders the shadow-drop and glow-signal demo', () => {
    const html = ShadowAndGlow.render();
    expect(html).toContain('var(--gl-effect-shadow-drop)');
    expect(html).toContain('var(--gl-effect-glow-signal)');
  });

  it('Halo renders the .gl-halo demo reserved for large surfaces', () => {
    const html = Halo.render();
    expect(html).toContain('class="gl-halo"');
  });
});
