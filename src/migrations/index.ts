import * as migration_20251203_101254 from './20251203_101254';
import * as migration_20251212_094606 from './20251212_094606';

export const migrations = [
  {
    up: migration_20251203_101254.up,
    down: migration_20251203_101254.down,
    name: '20251203_101254',
  },
  {
    up: migration_20251212_094606.up,
    down: migration_20251212_094606.down,
    name: '20251212_094606'
  },
];
