FROM node:22.2.0-alpine

# Définir le dossier de travail
WORKDIR /app

# Activer corepack pour yarn
RUN corepack enable

# Copier uniquement les fichiers de dépendances (optimisation du cache Docker)
COPY package.json yarn.lock* ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste du code source
COPY . .

# Exposer le port (d'après .env => 3000)
EXPOSE 3000

# Commande de démarrage en mode dev
CMD ["yarn", "dev"]