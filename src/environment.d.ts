declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      /** Comma-separated hostnames for next.config.ts allowedDevOrigins (dev / Tailscale). */
      NEXT_DEV_EXTRA_ORIGINS?: string
      ANTHROPIC_API_KEY?: string
    }
  }
}

export {}
