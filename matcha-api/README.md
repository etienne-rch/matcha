# matcha-api

**matcha-api** est une API REST robuste construite avec **Node.js**, **TypeScript**, **Express** et **MongoDB Atlas**. Elle est conçue avec une architecture modulaire pour faciliter l’évolutivité, la lisibilité et la maintenance.

---

## Fonctionnalités

- Architecture claire et modulaire
- Connexion à MongoDB Atlas via le driver natif `mongodb`
- Schémas de validation avec `zod`
- Linting & formatage avec ESLint + Prettier
- Tri automatique des imports (Prettier plugin)
- Tests unitaires avec Jest
- Chargement sécurisé des variables d’environnement avec dotenv
- Structure extensible pour services, middlewares, validations, etc.

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/ton-utilisateur/matcha-api.git
cd matcha-api

# Installer les dépendances
yarn install

# Configurer les variables d’environnement
cp .env.example .env
# Remplir .env avec les bonnes valeurs
```

---

## Scripts disponibles

| Script          | Description                                            |
| --------------- | ------------------------------------------------------ |
| `yarn dev`      | Lance le serveur en mode développement (`ts-node-dev`) |
| `yarn build`    | Compile le code TypeScript en JavaScript (`dist/`)     |
| `yarn start`    | Exécute l'app compilée avec Node.js                    |
| `yarn lint`     | Vérifie les erreurs de style avec ESLint               |
| `yarn lint:fix` | Corrige automatiquement les erreurs de lint            |
| `yarn format`   | Formate le code avec Prettier                          |
| `yarn test`     | Lance les tests unitaires avec Jest                    |

---

## Variables d’environnement

Fichier `.env` :

```env
PORT=3000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/matcha?retryWrites=true&w=majority
APP_NAME=matcha-api
NODE_ENV=development
```

---

## Structure du projet

```
matcha-api/
├── src/
│   ├── config/          # Connexions (ex: MongoDB)
│   ├── controllers/     # Logique métier des routes
│   ├── models/          # Schémas de validation (zod)
│   ├── routes/          # Déclaration des routes Express
│   ├── middlewares/     # Middlewares personnalisés
│   ├── services/        # Logique métier, accès DB
│   ├── utils/           # Fonctions utilitaires (logs, validations...)
│   ├── tests/           # Tests unitaires (Jest)
│   ├── app.ts           # App Express : routes, middlewares, etc.
│   └── index.ts         # Point d’entrée : DB + server
├── .env
├── .env.example
├── eslint.config.js
├── prettier.config.cjs
├── .gitignore
├── tsconfig.json
├── jest.config.cjs
└── README.md
```

---

## Conventions & bonnes pratiques

### 🧱 Structure du code

- **MVC + services** : aucune logique métier ou DB dans les routes.
- **Controllers** = orchestrateurs simples, sans logique métier profonde.
- **Services** = couche métier, appel au driver `mongodb`.
- **Validations** faites dans `models/` avec `zod`.
- **Middlewares** = réutilisables, testables, sans effet de bord.

### 🧠 Nommage & code

- Dossiers et fichiers en **kebab-case** : `user.controller.ts`, `auth.routes.ts`
- Classes en **PascalCase**, variables & fonctions en **camelCase**
- Variables d’environnement typées avec `zod`
- Fonctions **unitaires, claires, typées**, pas de `any` non justifié

### 🔍 Lint / format

- Lint obligatoire (ESLint avec config stricte)
- Formatage automatique avec Prettier
- Tri des imports avec `@trivago/prettier-plugin-sort-imports`
- Hook `pre-commit` (Husky) avec `lint-staged` : **pas de commit si erreurs**

### 🧪 Tests

- Un test minimum par controller/service
- Nom des fichiers : `*.test.ts` ou `*.spec.ts`
- Utilisation de **Supertest** pour tester les routes HTTP

### 🛡️ Sécurité & robustesse

- Ne jamais logger d’infos sensibles
- Toujours gérer les erreurs avec le middleware `errorHandler`
- DB connectée avant de lancer l’API (dans `index.ts`)
- Pas de logique dans les routes (juste appel au controller)

### ♻️ Git & CI

- Commits avec convention (`feat:`, `fix:`, `chore:`...)
- Branche `main` = stable, **tests & lint passent en CI**
- CI GitHub Actions dans `.github/workflows/ci.yml`
- Pull requests avec review avant merge

---

## Licence

MIT — libre d’utilisation, de modification et de distribution.
