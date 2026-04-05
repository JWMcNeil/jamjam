import * as migration_20260405120000_baseline from './20260405120000_baseline'

export const migrations = [
  {
    up: migration_20260405120000_baseline.up,
    down: migration_20260405120000_baseline.down,
    name: '20260405120000_baseline',
  },
]
