# 3. Storybook + tests unitaires

Date : 2026-07-10
Statut : accepté

## Contexte

Le design system a besoin d'une vitrine interactive et d'un filet de sécurité contre les
régressions (notamment les invariants de marque : accent signal unique, wordmark, tricolore).

## Décision

- **Storybook** `@storybook/html-vite` (HTML pur, cohérent avec un DS framework-agnostique),
  addon `a11y`, organisé en Atomic Design (foundations, atoms, molecules, organisms),
  toggle de thème sombre/clair. `staticDirs: ['../dist']` sert les tokens + fonts générés.
- **Tests** Vitest + happy-dom : un fichier par composant (render/builders des stories) +
  `test/invariants.test.js` qui verrouille les invariants de marque Goallive.
- Le build Storybook et les tests dépendent de `dist/` → `npm run build` d'abord.

## Alternatives écartées

- **Storybook React** : incohérent avec un DS sans framework.
- **Tests visuels/snapshot lourds** : coût de maintenance élevé ; on garde des tests de
  structure + invariants, rapides et déterministes.

## Conséquences

- Toute nouvelle brique = une story + un test dans la même PR.
- Les invariants de marque cassent le build s'ils sont violés (ex. réintroduction de bleu).
- Storybook déployable en statique (`build-storybook`) pour publication (GitHub Pages).
