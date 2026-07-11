import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, it, expect } from 'vitest';

import { color as colorTokens } from '../dist/tokens.js';
import ButtonMeta, { AllVariants as ButtonAllVariants } from '../stories/atoms/Button.stories.js';
import SupportButtonsMeta, { AllAmounts as SupportButtonsAllAmounts } from '../stories/atoms/SupportButtons.stories.js';
import { Playground as InputPlayground, Search as InputSearch } from '../stories/atoms/Input.stories.js';
import { AllStates as FieldStatesAllStates } from '../stories/atoms/FieldStates.stories.js';
import ChipMeta, { Balance as ChipBalance } from '../stories/atoms/Chip.stories.js';
import { AllPerks as BadgeAllPerks } from '../stories/atoms/Badge.stories.js';
import { AllStates as StateTagAllStates } from '../stories/atoms/StateTag.stories.js';
import TwitchIdentityMeta, { Playground as TwitchIdentityPlayground } from '../stories/atoms/TwitchIdentity.stories.js';
import SwitchMeta, { OnOff as SwitchOnOff } from '../stories/atoms/Switch.stories.js';
import TabsMeta, { Playground as TabsPlayground } from '../stories/atoms/Tabs.stories.js';
import TooltipMeta, { Playground as TooltipPlayground } from '../stories/atoms/Tooltip.stories.js';
import { Playground as SkeletonPlayground } from '../stories/atoms/Skeleton.stories.js';
import { Playground as FocusPlayground } from '../stories/atoms/Focus.stories.js';
import { AllSizes as LiveDotAllSizes, LivePill } from '../stories/atoms/LiveDot.stories.js';
import RollingNumberMeta, { SoldeContributeursViewers } from '../stories/atoms/RollingNumber.stories.js';

// vitest.config.js runs with the project root as the process cwd (see `test.include`).
const root = process.cwd();
const goalliveCss = readFileSync(path.join(root, 'dist/goallive.css'), 'utf8');
const primitivesCss = readFileSync(path.join(root, 'build/primitives.css'), 'utf8');

const SIGNAL = '#FF3B1F';
const SIGNAL_FAMILY = new Set(['#FF3B1F', '#D92C10', '#B8240C', '#E63216']);

// Every neutral/functional hex color legitimately used across the design
// system's tokens and generated markup (ink/paper ramp, greys, hairline
// "line", functional success). Anything found outside this set AND outside
// SIGNAL_FAMILY would be an unauthorized second accent — most importantly,
// any shade of blue, which the brand strictly forbids.
const ALLOWED_NEUTRAL_HEX = new Set([
  '#0B0B0C',
  '#141417',
  '#1E1E22',
  '#2A2A30',
  '#8A8A93',
  '#6B6B74',
  '#FFFFFF',
  '#F5F6FB',
  '#E6E8F0',
  '#1F8A3B',
  '#000000',
]);

function collectHexColors(html) {
  return (html.match(/#[0-9A-Fa-f]{6}/g) || []).map((h) => h.toUpperCase());
}

function isBlueDominant(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return b > r + 15 && b > g + 15;
}

function collectAllGeneratedMarkup() {
  const outputs = [];

  outputs.push(ButtonAllVariants.render(ButtonMeta.args));
  outputs.push(SupportButtonsAllAmounts.render({ ...SupportButtonsMeta.args, interactive: true }));
  outputs.push(InputPlayground.render({ state: 'focus', placeholder: 'Propose un défi…', value: '' }));
  outputs.push(InputSearch.render());
  outputs.push(FieldStatesAllStates.render());
  outputs.push(ChipBalance.render(ChipMeta.args));
  outputs.push(BadgeAllPerks.render());
  outputs.push(StateTagAllStates.render());
  outputs.push(TwitchIdentityPlayground.render(TwitchIdentityMeta.args));
  outputs.push(SwitchOnOff.render(SwitchMeta.args));
  outputs.push(TabsPlayground.render(TabsMeta.args));
  outputs.push(TooltipPlayground.render(TooltipMeta.args));
  outputs.push(SkeletonPlayground.render());
  outputs.push(FocusPlayground.render());
  outputs.push(LiveDotAllSizes.render());
  outputs.push(LivePill.render());
  outputs.push(SoldeContributeursViewers.render().outerHTML);

  return outputs;
}

describe('Cross-cutting invariants', () => {
  it('signal (#FF3B1F) is the single brand accent color: the tokens define no blue anywhere', () => {
    Object.entries(colorTokens).forEach(([name, value]) => {
      if (typeof value !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(value)) return;
      expect(isBlueDominant(value.toUpperCase()), `${name} (${value}) looks blue-dominant`).toBe(false);
    });
  });

  it('every generated atom that renders a hex accent color uses signal, never a second hue', () => {
    const outputs = collectAllGeneratedMarkup();
    const unauthorized = new Set();

    outputs.forEach((html) => {
      collectHexColors(html).forEach((hex) => {
        if (!SIGNAL_FAMILY.has(hex) && !ALLOWED_NEUTRAL_HEX.has(hex)) {
          unauthorized.add(hex);
        }
      });
    });

    expect([...unauthorized]).toEqual([]);
  });

  it('no shade of blue appears anywhere in the shipped stylesheet (dist/goallive.css)', () => {
    const hexes = collectHexColors(goalliveCss);
    const blueHexes = hexes.filter(isBlueDominant);
    expect(blueHexes).toEqual([]);
  });

  it('signal-deep (#D92C10, hover #B8240C) — never pure signal — sits behind white text on the primary button', () => {
    expect(primitivesCss).toMatch(/\.gl-btn--primary\{background:var\(--gl-color-signal-deep\);color:var\(--gl-color-paper\)\}/);
    expect(primitivesCss).toMatch(/\.gl-btn--primary:hover\{background:var\(--gl-color-signal-deep-hover\)\}/);
  });

  it('the wordmark "live" run is always colored signal — "Goal" always inherits the surrounding text color', () => {
    expect(primitivesCss).toContain('.gl-wordmark__live{color:var(--gl-color-signal)}');
  });

  it('the dark theme is the default surface: :root aliases resolve to the *-dark tokens, light is an explicit opt-in', () => {
    const rootBlockMatch = /:root\{([\s\S]*?)\n\}/.exec(goalliveCss);
    expect(rootBlockMatch).not.toBeNull();
    const rootBlock = rootBlockMatch[1];
    expect(rootBlock).toContain('--gl-color-canvas: var(--gl-color-canvas-dark);');
    expect(rootBlock).toContain('--gl-color-text: var(--gl-color-text-dark);');

    const rootIndex = goalliveCss.indexOf(':root{');
    const lightOverrideIndex = goalliveCss.indexOf('[data-theme="light"]');
    expect(lightOverrideIndex).toBeGreaterThan(rootIndex);
  });

  it('the live dot is present and pulses continuously via the shared glpulse keyframes', () => {
    expect(primitivesCss).toContain('@keyframes glpulse{');
    expect(primitivesCss).toMatch(/\.gl-live-dot\{[^}]*animation:glpulse 1\.3s infinite[^}]*\}/);
    const html = LiveDotAllSizes.render();
    expect(html).toContain('gl-live-dot');
  });

  it('reduced motion collapses every animation/transition globally, including the live pulse', () => {
    expect(primitivesCss).toMatch(/@media \(prefers-reduced-motion: reduce\)\{\s*\*\{animation:none!important;transition:none!important\}\s*\}/);
  });

  it('the rolling-number odometer respects prefers-reduced-motion by snapping instantly (no stagger)', async () => {
    const { createRollingNumber } = await import('../src/rolling-number.js');
    const originalMatchMedia = window.matchMedia;
    window.matchMedia = (query) => ({ matches: true, media: query });
    try {
      const el = createRollingNumber({ value: 5 });
      el.update(19);
      const track = el.querySelector('.gl-rolling-number__track');
      expect(track.style.transitionDelay).toBe('0ms');
      expect(track.style.transitionDuration).toBe('0ms');
    } finally {
      window.matchMedia = originalMatchMedia;
    }
  });

  it('never uses the forbidden "pari / mise" vocabulary — only "soutien / défi / goal"', () => {
    const outputs = collectAllGeneratedMarkup();
    outputs.forEach((html) => {
      expect(html.toLowerCase()).not.toMatch(/\bpari\b|\bmise\b/);
    });
  });
});
