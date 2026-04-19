import * as migration_20260415_093941 from './20260415_093941';
import * as migration_20260419_044851 from './20260419_044851';

export const migrations = [
  {
    up: migration_20260415_093941.up,
    down: migration_20260415_093941.down,
    name: '20260415_093941',
  },
  {
    up: migration_20260419_044851.up,
    down: migration_20260419_044851.down,
    name: '20260419_044851'
  },
];
