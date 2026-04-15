import * as migration_20260411_052255 from './20260411_052255';
import * as migration_20260415_080500_add_lab_to_locked_documents_rels from './20260415_080500_add_lab_to_locked_documents_rels';
import * as migration_20260415_084000_add_missing_tag_colour_enum_values from './20260415_084000_add_missing_tag_colour_enum_values';

export const migrations = [
  {
    up: migration_20260411_052255.up,
    down: migration_20260411_052255.down,
    name: '20260411_052255'
  },
  {
    up: migration_20260415_080500_add_lab_to_locked_documents_rels.up,
    down: migration_20260415_080500_add_lab_to_locked_documents_rels.down,
    name: '20260415_080500_add_lab_to_locked_documents_rels'
  },
  {
    up: migration_20260415_084000_add_missing_tag_colour_enum_values.up,
    down: migration_20260415_084000_add_missing_tag_colour_enum_values.down,
    name: '20260415_084000_add_missing_tag_colour_enum_values'
  },
];
