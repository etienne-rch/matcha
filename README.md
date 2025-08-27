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

### Lancer matcha-api sur Docker

Dans le dossier matcha-api

- docker compose build
- docker compose up
  Cela démarre :
  le conteneur de matcha-api (Node.js / Express / TypeScript)
  le conteneur MongoDB (mongo:6)
  avec un volume data/mongo pour persister la base

# arrêter proprement les conteneurs

docker compose down

# supprimer le volume de données (ATTENTION : perte totale des données)

docker volume rm data/mongo

# relancer le conteneur

docker compose up -d

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
