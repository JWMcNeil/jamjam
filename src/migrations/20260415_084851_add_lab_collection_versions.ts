import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_lab_tool_key" AS ENUM('memory-card-storage-calc', 'roast-my-website');
  CREATE TYPE "public"."enum_lab_kind" AS ENUM('tool', 'app', 'ai');
  CREATE TYPE "public"."enum_lab_group" AS ENUM('ai', 'apps', 'tools');
  CREATE TYPE "public"."enum_lab_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__lab_v_version_tool_key" AS ENUM('memory-card-storage-calc', 'roast-my-website');
  CREATE TYPE "public"."enum__lab_v_version_kind" AS ENUM('tool', 'app', 'ai');
  CREATE TYPE "public"."enum__lab_v_version_group" AS ENUM('ai', 'apps', 'tools');
  CREATE TYPE "public"."enum__lab_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "lab" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tool_key" "enum_lab_tool_key",
  	"enabled" boolean DEFAULT true,
  	"order" numeric DEFAULT 100,
  	"kind" "enum_lab_kind" DEFAULT 'tool',
  	"group" "enum_lab_group",
  	"title" varchar,
  	"primary_tag_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"description" varchar,
  	"model" varchar,
  	"write_up" jsonb,
  	"blog_post_url" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_lab_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_lab_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_tool_key" "enum__lab_v_version_tool_key",
  	"version_enabled" boolean DEFAULT true,
  	"version_order" numeric DEFAULT 100,
  	"version_kind" "enum__lab_v_version_kind" DEFAULT 'tool',
  	"version_group" "enum__lab_v_version_group",
  	"version_title" varchar,
  	"version_primary_tag_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_description" varchar,
  	"version_model" varchar,
  	"version_write_up" jsonb,
  	"version_blog_post_url" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__lab_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  ALTER TABLE "lab" ADD CONSTRAINT "lab_primary_tag_id_tags_id_fk" FOREIGN KEY ("primary_tag_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "lab" ADD CONSTRAINT "lab_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lab_v" ADD CONSTRAINT "_lab_v_parent_id_lab_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."lab"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lab_v" ADD CONSTRAINT "_lab_v_version_primary_tag_id_tags_id_fk" FOREIGN KEY ("version_primary_tag_id") REFERENCES "public"."tags"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_lab_v" ADD CONSTRAINT "_lab_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "lab_tool_key_idx" ON "lab" USING btree ("tool_key");
  CREATE INDEX "lab_primary_tag_idx" ON "lab" USING btree ("primary_tag_id");
  CREATE UNIQUE INDEX "lab_slug_idx" ON "lab" USING btree ("slug");
  CREATE INDEX "lab_meta_meta_image_idx" ON "lab" USING btree ("meta_image_id");
  CREATE INDEX "lab_updated_at_idx" ON "lab" USING btree ("updated_at");
  CREATE INDEX "lab_created_at_idx" ON "lab" USING btree ("created_at");
  CREATE INDEX "lab__status_idx" ON "lab" USING btree ("_status");
  CREATE INDEX "_lab_v_parent_idx" ON "_lab_v" USING btree ("parent_id");
  CREATE INDEX "_lab_v_version_version_tool_key_idx" ON "_lab_v" USING btree ("version_tool_key");
  CREATE INDEX "_lab_v_version_version_primary_tag_idx" ON "_lab_v" USING btree ("version_primary_tag_id");
  CREATE INDEX "_lab_v_version_version_slug_idx" ON "_lab_v" USING btree ("version_slug");
  CREATE INDEX "_lab_v_version_meta_version_meta_image_idx" ON "_lab_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_lab_v_version_version_updated_at_idx" ON "_lab_v" USING btree ("version_updated_at");
  CREATE INDEX "_lab_v_version_version_created_at_idx" ON "_lab_v" USING btree ("version_created_at");
  CREATE INDEX "_lab_v_version_version__status_idx" ON "_lab_v" USING btree ("version__status");
  CREATE INDEX "_lab_v_created_at_idx" ON "_lab_v" USING btree ("created_at");
  CREATE INDEX "_lab_v_updated_at_idx" ON "_lab_v" USING btree ("updated_at");
  CREATE INDEX "_lab_v_latest_idx" ON "_lab_v" USING btree ("latest");
  CREATE INDEX "_lab_v_autosave_idx" ON "_lab_v" USING btree ("autosave");`)

  await db.execute(sql`
   DO $$ BEGIN
    BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lab_fk" FOREIGN KEY ("lab_id") REFERENCES "public"."lab"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END;
   END $$;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "lab" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lab_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_lab_v" CASCADE;
  DROP TABLE "lab" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_lab_fk";
  DROP TYPE "public"."enum_lab_tool_key";
  DROP TYPE "public"."enum_lab_kind";
  DROP TYPE "public"."enum_lab_group";
  DROP TYPE "public"."enum_lab_status";
  DROP TYPE "public"."enum__lab_v_version_tool_key";
  DROP TYPE "public"."enum__lab_v_version_kind";
  DROP TYPE "public"."enum__lab_v_version_group";
  DROP TYPE "public"."enum__lab_v_version_status";`)
}
