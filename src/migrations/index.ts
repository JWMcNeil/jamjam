import * as migration_20260405120000_baseline from './20260405120000_baseline';
import * as migration_20260411_033430_add_site_settings_home_intro from './20260411_033430_add_site_settings_home_intro';
import * as migration_20260411_044945 from './20260411_044945';

export const migrations = [
  {
    up: migration_20260405120000_baseline.up,
    down: migration_20260405120000_baseline.down,
    name: '20260405120000_baseline',
  },
  {
    up: migration_20260411_033430_add_site_settings_home_intro.up,
    down: migration_20260411_033430_add_site_settings_home_intro.down,
    name: '20260411_033430_add_site_settings_home_intro',
  },
  {
    up: migration_20260411_044945.up,
    down: migration_20260411_044945.down,
    name: '20260411_044945'
  },
];
