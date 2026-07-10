import { describe, it, expect } from 'vitest';
import { color, font, fontSize, radius, motion, effect } from '../../dist/tokens.js';

describe('Foundations / Tokens (dist/tokens.js)', () => {
  it('exposes the single brand accent, signal #FF3B1F, and its signal-deep variant for white-text surfaces', () => {
    expect(color.signal).toBe('#FF3B1F');
    expect(color['signal-deep']).toBe('#D92C10');
    expect(color['signal-deep-hover']).toBe('#B8240C');
  });

  it('exposes the strict tricolor neutral ramp — ink, paper, and their shades — with no blue hex anywhere', () => {
    expect(color.ink).toBe('#0B0B0C');
    expect(color.paper).toBe('#FFFFFF');
    Object.entries(color).forEach(([name, value]) => {
      if (typeof value !== 'string' || !value.startsWith('#') || value.length !== 7) return;
      const r = parseInt(value.slice(1, 3), 16);
      const g = parseInt(value.slice(3, 5), 16);
      const b = parseInt(value.slice(5, 7), 16);
      const isBlueDominant = b > r + 15 && b > g + 15;
      expect(isBlueDominant, `${name} (${value}) looks blue-dominant`).toBe(false);
    });
  });

  it('exposes the functional success color', () => {
    expect(color.ok).toBe('#1F8A3B');
  });

  it('exposes the Unbounded display / Space Grotesk sans / Bricolage Grotesque alt families', () => {
    expect(font.display).toContain('Unbounded');
    expect(font.sans).toContain('Space Grotesk');
    expect(font['display-alt']).toContain('Bricolage Grotesque');
  });

  it('exposes the display-xl font size reserved for the hero wordmark', () => {
    expect(fontSize['display-xl']).toBe('clamp(48px,8vw,104px)');
  });

  it('exposes the radius scale — sm 11 / md 14 / lg 18 / pill 999', () => {
    expect(radius.sm).toBe('11px');
    expect(radius.md).toBe('14px');
    expect(radius.lg).toBe('18px');
    expect(radius.pill).toBe('999px');
  });

  it('exposes the motion durations and shared ease curve', () => {
    expect(motion.fast).toBe('150ms');
    expect(motion.base).toBe('220ms');
    expect(motion.slow).toBe('360ms');
    expect(motion.ease).toBe('cubic-bezier(.3,.7,.2,1)');
  });

  it('exposes the shadow-drop and glow-signal effects', () => {
    expect(effect['shadow-drop']).toBe('0 8px 24px rgba(0,0,0,.45)');
    expect(effect['glow-signal']).toContain('rgba(255,59,31');
  });
});
