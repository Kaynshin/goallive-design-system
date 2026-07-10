# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/). Versionnage : [SemVer](https://semver.org/lang/fr/).

## [Unreleased]

### Added

- Fondation : design tokens Goallive (couleur tricolore encre/papier/signal, typographie
  Unbounded/Space Grotesk/Bricolage Grotesque, espacement, rayons, effet halo, motion) au
  format DTCG, pipeline Style Dictionary → `dist/goallive.css` + `dist/tokens.js`/`.d.ts` +
  preset Tailwind. Polices self-hosted (woff2).
- Thème sombre par défaut, thème clair via `.gl-light` / `[data-theme="light"]`.
- Primitives CSS `.gl-*` (wordmark, boutons, jauge, badges, chips, tags, point live, halo).
- Storybook (`@storybook/html-vite`, addon a11y, Atomic Design, toggle de thème) : foundations,
  atoms, molecules, organisms.
- Composants signature : compteur roulant (RollingNumber) et jauge de goal (GoalGauge).
- Tests Vitest + happy-dom par composant + invariants de marque.
- Documentation `docs/` (design system, stratégie, architecture, ADR).
