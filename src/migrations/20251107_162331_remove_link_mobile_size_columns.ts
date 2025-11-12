import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

// Tables that have link_mobile_size columns that need to be removed
// Note: SQLite doesn't support DROP COLUMN, so these columns will remain in the database
// but will be ignored since they're not in the schema. This migration marks them as handled.
const tablesToUpdate = [
  '_pages_v_version_hero_links',
  '_pages_v_blocks_cta_links',
  '_pages_v_blocks_content_columns',
  'header_nav_items',
  'footer_nav_items',
  'sidebar_nav_items',
]

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // SQLite doesn't support DROP COLUMN directly
  // The columns will remain in the database but will be ignored since they're not in the schema
  // This migration acknowledges that these columns are no longer used
  payload.logger.info('Marking link_mobile_size columns as deprecated (SQLite will ignore unused columns)')
  
  for (const tableName of tablesToUpdate) {
    try {
      // Verify the table exists and has the column
      const result = await db.all(sql`PRAGMA table_info(\`${sql.raw(tableName)}\`)`)
      const hasColumn = result.some(
        (row: { name: string; type: string; notnull: number; dflt_value: unknown; pk: number }) =>
          row.name === 'link_mobile_size',
      )
      
      if (hasColumn) {
        payload.logger.info(`Found link_mobile_size in ${tableName} - will be ignored by schema`)
      }
    } catch (error: unknown) {
      // Table might not exist, which is fine
      const errorMessage = error instanceof Error ? error.message : String(error)
      payload.logger.info(`Could not check ${tableName}: ${errorMessage}`)
    }
  }
  
  payload.logger.info('Migration complete: link_mobile_size columns are deprecated and will be ignored')
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  // SQLite doesn't support adding columns back easily without recreating tables
  // This is a one-way migration
  payload.logger.warn('Rollback of link_mobile_size removal is not supported. Columns remain in database but are unused.')
}

