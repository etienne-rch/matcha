# 🔁 Synchronisation GitHub ↔ GitLab

Tout le monde travaille sur **GitHub**, puis on synchronise la branche `main` avec **GitLab**. Voici comment configurer votre environnement une bonne fois pour toutes.

---

## 🛠️ Étapes d’installation

1. **Re-clonez le repo depuis GitHub**  
   (Supprimez l’ancien si besoin, puis cloner depuis GitHub)

2. **Dans le dossier cloné, ouvrez un terminal et collez ces commandes :**

```bash
git remote rename origin github
git remote add gitlab git@rendu-git.etna-alternance.net:module-10020/activity-53631/group-1056970

git config user.name "gu_z" # 🔁 Remplacez par votre propre nom d'utilisateur
git config user.email "gu_z@etna-alternance.net" # 🔁 Remplacez par votre adresse email ETNA
```

---

## 🚀 Pour faire un push vers les deux repos (GitHub & GitLab)

À chaque push sur `main`, utilisez les commandes suivantes :

```bash
git push github main
git push gitlab main
```

⛔ **Ne faites jamais de push direct sur GitLab sans passer par GitHub pour la branche `main`**.

---

## 🔐 Si on vous demande un login / mot de passe :

- **Nom d’utilisateur** = votre identifiant ETNA (ex: `seck_b`)  
- **Mot de passe** = collez votre **token GitLab**

---

## ⚠️ Rappels importants

- Toutes les modifs sur la branche `main` doivent **obligatoirement passer par GitHub**.
- Pour vos **commits perso d’e-learning**, créez une **branche à votre nom sur GitLab** et **push uniquement dessus**.
- La **synchronisation automatique ne concerne que la branche `main`**.
- Pour toutes les autres branches : vous pouvez travailler librement, elles ne seront pas synchronisées entre les deux plateformes.

---

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

- Lance **MongoDB** dans Docker (via `docker compose up -d mongo`)
- Démarre :
  - `matcha-api` → serveur Express (TypeScript)
  - `matcha-app` → app mobile Expo

---

### Filtrer un seul package

- **API uniquement :**

  ```bash
  yarn dev -- --filter=matcha-api
  ```

- **App mobile uniquement :**

  ```bash
  yarn dev -- --filter=matcha-app
  ```

_(Le `--` est nécessaire avec Yarn v1 pour transmettre les arguments à Turborepo.)_

---

## Lancer avec Docker

### Conteneurs disponibles

| Service     | Description                                                | Port    |
| ----------- | ---------------------------------------------------------- | ------- |
| **mongo**   | Base de données MongoDB 6                                  | `27017` |
| **api**     | Serveur Express TypeScript (`matcha-api`)                  | `3000`  |
| **cleanup** | Cron job Node.js (suppression d’utilisateurs non vérifiés) | —       |

---

### Commandes Docker utiles

| Commande                                  | Description                                   |
| ----------------------------------------- | --------------------------------------------- |
| `docker compose up -d mongo`              | Lance uniquement la base MongoDB              |
| `docker compose --profile api up --build` | Lance API + Mongo                             |
| `docker compose --profile all up --build` | Lance API + Mongo + Cron job                  |
| `docker compose down`                     | Stoppe et supprime les conteneurs             |
| `docker volume rm matcha_mongo_data`      | Supprime le volume Mongo (⚠️ données perdues) |

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

Les tests utilisent **Jest**, **Supertest** et **MongoDB Memory Server**,
aucune instance Mongo réelle n’est requise.

---

## Scripts globaux

| Script                            | Description                                         |
| --------------------------------- | --------------------------------------------------- |
| `yarn dev`                        | Lance Mongo (Docker) + tous les projets (API + App) |
| `yarn dev -- --filter=matcha-api` | Lance seulement l’API                               |
| `yarn dev -- --filter=matcha-app` | Lance seulement l’app mobile                        |
| `yarn build`                      | Compile tous les projets                            |
| `yarn lint`                       | Lint tous les packages                              |
| `yarn test`                       | Exécute les tests                                   |
| `yarn format`                     | Formate avec Prettier                               |
| `yarn down`                       | Stoppe les conteneurs Docker                        |

---

## Turborepo

Fichier de config : `turbo.json`

Les tâches principales :

- `dev` → exécution parallèle des workspaces
- `build` → dépendances croisées + cache build
- `lint`, `test`, `format` → qualité de code globale

---

## Qualité & CI/CD

### Husky + lint-staged

- Hook `pre-commit` : exécute ESLint & Prettier avant chaque commit.

### ESLint / Prettier

- Config partagée à la racine.
- Imports triés automatiquement via `@trivago/prettier-plugin-sort-imports`.

### GitHub Actions

Une seule pipeline CI à la racine :

- Lint + tests sur `matcha-api`
- Lint + tests sur `matcha-app`

---

## Dockerfiles

| Fichier                      | Description                    |
| ---------------------------- | ------------------------------ |
| `matcha-api/Dockerfile`      | Image principale de l’API      |
| `matcha-api/cron.Dockerfile` | Image du cron job de nettoyage |

Build multi-stage :

1. Compilation TypeScript (`/dist`)
2. Image d’exécution légère (Node Alpine)

---

## Équipe

Projet développé par
**Brenda, Amanda, Erwan, Sonia, Ziwei et Étienne**
dans le cadre du **Master ETNA**.
