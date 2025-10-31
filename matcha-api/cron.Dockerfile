# Stage 1: Build
FROM node:22.2.0-alpine AS builder

WORKDIR /app/matcha-api

RUN corepack enable

COPY matcha-api/package.json matcha-api/yarn.lock ./
RUN yarn install

COPY matcha-api ./
RUN yarn build  # génère /dist

# Stage 2: Runtime (plus léger)
FROM node:22.2.0-alpine

WORKDIR /app/matcha-api

RUN corepack enable

COPY matcha-api/package.json matcha-api/yarn.lock ./
RUN yarn install --production

# Copie uniquement les fichiers buildés
COPY --from=builder /app/matcha-api/dist ./dist

CMD ["node", "dist/scripts/cleanup-unverified-users.js"]
