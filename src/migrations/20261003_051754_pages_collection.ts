import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_rows_proof_slide_type" AS ENUM('media', 'mux');
  CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_rows_proof_slide_type" AS ENUM('media', 'mux');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  ALTER TYPE "public"."enum_header_nav_items_link_site_page" ADD VALUE 'whatIDo' BEFORE 'posts';
  CREATE TABLE "pages_rows_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"slide_type" "enum_pages_rows_proof_slide_type" DEFAULT 'media',
  	"image_id" integer,
  	"video_id" integer,
  	"poster_id" integer
  );
  
  CREATE TABLE "pages_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"body" varchar,
  	"tags" varchar,
  	"open_by_default" boolean DEFAULT false
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'What I can do for you.',
  	"lede" varchar DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles, tractors and cars.',
  	"reel_video_id" integer,
  	"reel_poster_id" integer,
  	"reel_tag" varchar DEFAULT '#film',
  	"reel_caption" varchar DEFAULT 'The reel: bikes, tractors, cars, and the sites that sell them',
  	"index_label" varchar DEFAULT '// ls what-i-do/',
  	"closing_headline" varchar DEFAULT 'Got something to show off?',
  	"closing_line" varchar DEFAULT 'Tell me what it is and when you need it.',
  	"closing_cta_label" varchar DEFAULT 'say hello',
  	"closing_cta_href" varchar DEFAULT '/contact',
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"slug" varchar DEFAULT 'what-i-do',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_version_rows_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"slide_type" "enum__pages_v_version_rows_proof_slide_type" DEFAULT 'media',
  	"image_id" integer,
  	"video_id" integer,
  	"poster_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_version_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"line" varchar,
  	"body" varchar,
  	"tags" varchar,
  	"open_by_default" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar DEFAULT 'What I can do for you.',
  	"version_lede" varchar DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles, tractors and cars.',
  	"version_reel_video_id" integer,
  	"version_reel_poster_id" integer,
  	"version_reel_tag" varchar DEFAULT '#film',
  	"version_reel_caption" varchar DEFAULT 'The reel: bikes, tractors, cars, and the sites that sell them',
  	"version_index_label" varchar DEFAULT '// ls what-i-do/',
  	"version_closing_headline" varchar DEFAULT 'Got something to show off?',
  	"version_closing_line" varchar DEFAULT 'Tell me what it is and when you need it.',
  	"version_closing_cta_label" varchar DEFAULT 'say hello',
  	"version_closing_cta_href" varchar DEFAULT '/contact',
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_slug" varchar DEFAULT 'what-i-do',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_rows_proof" ADD CONSTRAINT "pages_rows_proof_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rows_proof" ADD CONSTRAINT "pages_rows_proof_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rows_proof" ADD CONSTRAINT "pages_rows_proof_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_rows_proof" ADD CONSTRAINT "pages_rows_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rows" ADD CONSTRAINT "pages_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_reel_video_id_mux_video_id_fk" FOREIGN KEY ("reel_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_reel_poster_id_media_id_fk" FOREIGN KEY ("reel_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_rows_proof" ADD CONSTRAINT "_pages_v_version_rows_proof_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_rows_proof" ADD CONSTRAINT "_pages_v_version_rows_proof_video_id_mux_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_rows_proof" ADD CONSTRAINT "_pages_v_version_rows_proof_poster_id_media_id_fk" FOREIGN KEY ("poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_version_rows_proof" ADD CONSTRAINT "_pages_v_version_rows_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_rows" ADD CONSTRAINT "_pages_v_version_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_reel_video_id_mux_video_id_fk" FOREIGN KEY ("version_reel_video_id") REFERENCES "public"."mux_video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_reel_poster_id_media_id_fk" FOREIGN KEY ("version_reel_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_rows_proof_order_idx" ON "pages_rows_proof" USING btree ("_order");
  CREATE INDEX "pages_rows_proof_parent_id_idx" ON "pages_rows_proof" USING btree ("_parent_id");
  CREATE INDEX "pages_rows_proof_image_idx" ON "pages_rows_proof" USING btree ("image_id");
  CREATE INDEX "pages_rows_proof_video_idx" ON "pages_rows_proof" USING btree ("video_id");
  CREATE INDEX "pages_rows_proof_poster_idx" ON "pages_rows_proof" USING btree ("poster_id");
  CREATE INDEX "pages_rows_order_idx" ON "pages_rows" USING btree ("_order");
  CREATE INDEX "pages_rows_parent_id_idx" ON "pages_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_reel_video_idx" ON "pages" USING btree ("reel_video_id");
  CREATE INDEX "pages_reel_poster_idx" ON "pages" USING btree ("reel_poster_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_version_rows_proof_order_idx" ON "_pages_v_version_rows_proof" USING btree ("_order");
  CREATE INDEX "_pages_v_version_rows_proof_parent_id_idx" ON "_pages_v_version_rows_proof" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_version_rows_proof_image_idx" ON "_pages_v_version_rows_proof" USING btree ("image_id");
  CREATE INDEX "_pages_v_version_rows_proof_video_idx" ON "_pages_v_version_rows_proof" USING btree ("video_id");
  CREATE INDEX "_pages_v_version_rows_proof_poster_idx" ON "_pages_v_version_rows_proof" USING btree ("poster_id");
  CREATE INDEX "_pages_v_version_rows_order_idx" ON "_pages_v_version_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_version_rows_parent_id_idx" ON "_pages_v_version_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_reel_video_idx" ON "_pages_v" USING btree ("version_reel_video_id");
  CREATE INDEX "_pages_v_version_version_reel_poster_idx" ON "_pages_v" USING btree ("version_reel_poster_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE INDEX "_pages_v_autosave_idx" ON "_pages_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_rows_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_rows_proof" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_rows_proof" CASCADE;
  DROP TABLE "pages_rows" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_version_rows_proof" CASCADE;
  DROP TABLE "_pages_v_version_rows" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_site_page" SET DATA TYPE text;
  DROP TYPE "public"."enum_header_nav_items_link_site_page";
  CREATE TYPE "public"."enum_header_nav_items_link_site_page" AS ENUM('home', 'posts', 'projects', 'board', 'lab', 'contact');
  ALTER TABLE "header_nav_items" ALTER COLUMN "link_site_page" SET DATA TYPE "public"."enum_header_nav_items_link_site_page" USING "link_site_page"::"public"."enum_header_nav_items_link_site_page";
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_rows_proof_slide_type";
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_rows_proof_slide_type";
  DROP TYPE "public"."enum__pages_v_version_status";`)
}
