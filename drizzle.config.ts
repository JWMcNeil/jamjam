import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/payload-generated-schema.ts',
  // Keep drizzle-kit output separate from Payload `src/migrations` (Payload runs TS migrations only).
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://payload:payload@localhost:5432/jamjam',
  },
})
