import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Tables that have link_mobile_size columns that need to be removed
const tablesToUpdate = [
  '_pages_v_version_hero_links',
  '_pages_v_blocks_cta_links',
  '_pages_v_blocks_content_columns',
  'header_nav_items',
  'footer_nav_items',
  'sidebar_nav_items',
]

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  payload.logger.info('Removing link_mobile_size columns from tables')
  
  for (const tableName of tablesToUpdate) {
    try {
      await db.execute(sql`ALTER TABLE ${sql.identifier(tableName)} DROP COLUMN IF EXISTS "link_mobile_size"`)
      payload.logger.info(`Removed link_mobile_size column from ${tableName}`)
    } catch (error: unknown) {
      // Table might not exist, which is fine
      const errorMessage = error instanceof Error ? error.message : String(error)
      payload.logger.info(`Could not remove link_mobile_size from ${tableName}: ${errorMessage}`)
    }
  }
  
  payload.logger.info('Migration complete: link_mobile_size columns have been removed')
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.info('Restoring link_mobile_size columns to tables')
  
  for (const tableName of tablesToUpdate) {
    try {
      await db.execute(sql`ALTER TABLE ${sql.identifier(tableName)} ADD COLUMN IF NOT EXISTS "link_mobile_size" text`)
      payload.logger.info(`Restored link_mobile_size column to ${tableName}`)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      payload.logger.warn(`Could not restore link_mobile_size to ${tableName}: ${errorMessage}`)
    }
  }
  
  payload.logger.info('Rollback complete: link_mobile_size columns have been restored')
}


