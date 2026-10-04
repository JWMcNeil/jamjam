import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "title" SET DEFAULT 'Sites, content and AI, from one person.';
  ALTER TABLE "pages" ALTER COLUMN "lede" SET DEFAULT 'I build websites, make the photos and video that go on them, and build AI tools that take work off your plate. One person, one brief, all of it fitting together.';
  ALTER TABLE "pages" ALTER COLUMN "reel_caption" SET DEFAULT 'The reel: recent film and photo work';
  ALTER TABLE "pages" ALTER COLUMN "closing_headline" SET DEFAULT 'Got something to build?';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_title" SET DEFAULT 'Sites, content and AI, from one person.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_lede" SET DEFAULT 'I build websites, make the photos and video that go on them, and build AI tools that take work off your plate. One person, one brief, all of it fitting together.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_reel_caption" SET DEFAULT 'The reel: recent film and photo work';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_closing_headline" SET DEFAULT 'Got something to build?';
  ALTER TABLE "board_items" DROP COLUMN "featured_order";
  ALTER TABLE "_board_items_v" DROP COLUMN "version_featured_order";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "title" SET DEFAULT 'What I can do for you.';
  ALTER TABLE "pages" ALTER COLUMN "lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles and cars.';
  ALTER TABLE "pages" ALTER COLUMN "reel_caption" SET DEFAULT 'The reel: bikes, cars, and the sites that sell them';
  ALTER TABLE "pages" ALTER COLUMN "closing_headline" SET DEFAULT 'Got something to show off?';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_title" SET DEFAULT 'What I can do for you.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles and cars.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_reel_caption" SET DEFAULT 'The reel: bikes, cars, and the sites that sell them';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_closing_headline" SET DEFAULT 'Got something to show off?';
  ALTER TABLE "board_items" ADD COLUMN "featured_order" numeric;
  ALTER TABLE "_board_items_v" ADD COLUMN "version_featured_order" numeric;`)
}
