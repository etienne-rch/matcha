FROM node:18
WORKDIR /app
COPY package*.json ./

# force installation de toutes les dépendances y compris devDependencies
ENV NODE_ENV=development

RUN npm install
RUN npm install ts-node-dev -g

COPY . .
EXPOSE 3000
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "--require", "tsconfig-paths/register", "src/index.ts"]
