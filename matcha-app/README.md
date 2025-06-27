# Matcha App

**Matcha App** est une application mobile construite avec **React Native** (via **Expo**) et **TypeScript**, intégrée à **Firebase** pour l'authentification et connectée à une API REST Node.js. L'objectif est de fournir une base solide et modulaire pour développer une application mobile moderne.

---

## Fonctionnalités principales

- Initialisation avec **Expo** (sans sous-dossier inutile)
- Typage strict avec **TypeScript**
- Architecture modulaire (services, hooks, composants, etc.)
- Authentification via **Firebase Authentication**
- **Axios** pour les appels API
- Support des **variables d'environnement** (via `app.config.js`)
- **Linting** avec ESLint + Prettier + tri des imports
- **Tests unitaires** avec Jest + Testing Library
- Hooks de commit : lint, format & test via **Husky** + **lint-staged**

---

## Structure du projet

```
matcha-app/
├── src/
│   ├── auth/            # Firebase Auth + services associés
│   ├── components/      # Composants UI réutilisables
│   ├── constants/       # Constantes globales, config
│   ├── contexts/        # Context API (auth, theme, etc.)
│   ├── hooks/           # Hooks personnalisés (ex: useAuth)
│   ├── lib/             # api.ts, helpers globaux
│   ├── navigation/      # Stack, Tab, Router, guards
│   ├── screens/         # Pages de l'app (Home, Login...)
│   ├── services/        # Services pour appels backend
│   ├── types/           # Types partagés
│   └── utils/           # Fonctions utilitaires génériques
├── .husky/              # Hooks git
├── .expo/, assets/      # Expo, images et icônes
├── app.config.js        # Config Expo avec dotenv
├── .env.example/.local  # Variables d’environnement
├── .eslintrc.cjs        # ESLint config
├── .prettierrc.cjs      # Prettier config
├── tsconfig.json        # TypeScript config
└── README.md
```

---

## Installation

```bash
# Cloner le repo
git clone https://github.com/ton-utilisateur/matcha-app.git
cd matcha-app

# Installer les dépendances
yarn install
```

---

## Configuration des variables d'environnement

Fichier `.env.local` (copie de `.env.example`) :

```
API_URL=https://api.matcha.com
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=xxx
FIREBASE_PROJECT_ID=xxx
```

Fichier `app.config.js` :

```ts
export default ({ config }) => ({
  ...config,
  extra: {
    API_URL: process.env.API_URL,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    // etc.
  },
});
```

---

## Scripts disponibles

| Script         | Description                          |
| -------------- | ------------------------------------ |
| `yarn start`   | Démarre le serveur Expo              |
| `yarn android` | Lance l'app sur un émulateur Android |
| `yarn ios`     | Lance l'app sur un simulateur iOS    |
| `yarn web`     | Lance la version web (Expo)          |
| `yarn test`    | Lance les tests unitaires avec Jest  |
| `yarn prepare` | Installe les hooks git Husky         |

---

## Conventions & bonnes pratiques

### Structure et logique

- **Separation of concerns** : composants visuels, logique métier (services), logique de données (API)
- **Pas de logique dans les composants** : utiliser des hooks et services
- Utiliser des **hooks custom** pour l'état global (ex: `useAuth`, `useTheme`)
- Auth avec Firebase isolée dans `src/auth`
- Toutes les fonctions d'API dans `services/`, utilisant `lib/api.ts`

### Style de code

- ESLint + Prettier strictement appliqués
- Tri automatique des imports avec `@trivago/prettier-plugin-sort-imports`
- Pas de `any` ou `ts-ignore` non justifié
- Hooks, types, components = **typés explicitement**
- Convention de nommage :
  - kebab-case pour les fichiers
  - camelCase pour les variables/fonctions
  - PascalCase pour les composants et types

### Qualité / CI

- `lint-staged` empêche les commits si erreurs ESLint ou tests KO
- `yarn format` obligatoire avant tout commit (via Husky)
- Tests avec `@testing-library/react-native`
- Nom des fichiers de test : `*.test.tsx`

### Authentification Firebase

- Auth isolée dans `auth/firebase.ts`
- Utilisation de `getIdToken()` pour chaque requête
- Token ajouté aux headers Axios dynamiquement (via interceptor)
- Aucun accès direct aux infos sensibles Firebase dans les composants

### Sécurité

- Ne jamais commit `.env`
- Pas de secret sensible hardcodé dans le code source
- Aucune info perso en console (`console.log(user.email)` = ❌)

### Collaboration & Git

- Hooks Husky : linter + test auto avant commit
- Convention de commit : `feat:`, `fix:`, `refactor:`, `test:`...
- CI GitHub Actions recommandée si besoin

---

## Licence

MIT — libre d'utilisation, de modification et de distribution.
