# Builder: glibc image — Bun+Vite build is unstable on alpine under buildx amd64 emulation.
FROM oven/bun:1.3-slim AS builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
ENV NODE_ENV=production
RUN bun --bun run build

FROM oven/bun:1.3-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
RUN adduser -D appuser
COPY --from=builder --chown=appuser:appuser /app/.output ./.output
USER appuser
EXPOSE 3000
CMD ["bun", "--bun", ".output/server/index.mjs"]
