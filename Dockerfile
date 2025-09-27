FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY shared/ ./shared/
COPY turbo.json  ./
COPY package.json ./
COPY package.lock ./
COPY pnpm-workspace.yaml ./
COPY tsconfig.json ./
COPY services/profile/package*.json ./services/profile/
COPY services/profile/package*.lock ./services/profile/
COPY services/profile/jest.config.js ./services/profile/
COPY services/profile/tsconfig.json ./services/profile/
COPY services/profile/src ./services/profile/src/
COPY services/profile/prisma ./services/profile/prisma/
COPY services/profile/__tests__ ./services/profile/__tests__/
COPY services/profile/.env ./services/profile/.env

USER root

RUN apt-get clean && \
    mkdir -p /var/lib/apt/lists/partial && \
    apt-get update && \
    apt-get install -y netcat-openbsd

RUN corepack enable && pnpm install
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 3000

CMD ["pnpm", "--filter", "profile", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD nc -z localhost 3000 || exit 1
