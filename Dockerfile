FROM node:22.18.0-alpine AS base

# Install proejct dependencies only when needed
# FROM base AS deps
# WORKDIR /app
# RUN apk add --no-cache autoconf automake libtool make gcc g++ zlib-dev libwebp-dev libwebp-tools
# COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# RUN corepack enable pnpm && pnpm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache autoconf automake libtool make gcc g++ zlib-dev libwebp-dev libwebp-tools
# COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV CI=true
RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM nginx:1.29.2-alpine3.22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG PUID=1000
ARG PGID=1000

COPY --from=builder --chown=${PUID}:${PGID} /app/dist ./
COPY --from=builder --chown=${PUID}:${PGID} /app/nginx.conf /etc/nginx/nginx.conf

# VOLUME /app/data
# USER ${PUID}:${PGID}
# ENV DATABASE_URL="file:/app/data/data.db"
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]