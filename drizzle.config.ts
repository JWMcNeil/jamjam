import { defineConfig } from 'drizzle-kit'
import 'dotenv/config'

// Drizzle-kit expects a file path, not a file: URL
// Strip the file: protocol if present
const getDatabaseUrl = () => {
  const uri = process.env.DATABASE_URI || 'file:./jamjam.db'
  // Remove file: protocol prefix if present for drizzle-kit
  return uri.replace(/^file:/, '')
}

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/payload-generated-schema.ts',
  out: './src/migrations',
  dbCredentials: {
    url: getDatabaseUrl(),
  },
})
