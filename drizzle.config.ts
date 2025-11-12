import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/payload-generated-schema.ts',
  out: './src/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URI || '',
  },
})
