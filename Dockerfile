FROM node:22
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY shared/logger/ ./shared/logger/
COPY turbo.json  ./
COPY package.json ./
COPY pnpm-workspace.yaml ./
COPY services/profile/package*.json ./services/profile/
COPY services/profile/jest.config.js ./services/profile/
COPY services/profile/tsconfig.json ./services/profile/
COPY services/profile/src ./services/profile/src/
COPY services/profile/prisma ./services/profile/prisma/
COPY services/profile/__tests__ ./services/profile/__tests__/

USER root

RUN corepack enable && pnpm install
RUN chown -R node:node /usr/src/app

USER node

RUN pnpm --filter @shared/logger build
RUN pnpm --filter profile build

EXPOSE 3000

CMD ["pnpm", "--filter", "profile", "start"]

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
