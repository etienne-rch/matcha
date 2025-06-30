<<<<<<< HEAD
# Matcha

Ce projet utilise **Turborepo** pour gérer efficacement plusieurs packages dans un seul dépôt.

---

## Structure du projet

```
matcha/
├── ...
├── matcha-app/       # Application mobile React Native (Expo)
├── matcha-api/       # API backend en Express (TypeScript)
├── package.json      # Scripts, dépendances partagées, config Turborepo
├── turbo.json        # Pipeline des tâches
├── ...
```

---

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org) v20+
- [Yarn v1](https://classic.yarnpkg.com/lang/en/)

### Installation

```bash
yarn install
```

### Lancer les projets en développement

```bash
yarn dev
```

Cela exécute en parallèle :

- `matcha-api` avec `ts-node-dev`
- `matcha-app` avec `expo start`

---

## Scripts globaux (racine)

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `yarn dev`          | Démarre tous les projets en mode dev |
| `yarn build`        | Build de tous les projets            |
| `yarn lint`         | Lint tous les projets avec ESLint    |
| `yarn test`         | Lance tous les tests Jest            |
| `yarn format`       | Formate tout avec Prettier           |
| `yarn format:check` | Vérifie les fichiers formatés        |

---

## Turborepo

Fichier de configuration : `turbo.json`

---

## Qualité de code

### Husky + lint-staged

- Hook `pre-commit` : lance ESLint, Prettier, et Jest (tests liés au commit)
- Configuré à la racine pour tous les packages

### ESLint / Prettier

- Configs propres à chaque projet
- Prettier partagé à la racine

---

## CI/CD

Le monorepo utilise **une seule configuration GitHub Actions à la racine** (`.github/workflows/ci.yml`), avec des jobs séparés pour :

- `matcha-api` (tests, lint)
- `matcha-app` (tests, lint)

---

## Crédit

Projet développé par Brenda, Amanda, Erwan, Sonia, Ziwei et Etienne dans le cadre du Master ETNA.