FROM node:22.18.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run build && rm -rf ./node_modules

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG PUID=1000
ARG PGID=1000

COPY --from=builder --chown=${PUID}:${PGID} /app/dist ./dist
# COPY --from=builder --chown=${PUID}:${PGID} /app/env.sh ./env.sh
# RUN chmod +x ./env.sh && npm install -g serve
RUN npm install -g serve

USER ${PUID}:${PGID}
EXPOSE 3000
# ENTRYPOINT ["sh", "-c", "./env.sh && serve -s dist"]
ENTRYPOINT ["serve", "-s", "dist"]