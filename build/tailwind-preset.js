// Tailwind CSS preset for goallive-design-system.
// Hand-authored (not generated) — copied as-is into dist/ by build/copy-assets.mjs, where it
// sits next to the generated dist/tokens.js and imports it as a sibling module.
//
// ESM by design: package.json declares "type": "module", so a .js file under this package is
// parsed as ESM. Consume it with `import` (see README) — not `require()`.
import { color, font, fontSize, space, radius, effect, motion } from './tokens.js';

const splitFontFamily = (value) => value.split(',').map((part) => part.trim());

/** @type {import('tailwindcss').Config} */
const preset = {
  theme: {
    extend: {
      colors: {
        ...color,
      },
      fontFamily: {
        display: splitFontFamily(font.display),
        'display-alt': splitFontFamily(font['display-alt']),
        sans: splitFontFamily(font.sans),
        mono: splitFontFamily(font.mono),
      },
      fontWeight: font.weight,
      fontSize,
      spacing: space,
      borderRadius: radius,
      backgroundImage: {
        halo: effect.halo,
        'halo-soft': effect['halo-soft'],
        'halo-strong': effect['halo-strong'],
      },
      boxShadow: {
        drop: effect['shadow-drop'],
        'glow-signal': effect['glow-signal'],
      },
      transitionDuration: {
        fast: motion.fast,
        DEFAULT: motion.base,
        slow: motion.slow,
      },
      transitionTimingFunction: {
        DEFAULT: motion.ease,
      },
    },
  },
};

export default preset;
