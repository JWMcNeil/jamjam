import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_hero_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  ALTER TABLE "site_settings" ADD COLUMN "hero_subheading" varchar DEFAULT 'Web, AI and video work, with a soft spot for anything with an engine.' NOT NULL;
  ALTER TABLE "site_settings" ADD COLUMN "hero_web_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_web_video_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_ai_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_ai_video_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_film_image_id" integer;
  ALTER TABLE "site_settings" ADD COLUMN "hero_film_video_id" integer;
  ALTER TABLE "site_settings_hero_photos" ADD CONSTRAINT "site_settings_hero_photos_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_hero_photos" ADD CONSTRAINT "site_settings_hero_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_hero_photos_order_idx" ON "site_settings_hero_photos" USING btree ("_order");
  CREATE INDEX "site_settings_hero_photos_parent_id_idx" ON "site_settings_hero_photos" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hero_photos_image_idx" ON "site_settings_hero_photos" USING btree ("image_id");
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_web_image_id_media_id_fk" FOREIGN KEY ("hero_web_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_web_video_id_mux_video_id_fk" FOREIGN KEY ("hero_web_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_ai_image_id_media_id_fk" FOREIGN KEY ("hero_ai_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_ai_video_id_mux_video_id_fk" FOREIGN KEY ("hero_ai_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_film_image_id_media_id_fk" FOREIGN KEY ("hero_film_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_film_video_id_mux_video_id_fk" FOREIGN KEY ("hero_film_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_hero_web_hero_web_image_idx" ON "site_settings" USING btree ("hero_web_image_id");
  CREATE INDEX "site_settings_hero_web_hero_web_video_idx" ON "site_settings" USING btree ("hero_web_video_id");
  CREATE INDEX "site_settings_hero_ai_hero_ai_image_idx" ON "site_settings" USING btree ("hero_ai_image_id");
  CREATE INDEX "site_settings_hero_ai_hero_ai_video_idx" ON "site_settings" USING btree ("hero_ai_video_id");
  CREATE INDEX "site_settings_hero_film_hero_film_image_idx" ON "site_settings" USING btree ("hero_film_image_id");
  CREATE INDEX "site_settings_hero_film_hero_film_video_idx" ON "site_settings" USING btree ("hero_film_video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings_hero_photos" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "site_settings_hero_photos" CASCADE;
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_web_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_web_video_id_mux_video_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_ai_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_ai_video_id_mux_video_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_film_image_id_media_id_fk";
  
  ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_hero_film_video_id_mux_video_id_fk";
  
  DROP INDEX "site_settings_hero_web_hero_web_image_idx";
  DROP INDEX "site_settings_hero_web_hero_web_video_idx";
  DROP INDEX "site_settings_hero_ai_hero_ai_image_idx";
  DROP INDEX "site_settings_hero_ai_hero_ai_video_idx";
  DROP INDEX "site_settings_hero_film_hero_film_image_idx";
  DROP INDEX "site_settings_hero_film_hero_film_video_idx";
  ALTER TABLE "site_settings" DROP COLUMN "hero_subheading";
  ALTER TABLE "site_settings" DROP COLUMN "hero_web_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_web_video_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_ai_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_ai_video_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_film_image_id";
  ALTER TABLE "site_settings" DROP COLUMN "hero_film_video_id";`)
}
