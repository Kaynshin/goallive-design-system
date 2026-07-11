// Cross-platform asset assembly step, run after style-dictionary.config.mjs.
//  1. Assemble dist/goallive.css = @font-face (build/fontface.css) + generated tokens
//     (dist/_gl-tokens.css) + hand-authored primitives (build/primitives.css).
//  2. Copy the self-hosted Unbounded/Space Grotesk/Bricolage Grotesque woff2 files
//     + OFL license into dist/fonts/.
//  3. Copy the tailwind preset source into dist/.
//  4. Copy the vanilla component builders (goal-gauge, rolling-number) + their
//     .d.ts into dist/, so they're importable via package.json `exports`.
import { readFile, writeFile, rm, mkdir, cp } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(fileURLToPath(new URL('.', import.meta.url)), '..');
const dist = path.join(root, 'dist');

async function assembleCss() {
  const [fontface, tokens, primitives, components] = await Promise.all([
    readFile(path.join(root, 'build/fontface.css'), 'utf8'),
    readFile(path.join(dist, '_gl-tokens.css'), 'utf8'),
    readFile(path.join(root, 'build/primitives.css'), 'utf8'),
    readFile(path.join(root, 'build/components.css'), 'utf8'),
  ]);

  const banner = `/*!
 * goallive-design-system — dist/goallive.css
 * Generated file: fonts (build/fontface.css) + tokens (tokens/*.tokens.json via Style Dictionary)
 * + primitives (build/primitives.css) + components (build/components.css). Do not edit directly.
 */\n`;

  const css = [banner, fontface.trim(), '', tokens.trim(), '', primitives.trim(), '', components.trim(), ''].join('\n');
  await writeFile(path.join(dist, 'goallive.css'), css, 'utf8');
  await rm(path.join(dist, '_gl-tokens.css'));
  console.log('✔ dist/goallive.css assembled');
}

async function copyFonts() {
  const destDir = path.join(dist, 'fonts');
  await mkdir(destDir, { recursive: true });
  await cp(path.join(root, 'assets/fonts'), destDir, { recursive: true });
  console.log('✔ dist/fonts/');
}

async function copyTailwindPreset() {
  await cp(path.join(root, 'build/tailwind-preset.js'), path.join(dist, 'tailwind-preset.js'));
  console.log('✔ dist/tailwind-preset.js');
}

async function copyComponents() {
  for (const f of ['goal-gauge.js', 'rolling-number.js', 'goal-gauge.d.ts', 'rolling-number.d.ts']) {
    await cp(path.join(root, 'src', f), path.join(dist, f));
  }
  console.log('✔ dist/ component builders');
}

await mkdir(dist, { recursive: true });
await assembleCss();
await copyFonts();
await copyTailwindPreset();
await copyComponents();
