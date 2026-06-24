# alpine version으로 하면 ImageOptimizer 관련된 native 모듈이 없어서 build에 실패함.
FROM oven/bun:1.3-slim AS base

FROM base AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun run build

FROM nginx:1.29.2-alpine3.22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG PUID=1000
ARG PGID=1000

COPY --from=builder --chown=${PUID}:${PGID} /app/dist ./
COPY --from=builder --chown=${PUID}:${PGID} /app/nginx.conf /etc/nginx/nginx.conf

ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
