import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  // Create the sidebar_nav_items_show_on_pages table
  try {
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS "sidebar_nav_items_show_on_pages" (
        "id" text PRIMARY KEY NOT NULL,
        "_order" integer NOT NULL,
        "_parent_id" text NOT NULL,
        "path" text NOT NULL,
        FOREIGN KEY ("_parent_id") REFERENCES "sidebar_nav_items"("id") ON DELETE CASCADE
      )
    `)
    payload.logger.info('Created sidebar_nav_items_show_on_pages table')
  } catch (error: unknown) {
    // Table might already exist, which is fine
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
      payload.logger.info('sidebar_nav_items_show_on_pages table already exists')
    } else {
      throw error
    }
  }

  // Create indexes
  try {
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "sidebar_nav_items_show_on_pages_order_idx" 
      ON "sidebar_nav_items_show_on_pages" ("_order")
    `)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
      payload.logger.info('sidebar_nav_items_show_on_pages_order_idx index already exists')
    } else {
      throw error
    }
  }

  try {
    await db.execute(sql`
      CREATE INDEX IF NOT EXISTS "sidebar_nav_items_show_on_pages_parent_id_idx" 
      ON "sidebar_nav_items_show_on_pages" ("_parent_id")
    `)
    payload.logger.info('Created indexes for sidebar_nav_items_show_on_pages table')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('already exists') || errorMessage.includes('duplicate')) {
      payload.logger.info('sidebar_nav_items_show_on_pages_parent_id_idx index already exists')
    } else {
      throw error
    }
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  // Drop indexes first
  try {
    await db.execute(sql`DROP INDEX IF EXISTS "sidebar_nav_items_show_on_pages_order_idx"`)
    await db.execute(sql`DROP INDEX IF EXISTS "sidebar_nav_items_show_on_pages_parent_id_idx"`)
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    payload.logger.warn(`Error dropping indexes: ${errorMessage}`)
  }

  // Drop the table
  try {
    await db.execute(sql`DROP TABLE IF EXISTS "sidebar_nav_items_show_on_pages"`)
    payload.logger.info('Dropped sidebar_nav_items_show_on_pages table')
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    payload.logger.warn(`Error dropping table: ${errorMessage}`)
  }
}

