import * as migration_20260415_093941 from './20260415_093941';
import * as migration_20260419_044851 from './20260419_044851';
import * as migration_20260818_064100 from './20260818_064100';
import * as migration_20260819_075411 from './20260819_075411';

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
    name: '20260819_075411'
  },
];
