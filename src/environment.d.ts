declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      /** Must match the value used in `/next/preview` and admin live-preview URLs. */
      PREVIEW_SECRET?: string
      DATABASE_URL: string
      NEXT_PUBLIC_SITE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      /** Comma-separated hostnames for next.config.ts allowedDevOrigins (dev / Tailscale). */
      NEXT_DEV_EXTRA_ORIGINS?: string
      /** Optional comma-separated origins (e.g. `https://a.com,https://b.com`) for CSP `frame-ancestors` (live preview / iframing). */
      FRAME_ANCESTORS?: string
      ANTHROPIC_API_KEY?: string
      /** Google AI Studio / Gemini API key for Roast my website. */
      GEMINI_API_KEY?: string
      /** Optional Gemini model override for Roast my website. */
      GEMINI_MODEL?: string
    }
  }
}

export {}
