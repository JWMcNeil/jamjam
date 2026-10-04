import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages" ALTER COLUMN "lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles and cars.';
  ALTER TABLE "pages" ALTER COLUMN "reel_caption" SET DEFAULT 'The reel: bikes, cars, and the sites that sell them';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles and cars.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_reel_caption" SET DEFAULT 'The reel: bikes, cars, and the sites that sell them';
  ALTER TABLE "site_settings" ALTER COLUMN "location" SET DEFAULT 'North-east Victoria, Australia';
  ALTER TABLE "site_settings" ALTER COLUMN "about_headline" SET DEFAULT 'I build the site, then shoot what it’s selling.';
  ALTER TABLE "site_settings" ALTER COLUMN "about_bio" SET DEFAULT 'Web developer, photographer and filmmaker in north-east Victoria. I build sites and AI tools, shoot the photos and footage that go with them, and lean towards motorcycles and cars. Open to freelance and full-time.';
  ALTER TABLE "board_items" ADD COLUMN "_order" varchar;
  ALTER TABLE "_board_items_v" ADD COLUMN "version__order" varchar;
  CREATE INDEX "board_items__order_idx" ON "board_items" USING btree ("_order");
  CREATE INDEX "_board_items_v_version_version__order_idx" ON "_board_items_v" USING btree ("version__order");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "board_items__order_idx";
  DROP INDEX "_board_items_v_version_version__order_idx";
  ALTER TABLE "pages" ALTER COLUMN "lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles, tractors and cars.';
  ALTER TABLE "pages" ALTER COLUMN "reel_caption" SET DEFAULT 'The reel: bikes, tractors, cars, and the sites that sell them';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_lede" SET DEFAULT 'I build the website, shoot the footage and make them work together. Mostly for motorcycles, tractors and cars.';
  ALTER TABLE "_pages_v" ALTER COLUMN "version_reel_caption" SET DEFAULT 'The reel: bikes, tractors, cars, and the sites that sell them';
  ALTER TABLE "site_settings" ALTER COLUMN "location" SET DEFAULT 'Melbourne, Australia';
  ALTER TABLE "site_settings" ALTER COLUMN "about_headline" SET DEFAULT 'Full-stack developer based in Melbourne.';
  ALTER TABLE "site_settings" ALTER COLUMN "about_bio" SET DEFAULT 'I build websites, web apps, and AI-powered tools. Comfortable across the stack — from design systems to deployment. Currently looking for my next role.';
  ALTER TABLE "board_items" DROP COLUMN "_order";
  ALTER TABLE "_board_items_v" DROP COLUMN "version__order";`)
}
