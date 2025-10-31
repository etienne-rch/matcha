############################
# Stage: dev (hot reload)  #
############################
FROM node:22.2.0-alpine AS dev
WORKDIR /app/matcha-api
RUN corepack enable

# Installe les deps d'après le workspace API uniquement
COPY matcha-api/package.json matcha-api/yarn.lock ./
RUN yarn install

# Code source
COPY matcha-api ./

EXPOSE 3000
# Dev: ts-node-dev (défini dans package.json de l'API)
CMD ["yarn", "dev"]


#################################
# Stage: builder (TypeScript -> JS)
#################################
FROM node:22.2.0-alpine AS builder
WORKDIR /app/matcha-api
RUN corepack enable

COPY matcha-api/package.json matcha-api/yarn.lock ./
RUN yarn install
COPY matcha-api ./
RUN yarn build   # produit ./dist


#################################
# Stage: production (runtime léger)
#################################
FROM node:22.2.0-alpine AS production
ENV NODE_ENV=production
WORKDIR /app/matcha-api
RUN corepack enable

# Dépendances prod uniquement
COPY matcha-api/package.json matcha-api/yarn.lock ./
RUN yarn install --production

# Copie du build
COPY --from=builder /app/matcha-api/dist ./dist

EXPOSE 3000
CMD ["node", "dist/index.js"]
