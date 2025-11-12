import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Add link_icon column to sidebar_nav_items table if it doesn't exist
  // SQLite doesn't support IF NOT EXISTS for ALTER TABLE, so we'll use a try-catch approach
  try {
    await db.run(sql`ALTER TABLE \`sidebar_nav_items\` ADD COLUMN \`link_icon\` text;`)
    payload.logger.info('Added link_icon column to sidebar_nav_items table')
  } catch (error: unknown) {
    // Column might already exist, which is fine
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('duplicate column') || errorMessage.includes('already exists')) {
      payload.logger.info('link_icon column already exists in sidebar_nav_items table')
    } else {
      throw error
    }
  }
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN directly, so we'll skip the rollback
  // In production, you'd need to recreate the table without the column
  payload.logger.warn('Rollback of link_icon column is not supported in SQLite. Manual intervention required.')
}


