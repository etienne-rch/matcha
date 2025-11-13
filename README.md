# Matcha

Projet monolithique utilisant **Turborepo** pour orchestrer plusieurs packages (API, app mobile, scripts) dans un même dépôt.

---

## Structure du projet

```bash
matcha/
├── matcha-api/       # API backend en Express (TypeScript, MongoDB)
├── matcha-app/       # Application mobile React Native (Expo)
├── docker-compose.yml # Stack Docker (MongoDB + API + Cron job)
├── package.json      # Dépendances et scripts globaux
├── turbo.json        # Configuration Turborepo
└── ...
```

---

## Prérequis

- [Node.js](https://nodejs.org) **v20+**
- [Yarn Classic (v1)](https://classic.yarnpkg.com/lang/en/)
- [Docker & Docker Compose](https://docs.docker.com/get-docker/)

---

## Installation

Depuis la racine du projet :

```bash
yarn install
```

---

## Démarrage en développement

### Démarrer toute la stack (Mongo + API + App mobile)

```bash
yarn dev
```

Cela :

- Lance **MongoDB** via Docker (`docker compose up -d mongo`)
- Démarre :
  - `matcha-api` → serveur Express (TypeScript)
  - `matcha-app` → app mobile Expo

---

### Filtrer un seul package

- **API uniquement :**

  ```bash
  yarn dev:api
  ```

- **App mobile uniquement :**

  ```bash
  yarn dev:app
  ```

_(Le `--filter` est géré directement par Turborepo dans les scripts.)_

---

## Commandes MongoDB (Docker)

| Commande           | Description                            |
| ------------------ | -------------------------------------- |
| `yarn mongo:start` | Démarre uniquement MongoDB dans Docker |
| `yarn mongo:stop`  | Stoppe le conteneur Mongo              |
| `yarn mongo:logs`  | Affiche les logs Mongo en temps réel   |
| `yarn down`        | Stoppe tous les conteneurs Docker      |

---

## Lancer avec Docker (stack complète)

| Service     | Description                                                | Port    |
| ----------- | ---------------------------------------------------------- | ------- |
| **mongo**   | Base de données MongoDB 6                                  | `27017` |
| **api**     | Serveur Express TypeScript (`matcha-api`)                  | `3000`  |
| **cleanup** | Cron job Node.js (suppression d’utilisateurs non vérifiés) | —       |

Commandes utiles :

```bash
docker compose --profile api up --build   # API + Mongo
docker compose --profile all up --build   # API + Mongo + Cron job
docker compose down                       # Arrête les conteneurs
docker volume rm matcha_mongo_data        # Supprime les données Mongo (irréversible)
```

---

## Tests

### Tous les tests du monorepo

```bash
yarn test
```

### Tests de l’API uniquement

```bash
cd matcha-api
yarn test
```

Les tests utilisent **Jest**, **Supertest** et **MongoDB Memory Server** :
aucune instance Mongo réelle n’est requise.

---

## Scripts globaux

| Script              | Description                                           |
| ------------------- | ----------------------------------------------------- |
| `yarn dev`          | Démarre Mongo (Docker) + tous les projets (API + App) |
| `yarn dev:api`      | Démarre Mongo + uniquement l’API                      |
| `yarn dev:app`      | Lance uniquement l’app mobile                         |
| `yarn build`        | Compile tous les projets                              |
| `yarn lint`         | Lint tous les packages                                |
| `yarn test`         | Exécute tous les tests                                |
| `yarn format`       | Formate le code avec Prettier                         |
| `yarn format:check` | Vérifie le formatage                                  |
| `yarn mongo:start`  | Démarre MongoDB dans Docker                           |
| `yarn mongo:stop`   | Stoppe MongoDB                                        |
| `yarn down`         | Stoppe tous les conteneurs Docker                     |

---

## Turborepo

Fichier de config : `turbo.json`

Les principales tâches :

- `dev` → exécution parallèle des workspaces
- `build` → dépendances croisées + cache de build
- `lint`, `test`, `format` → qualité de code globale

---

## Qualité & CI/CD

### Husky + lint-staged

- Hook `pre-commit` : exécute ESLint & Prettier avant chaque commit.

### ESLint / Prettier

- Config partagée à la racine.
- Imports triés automatiquement via `@trivago/prettier-plugin-sort-imports`.

### GitHub Actions

Une seule pipeline CI/CD à la racine :

- Lint + tests sur `matcha-api`
- Lint + tests sur `matcha-app`

---

## Dockerfiles

| Fichier                      | Description                         |
| ---------------------------- | ----------------------------------- |
| `matcha-api/Dockerfile`      | Image principale de l’API (Express) |
| `matcha-api/cron.Dockerfile` | Image du cron job de nettoyage      |

Build multi-stage :

1. Compilation TypeScript (`/dist`)
2. Image d’exécution légère (Node Alpine)

---

## Équipe

Projet développé par
**Brenda, Amanda, Erwan, Sonia, Ziwei et Étienne**
dans le cadre du **Master ETNA**.
