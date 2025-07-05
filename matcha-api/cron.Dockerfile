FROM node:22.2.0-alpine

WORKDIR /app

RUN corepack enable

COPY . .

WORKDIR /app/matcha-api

RUN yarn install

CMD ["yarn", "ts-node", "src/scripts/cleanup-unverified-users.ts"]
