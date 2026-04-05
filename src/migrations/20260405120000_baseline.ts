import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASELINE_SQL_PATH = path.join(__dirname, 'baseline_schema.sql')

function splitBaselineStatements(raw: string): string[] {
  return raw
    .split('--> statement-breakpoint')
    .map((s) => s.trim())
    .filter(Boolean)
}

/**
 * Full schema baseline generated from `payload-generated-schema.ts` via drizzle-kit.
 * Replaces the legacy Pages/Web/Content migration chain so a fresh Postgres matches current collections.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  const raw = readFileSync(BASELINE_SQL_PATH, 'utf8')
  for (const statement of splitBaselineStatements(raw)) {
    await db.execute(sql.raw(statement))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql.raw(`DROP SCHEMA public CASCADE`))
  await db.execute(sql.raw(`CREATE SCHEMA public`))
  await db.execute(sql.raw(`GRANT ALL ON SCHEMA public TO CURRENT_USER`))
  await db.execute(sql.raw(`GRANT ALL ON SCHEMA public TO public`))
}
