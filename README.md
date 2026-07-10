# goallive-design-system

Design system **Goallive** distribuable, agnostique de framework, sans dépendance runtime.
La plateforme où la communauté d'un créateur finance en tokens des défis réalisés en live.

Marque **tricolore** — encre, papier, signal (aucun bleu). Thème **sombre par défaut**
(live, overlay OBS), thème clair en alternate.

## Installation

```bash
npm i goallive-design-system
```

## Usage

### CDN (CSS seul)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/goallive-design-system/dist/goallive.css">
```

### Tailwind CSS

```js
// tailwind.config.mjs
import glPreset from 'goallive-design-system/tailwind';

export default {
  presets: [glPreset],
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
};
```

Le paquet déclare `"type": "module"` : le preset s'importe avec `import`, pas `require`.

### JS / TS (tokens bruts)

```ts
import { color, font, fontSize, space, radius, effect, motion } from 'goallive-design-system';

color.signal;   // #FF3B1F
font.display;   // "'Unbounded', sans-serif"
```

### Variables CSS

Après import de `goallive.css`, les variables `--gl-*` sont disponibles sur `:root` :

- Marque : `--gl-color-signal`, `--gl-color-signal-deep`, `--gl-color-signal-soft`, `--gl-color-ink`, `--gl-color-paper`
- Rampe : `--gl-color-ink-900…600`, `--gl-color-grey-400/600`, `--gl-color-paper-50`, `--gl-color-line`
- Typo : `--gl-font-display`, `--gl-font-display-alt`, `--gl-font-sans`, `--gl-font-mono`, `--gl-font-weight-*`, `--gl-font-size-*`
- Espacement / rayons : `--gl-space-*`, `--gl-radius-*`
- Effet / motion : `--gl-effect-halo`, `--gl-motion-*`

Alias sémantiques qui basculent de thème (`--gl-color-canvas`, `--gl-color-surface`,
`--gl-color-surface-elevated`, `--gl-color-text`, `--gl-color-text-muted`, `--gl-color-hairline`) :
valeurs **sombres par défaut** sur `:root`, remplacées en clair via `.gl-light` ou
`[data-theme="light"]` sur un ancêtre.

## Règles de marque

- Un seul accent : signal `#FF3B1F`. Pas de bichromie, aucun bleu. `signal-deep` (`#D92C10`)
  est la variante pour texte blanc AA / boutons, jamais un second accent.
- Wordmark « Goallive » : la partie « live » est toujours en signal (`.gl-wordmark__live`),
  double « l » distinct, point du « i » = voyant live. « Goal » suit la couleur du texte.
- Le halo signal (`--gl-effect-halo`) est réservé aux grandes surfaces (héro, overlay).

## Faire évoluer le design system

1. Éditer les fichiers sous `tokens/` (format DTCG). Seule source de vérité ; `dist/` est généré.
2. `npm run build` régénère `dist/`.
3. Ouvrir un changeset (`npm run changeset`).
4. Publier (`npm run release`).

`tokens/` doit rester synchronisé avec le bundle Claude Design
(`reference/Goallive Design System (standalone).html`).

## Storybook

Vue d'ensemble interactive de chaque composant (Atomic Design : foundations, atoms,
molecules, organisms), toggle de thème sombre/clair, controls par composant.

```bash
npm run storybook   # http://localhost:6006 (build dist/ d'abord)
```

`npm run build-storybook` génère `storybook-static/` (gitignored).

## Tests

Tests unitaires des composants (Vitest + happy-dom) + `test/invariants.test.js` qui
verrouille les invariants de marque (accent signal unique, wordmark, tricolore, thème
sombre par défaut).

```bash
npm test
npm run test:watch
```

## Catalog

Vitrine statique des tokens et primitives : [`catalog/index.html`](./catalog/index.html)
(ouvrir dans un navigateur, importe `../dist/goallive.css`).

## Ajouter un composant

1. Créer la story `stories/<foundations|atoms|molecules|organisms>/<Composant>.stories.js`.
2. Ajouter le test `test/<niveau>/<composant>.test.js`.
3. `npm run storybook` (rendu) et `npm test` (vert).
4. PR `feature/*` → `dev` → `main`.

## Licence

MIT.
