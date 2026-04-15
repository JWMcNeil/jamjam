import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'indigo';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'blueSlate';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'emerald';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'teal';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'amber';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'rose';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'brown';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'olive';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'purple';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'cyan';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'grey';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'green';
    ALTER TYPE "public"."enum_tags_colour" ADD VALUE IF NOT EXISTS 'violet';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Postgres does not support removing enum values safely in place.
  // Intentionally no-op to keep rollback non-destructive.
  await db.execute(sql`SELECT 1;`)
}
