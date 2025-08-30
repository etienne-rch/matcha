FROM node:22.2.0-alpine

WORKDIR /app

RUN corepack enable

COPY . .


ENV NODE_ENV=development
RUN yarn install
# RUN yarn install --frozen-lockfile


WORKDIR /app/matcha-api

EXPOSE 3000

CMD ["yarn", "dev"]
