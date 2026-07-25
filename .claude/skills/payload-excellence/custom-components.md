# Custom components: when to swap in your own

Payload renders the whole Admin Panel from config. Any piece — a single field, a table cell, an entire view — can be swapped for your own React component via `admin.components`. Reach for this only when config-level options (fields, `admin.condition`, access control) genuinely can't express what you need; a custom component is more powerful but also more to maintain.

## Field components

Custom Field components are React (Server Components by default; add `'use client'` when you need interactivity/hooks). You own reading and writing the field's value yourself via `useField`:

```tsx
'use client'
import { useField } from '@payloadcms/ui'

export const ColorPicker: React.FC = () => {
  const { value, setValue } = useField<string>()
  return <input type="color" value={value ?? '#000000'} onChange={(e) => setValue(e.target.value)} />
}
```

Wire it in via the field config: `admin.components.Field`. Common reasons to reach for this:
- The built-in field types genuinely can't represent the input (color picker, map coordinate picker, rich relation browser).
- You want a **Cell** override (`admin.components.Cell`) so the List view shows something more useful than the raw value — a swatch instead of a hex string, a thumbnail instead of a file ID.
- You need to read/react to *other* fields live (use `useFormFields` for that, cheaper than `useField` on the whole form when you only need one sibling value).

## Views

Beyond fields, you can override or add whole admin **views** — the document edit view, list view, or a completely custom route nested under a collection. Use this for things that aren't really "editing a document" (a dashboard, a bulk-import tool, an analytics panel) rather than trying to force it into a field.

## Useful hooks (`@payloadcms/ui`)

- `useField` — read/write one field's value; used internally by every built-in field.
- `useFormFields` — subscribe to specific other fields without re-rendering on every keystroke of the whole form.
- `useAuth` — current user, for role-aware rendering inside a component (pairs with access control — see `access-control.md`).
- `useConfig` — read the live Payload config client-side (slugs, server URL) instead of hardcoding.

## Guardrails

- Keep client bundle size in mind — importing heavy third-party libs into a Custom Component ships them to every editor's browser.
- Build with Payload's own UI primitives (`@payloadcms/ui` exports buttons, inputs, popups, etc.) rather than raw HTML — it keeps custom fields visually indistinguishable from built-in ones, which is most of what makes a custom component feel "native" rather than bolted on.
- Don't build a custom component to work around a field that should just be a Block (see `fields.md`) or a permissions problem (see `access-control.md`) — check those first.
