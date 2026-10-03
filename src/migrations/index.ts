import * as migration_20260415_093941 from './20260415_093941';
import * as migration_20260419_044851 from './20260419_044851';
import * as migration_20260818_064100 from './20260818_064100';
import * as migration_20260819_075411 from './20260819_075411';
import * as migration_20260922_021300_add_reset_password_requested_at from './20260922_021300_add_reset_password_requested_at';
import * as migration_20261003_043245_gallery_video_subjects_featured from './20261003_043245_gallery_video_subjects_featured';
import * as migration_20261003_044503_home_hero_chips from './20261003_044503_home_hero_chips';

export const migrations = [
  {
    up: migration_20260415_093941.up,
    down: migration_20260415_093941.down,
    name: '20260415_093941',
  },
  {
    up: migration_20260419_044851.up,
    down: migration_20260419_044851.down,
    name: '20260419_044851',
  },
  {
    up: migration_20260818_064100.up,
    down: migration_20260818_064100.down,
    name: '20260818_064100',
  },
  {
    up: migration_20260819_075411.up,
    down: migration_20260819_075411.down,
    name: '20260819_075411',
  },
  {
    up: migration_20260922_021300_add_reset_password_requested_at.up,
    down: migration_20260922_021300_add_reset_password_requested_at.down,
    name: '20260922_021300_add_reset_password_requested_at',
  },
  {
    up: migration_20261003_043245_gallery_video_subjects_featured.up,
    down: migration_20261003_043245_gallery_video_subjects_featured.down,
    name: '20261003_043245_gallery_video_subjects_featured',
  },
  {
    up: migration_20261003_044503_home_hero_chips.up,
    down: migration_20261003_044503_home_hero_chips.down,
    name: '20261003_044503_home_hero_chips'
  },
];
