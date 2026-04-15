import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "lab_id" integer;
  `)
  await db.execute(sql`
   DO $$ BEGIN
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lab_fk" FOREIGN KEY ("lab_id") REFERENCES "public"."lab"("id") ON DELETE cascade ON UPDATE no action;
   EXCEPTION
    WHEN duplicate_object THEN null;
   END $$;
  `)
  await db.execute(sql`
   CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_lab_id_idx" ON "payload_locked_documents_rels" USING btree ("lab_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "payload_locked_documents_rels_lab_id_idx";
  `)
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_lab_fk";
  `)
  await db.execute(sql`
   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "lab_id";
  `)
}
