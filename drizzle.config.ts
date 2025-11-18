import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/payload-generated-schema.ts',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URI || 'postgresql://payload:payload@localhost:5432/jamjam',
  },
})
