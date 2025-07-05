FROM node:22.2.0-alpine

WORKDIR /app

RUN corepack enable

COPY . .

RUN yarn install

WORKDIR /app/matcha-api

EXPOSE 3000

CMD ["yarn", "dev"]
