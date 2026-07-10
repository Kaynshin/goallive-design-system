# Architecture technique

## Vue d'ensemble

```
tokens/*.tokens.json         Source de vérité (DTCG $value/$type)
        │  Style Dictionary v4 (build/style-dictionary.config.mjs)
        ▼
dist/_gl-tokens.css  ─┐
build/fontface.css   ─┼─ copy-assets.mjs ─▶ dist/goallive.css
build/primitives.css ─┘
tokens ──▶ dist/tokens.js (+ .d.ts)
build/tailwind-preset.js ──▶ dist/tailwind-preset.js
assets/fonts/*.woff2 ──▶ dist/fonts/
```

## Modules

- **`tokens/`** — couleur, typographie, espacement, rayon, effet (halo/ombres), motion.
- **`build/`**
  - `style-dictionary.config.mjs` : formats custom `gl/css`, `gl/js`, `gl/ts` (préfixe `gl`,
    alias sémantiques de thème **sombre par défaut**).
  - `copy-assets.mjs` : assemble `dist/goallive.css` (fontface + tokens + primitives),
    copie les fonts et le preset.
  - `primitives.css` : classes composites `.gl-*` hand-authored.
  - `fontface.css` : `@font-face` self-hosted (Unbounded, Space Grotesk, Bricolage Grotesque).
  - `tailwind-preset.js` : preset consommant `dist/tokens.js`.
- **`.storybook/`** — config `@storybook/html-vite`, `staticDirs: ['../dist']`, addon a11y, toggle de thème.
- **`stories/`** — Atomic Design (foundations, atoms, molecules, organisms). HTML pur + modules
  JS pour les composants animés (RollingNumber, GoalGauge, organisms).
- **`test/`** — Vitest + happy-dom : un fichier par composant + `invariants.test.js`.
- **`dist/`** — généré, gitignoré, publié dans le package npm (`files: ["dist"]`).

## Flux de données (tokens)

Éditer un token → `npm run build` régénère `dist/` → Storybook et tests consomment `dist/` →
changeset → `npm run release` (build + `changeset publish`).

## CI (prête, activable avec un remote GitHub)

- `test.yml` : `npm ci && npm test` sur push/PR.
- `pages.yml` : `npm run build-storybook` + déploiement GitHub Pages sur push `main`.
- `release.yml` : changesets → publication npm (secret `NPM_TOKEN`).
