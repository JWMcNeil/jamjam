# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# Optimized for Payload CMS v3 with pnpm
FROM node:22.17.0-alpine AS base
RUN apk add --no-cache libc6-compat

# Install pnpm globally
RUN corepack enable pnpm && corepack prepare pnpm@9 --activate

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./

RUN pnpm i --frozen-lockfile

# Build stage - includes dev dependencies
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NODE_OPTIONS=--no-deprecation

# Build with the experimental build mode (skip migrations during build)
RUN pnpm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV HOSTNAME 0.0.0.0
ENV PORT 3000
ENV NODE_OPTIONS=--no-deprecation

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Create and set permissions for .next directory
RUN mkdir -p .next
RUN chown -R nextjs:nodejs .next

# Copy standalone Next.js output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy Payload config files (critical for Payload CMS)
COPY --chown=nextjs:nodejs payload.config.ts* ./
COPY --chown=nextjs:nodejs tsconfig.json* ./
COPY --chown=nextjs:nodejs package.json ./
COPY --chown=nextjs:nodejs next.config.mjs* ./

# Copy only production dependencies
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]