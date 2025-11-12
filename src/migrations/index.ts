import * as migration_20251107_004036_add_icon_field_to_links from './20251107_004036_add_icon_field_to_links';
import * as migration_20251107_162104_add_show_on_pages_to_sidebar_nav_items from './20251107_162104_add_show_on_pages_to_sidebar_nav_items';
import * as migration_20251107_162331_remove_link_mobile_size_columns from './20251107_162331_remove_link_mobile_size_columns';

export const migrations = [
  {
    up: migration_20251107_004036_add_icon_field_to_links.up,
    down: migration_20251107_004036_add_icon_field_to_links.down,
    name: '20251107_004036_add_icon_field_to_links'
  },
  {
    up: migration_20251107_162104_add_show_on_pages_to_sidebar_nav_items.up,
    down: migration_20251107_162104_add_show_on_pages_to_sidebar_nav_items.down,
    name: '20251107_162104_add_show_on_pages_to_sidebar_nav_items'
  },
  {
    up: migration_20251107_162331_remove_link_mobile_size_columns.up,
    down: migration_20251107_162331_remove_link_mobile_size_columns.down,
    name: '20251107_162331_remove_link_mobile_size_columns'
  },
];
