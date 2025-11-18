import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Add link_icon column to sidebar_nav_items table if it doesn't exist
  try {
    await db.execute(sql`
      ALTER TABLE "sidebar_nav_items" 
      ADD COLUMN IF NOT EXISTS "link_icon" text;
    `)
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

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  try {
    await db.execute(sql`ALTER TABLE "sidebar_nav_items" DROP COLUMN IF EXISTS "link_icon";`)
    payload.logger.info('Removed link_icon column from sidebar_nav_items table')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    payload.logger.warn(`Error removing link_icon column: ${errorMessage}`)
  }
}


