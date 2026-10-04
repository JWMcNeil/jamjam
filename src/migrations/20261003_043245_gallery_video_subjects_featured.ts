import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_board_items_subjects" AS ENUM('motorcycles', 'tractors', 'cars', 'other');
  CREATE TYPE "public"."enum__board_items_v_version_subjects" AS ENUM('motorcycles', 'tractors', 'cars', 'other');
  ALTER TYPE "public"."enum_board_items_kind" ADD VALUE 'video' BEFORE 'graphics';
  ALTER TYPE "public"."enum__board_items_v_version_kind" ADD VALUE 'video' BEFORE 'graphics';
  CREATE TABLE "board_items_subjects" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_board_items_subjects",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_board_items_v_version_subjects" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__board_items_v_version_subjects",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  ALTER TABLE "board_items" ADD COLUMN "video_id" integer;
  ALTER TABLE "board_items" ADD COLUMN "featured" boolean DEFAULT false;
  ALTER TABLE "board_items" ADD COLUMN "featured_order" numeric;
  ALTER TABLE "_board_items_v" ADD COLUMN "version_video_id" integer;
  ALTER TABLE "_board_items_v" ADD COLUMN "version_featured" boolean DEFAULT false;
  ALTER TABLE "_board_items_v" ADD COLUMN "version_featured_order" numeric;
  ALTER TABLE "board_items_subjects" ADD CONSTRAINT "board_items_subjects_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."board_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_board_items_v_version_subjects" ADD CONSTRAINT "_board_items_v_version_subjects_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_board_items_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "board_items_subjects_order_idx" ON "board_items_subjects" USING btree ("order");
  CREATE INDEX "board_items_subjects_parent_idx" ON "board_items_subjects" USING btree ("parent_id");
  CREATE INDEX "_board_items_v_version_subjects_order_idx" ON "_board_items_v_version_subjects" USING btree ("order");
  CREATE INDEX "_board_items_v_version_subjects_parent_idx" ON "_board_items_v_version_subjects" USING btree ("parent_id");
  ALTER TABLE "board_items" ADD CONSTRAINT "board_items_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_board_items_v" ADD CONSTRAINT "_board_items_v_version_video_id_mux_video_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "board_items_video_idx" ON "board_items" USING btree ("video_id");
  CREATE INDEX "_board_items_v_version_version_video_idx" ON "_board_items_v" USING btree ("version_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "board_items_subjects" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_board_items_v_version_subjects" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "board_items_subjects" CASCADE;
  DROP TABLE "_board_items_v_version_subjects" CASCADE;
  ALTER TABLE "board_items" DROP CONSTRAINT "board_items_video_id_mux_video_id_fk";
  
  ALTER TABLE "_board_items_v" DROP CONSTRAINT "_board_items_v_version_video_id_mux_video_id_fk";
  
  ALTER TABLE "board_items" ALTER COLUMN "kind" SET DATA TYPE text;
  DROP TYPE "public"."enum_board_items_kind";
  CREATE TYPE "public"."enum_board_items_kind" AS ENUM('photography', 'graphics');
  ALTER TABLE "board_items" ALTER COLUMN "kind" SET DATA TYPE "public"."enum_board_items_kind" USING "kind"::"public"."enum_board_items_kind";
  ALTER TABLE "_board_items_v" ALTER COLUMN "version_kind" SET DATA TYPE text;
  DROP TYPE "public"."enum__board_items_v_version_kind";
  CREATE TYPE "public"."enum__board_items_v_version_kind" AS ENUM('photography', 'graphics');
  ALTER TABLE "_board_items_v" ALTER COLUMN "version_kind" SET DATA TYPE "public"."enum__board_items_v_version_kind" USING "version_kind"::"public"."enum__board_items_v_version_kind";
  DROP INDEX "board_items_video_idx";
  DROP INDEX "_board_items_v_version_version_video_idx";
  ALTER TABLE "board_items" DROP COLUMN "video_id";
  ALTER TABLE "board_items" DROP COLUMN "featured";
  ALTER TABLE "board_items" DROP COLUMN "featured_order";
  ALTER TABLE "_board_items_v" DROP COLUMN "version_video_id";
  ALTER TABLE "_board_items_v" DROP COLUMN "version_featured";
  ALTER TABLE "_board_items_v" DROP COLUMN "version_featured_order";
  DROP TYPE "public"."enum_board_items_subjects";
  DROP TYPE "public"."enum__board_items_v_version_subjects";`)
}
