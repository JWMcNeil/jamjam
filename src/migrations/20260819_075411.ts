import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_board_items_kind" AS ENUM('photography', 'graphics');
  CREATE TYPE "public"."enum_board_items_set_layout" AS ENUM('carousel', 'coverModal');
  CREATE TYPE "public"."enum_board_items_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__board_items_v_version_kind" AS ENUM('photography', 'graphics');
  CREATE TYPE "public"."enum__board_items_v_version_set_layout" AS ENUM('carousel', 'coverModal');
  CREATE TYPE "public"."enum__board_items_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_header_nav_items_link_site_page" ADD VALUE 'board' BEFORE 'lab';
  CREATE TABLE "board_items_stills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "board_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"kind" "enum_board_items_kind",
  	"cover_id" integer,
  	"set_layout" "enum_board_items_set_layout" DEFAULT 'carousel',
  	"context" varchar,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_board_items_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_board_items_v_version_stills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_board_items_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_kind" "enum__board_items_v_version_kind",
  	"version_cover_id" integer,
  	"version_set_layout" "enum__board_items_v_version_set_layout" DEFAULT 'carousel',
  	"version_context" varchar,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__board_items_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "board_items_id" integer;
  ALTER TABLE "board_items_stills" ADD CONSTRAINT "board_items_stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_items_stills" ADD CONSTRAINT "board_items_stills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."board_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "board_items" ADD CONSTRAINT "board_items_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "board_items" ADD CONSTRAINT "board_items_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_items_v_version_stills" ADD CONSTRAINT "_board_items_v_version_stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_items_v_version_stills" ADD CONSTRAINT "_board_items_v_version_stills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_board_items_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_board_items_v" ADD CONSTRAINT "_board_items_v_parent_id_board_items_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."board_items"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_items_v" ADD CONSTRAINT "_board_items_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_items_v" ADD CONSTRAINT "_board_items_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "board_items_stills_order_idx" ON "board_items_stills" USING btree ("_order");
  CREATE INDEX "board_items_stills_parent_id_idx" ON "board_items_stills" USING btree ("_parent_id");
  CREATE INDEX "board_items_stills_image_idx" ON "board_items_stills" USING btree ("image_id");
  CREATE INDEX "board_items_cover_idx" ON "board_items" USING btree ("cover_id");
  CREATE INDEX "board_items_meta_meta_image_idx" ON "board_items" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "board_items_slug_idx" ON "board_items" USING btree ("slug");
  CREATE INDEX "board_items_updated_at_idx" ON "board_items" USING btree ("updated_at");
  CREATE INDEX "board_items_created_at_idx" ON "board_items" USING btree ("created_at");
  CREATE INDEX "board_items__status_idx" ON "board_items" USING btree ("_status");
  CREATE INDEX "_board_items_v_version_stills_order_idx" ON "_board_items_v_version_stills" USING btree ("_order");
  CREATE INDEX "_board_items_v_version_stills_parent_id_idx" ON "_board_items_v_version_stills" USING btree ("_parent_id");
  CREATE INDEX "_board_items_v_version_stills_image_idx" ON "_board_items_v_version_stills" USING btree ("image_id");
  CREATE INDEX "_board_items_v_parent_idx" ON "_board_items_v" USING btree ("parent_id");
  CREATE INDEX "_board_items_v_version_version_cover_idx" ON "_board_items_v" USING btree ("version_cover_id");
  CREATE INDEX "_board_items_v_version_meta_version_meta_image_idx" ON "_board_items_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_board_items_v_version_version_slug_idx" ON "_board_items_v" USING btree ("version_slug");
  CREATE INDEX "_board_items_v_version_version_updated_at_idx" ON "_board_items_v" USING btree ("version_updated_at");
  CREATE INDEX "_board_items_v_version_version_created_at_idx" ON "_board_items_v" USING btree ("version_created_at");
  CREATE INDEX "_board_items_v_version_version__status_idx" ON "_board_items_v" USING btree ("version__status");
  CREATE INDEX "_board_items_v_created_at_idx" ON "_board_items_v" USING btree ("created_at");
  CREATE INDEX "_board_items_v_updated_at_idx" ON "_board_items_v" USING btree ("updated_at");
  CREATE INDEX "_board_items_v_latest_idx" ON "_board_items_v" USING btree ("latest");
  CREATE INDEX "_board_items_v_autosave_idx" ON "_board_items_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_items_fk" FOREIGN KEY ("board_items_id") REFERENCES "public"."board_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_board_items_id_idx" ON "payload_locked_documents_rels" USING btree ("board_items_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "board_items_stills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "board_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_board_items_v_version_stills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_board_items_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "board_items_stills" CASCADE;
  DROP TABLE "board_items" CASCADE;
  DROP TABLE "_board_items_v_version_stills" CASCADE;
  DROP TABLE "_board_items_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_board_items_fk";
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_site_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_link_site_page";
  CREATE TYPE "public"."enum_header_nav_items_link_site_page" AS ENUM('home', 'posts', 'projects', 'lab', 'contact');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_site_page" SET DATA TYPE "public"."enum_header_nav_items_link_site_page" USING "link_site_page"::"public"."enum_header_nav_items_link_site_page";
  DROP INDEX "payload_locked_documents_rels_board_items_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "board_items_id";
  DROP TYPE "public"."enum_board_items_kind";
  DROP TYPE "public"."enum_board_items_set_layout";
  DROP TYPE "public"."enum_board_items_status";
  DROP TYPE "public"."enum__board_items_v_version_kind";
  DROP TYPE "public"."enum__board_items_v_version_set_layout";
  DROP TYPE "public"."enum__board_items_v_version_status";`)
}
