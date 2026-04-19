import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_gallery_slide_type" AS ENUM('media', 'mux');
  CREATE TYPE "public"."enum__projects_v_version_gallery_slide_type" AS ENUM('media', 'mux');
  ALTER TABLE "projects_gallery" ADD COLUMN "slide_type" "enum_projects_gallery_slide_type" DEFAULT 'media';
  ALTER TABLE "projects_gallery" ADD COLUMN "mux_video_id" integer;
  ALTER TABLE "_projects_v_version_gallery" ADD COLUMN "slide_type" "enum__projects_v_version_gallery_slide_type" DEFAULT 'media';
  ALTER TABLE "_projects_v_version_gallery" ADD COLUMN "mux_video_id" integer;
  ALTER TABLE "projects_gallery" ADD CONSTRAINT "projects_gallery_mux_video_id_mux_video_id_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery" ADD CONSTRAINT "_projects_v_version_gallery_mux_video_id_mux_video_id_fk" FOREIGN KEY ("mux_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "projects_gallery_mux_video_idx" ON "projects_gallery" USING btree ("mux_video_id");
  CREATE INDEX "_projects_v_version_gallery_mux_video_idx" ON "_projects_v_version_gallery" USING btree ("mux_video_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "projects_gallery" DROP CONSTRAINT "projects_gallery_mux_video_id_mux_video_id_fk";
  
  ALTER TABLE "_projects_v_version_gallery" DROP CONSTRAINT "_projects_v_version_gallery_mux_video_id_mux_video_id_fk";
  
  DROP INDEX "projects_gallery_mux_video_idx";
  DROP INDEX "_projects_v_version_gallery_mux_video_idx";
  ALTER TABLE "projects_gallery" DROP COLUMN "slide_type";
  ALTER TABLE "projects_gallery" DROP COLUMN "mux_video_id";
  ALTER TABLE "_projects_v_version_gallery" DROP COLUMN "slide_type";
  ALTER TABLE "_projects_v_version_gallery" DROP COLUMN "mux_video_id";
  DROP TYPE "public"."enum_projects_gallery_slide_type";
  DROP TYPE "public"."enum__projects_v_version_gallery_slide_type";`)
}
