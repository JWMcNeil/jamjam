# Fields: labels, descriptions, validation, conditional logic, grouping

The single highest-leverage thing you can do for an editor is make the form read like the content, not like the schema. Payload gives you the primitives; the default config just doesn't use most of them.

## Descriptions (static, dynamic, and component)

`admin.description` accepts a string, a function, or a full React component. Use a function when the helpful text depends on what's already been typed (character counts, computed previews):

```ts
{
  name: 'metaTitle',
  type: 'text',
  maxLength: 60,
  admin: {
    description: ({ value }) =>
      typeof value === 'string' ? `${60 - value.length} characters left` : 'Aim for under 60 characters',
  },
}
```

For anything that needs to subscribe to live form state beyond the string return (icons, colored warnings, links), use a Description **Component** instead of a function — set `admin.components.Description`.

Collections and Globals can also carry descriptions (`admin.description` at the top level of the config) — use this to tell an editor what the collection is *for*, not just what it's called.

## Conditional logic

`admin.condition` is a function on the field's `admin` config. It receives the full document data and the sibling data (fields at the same nesting level), and returns a boolean:

```ts
{
  name: 'ctaUrl',
  type: 'text',
  admin: {
    condition: (data, siblingData) => siblingData?.showCta === true,
  },
}
```

Use this to hide entire sections of a form until they're relevant — e.g. don't show "video embed URL" unless "content type" is set to `video`. This is the single biggest lever for making a 40-field form feel like a 10-field form.

Caveats: `condition` runs client-side against data already in the form — you can't reliably call `payload.find()` or other async server calls inside it (people hit this trying to gate fields on related-document lookups; it works inconsistently). If you need server truth to decide visibility, gate at the access-control layer instead (see `access-control.md`), not via `condition`.

## Validation

Every field type supports a custom `validate` function returning `true` or an error string. For validation that depends on *other* fields (not just this field's own value), do it in a collection-level `beforeValidate` hook instead, where you get the full `data` object and can throw a Payload `APIError` with a message the editor will actually see:

```ts
hooks: {
  beforeValidate: [
    ({ data }) => {
      if (data?.showCta && !data?.ctaUrl) {
        throw new APIError('CTA URL is required when "Show CTA" is enabled');
      }
    },
  ],
}
```

## Grouping and layout

Layout isn't decoration — it's how an editor perceives what belongs together and how long the form actually is. Reach for these deliberately, not just when a form "feels long":

- **Logical grouping first.** Before picking a layout primitive, group fields by how an editor thinks about the content (e.g. "Hero", "SEO", "Scheduling"), not by data type or the order they were added to the schema. The layout choice below should express a grouping decision you've already made, not substitute for one.

- **`group`** field type — visually clusters related fields under a heading, no effect on data shape unless you want it to. Good default for "these five fields are one concept" without needing a tab or sidebar split.

- **Tabs** — `tabs` field type splits a long form into tabbed sections. Best for collections with genuinely distinct concerns (e.g. "Content" vs "SEO" vs "Scheduling") rather than an arbitrary split. Tabs hide complexity; don't bury a field an editor needs every time behind a tab click.

- **`admin.position: 'sidebar'`** — pulls a field out of the main column into the right-hand sidebar. Reserve this for metadata editors check but don't compose with (status, publish date, slug) — not for primary content fields.

- **Row field type — two-column (or N-column) layout.** Any set of short-string fields (first name/last name, width/height, min/max, city/state/zip) should almost never stack full-width down the page — that's wasted scroll for no readability gain. Wrap them in a `row`:

  ```ts
  {
    type: 'row',
    fields: [
      { name: 'firstName', type: 'text', admin: { width: '50%' } },
      { name: 'lastName', type: 'text', admin: { width: '50%' } },
    ],
  }
  ```

  Rule of thumb: if a field's natural input is short (a few words, a number, a short code) and there's a logically adjacent field of similar length, put them in a row rather than defaulting to full-width. Reserve full-width for anything that can hold a sentence or more (text areas, rich text, long titles).

- **Promote to a Block when a field group is reusable.** If you find yourself repeating the same cluster of fields — inside an `array`, copy-pasted across collections, or manually duplicated within one document — that's the signal to extract it into a `blocks` field (or a shared field group you import into multiple configs). Concretely:
  - The same "quote + attribution + photo" shape appears in three different page sections → make it a `Quote` block, not three near-identical array fields.
  - A "CTA button" (label + url + style) shows up inside hero, footer, and inline content → one `CtaBlock` definition, imported wherever it's needed.
  - Benefits beyond DRY schema code: editors get a consistent, recognizable authoring pattern for "a quote" everywhere it appears, and you get a single place to improve labels/validation/conditional logic for that concept instead of N places.
  - Don't over-promote: a field group used exactly once, with no likely reuse, doesn't need to be a block — that's just indirection for its own sake.

## Presentational-only fields

Remember `ui` and `collapsible`/`group` don't store data — they're purely for organizing the editing experience. Don't reach for a real field type (like a hidden text field) to fake a UI grouping; use the presentational types so your schema stays honest.

## Checklist when reviewing a collection for authoring quality

- [ ] Does every non-obvious field have a description?
- [ ] Are there fields that only matter in certain states? → add `admin.condition`
- [ ] Is the form one long vertical list of 15+ fields with no grouping? → tabs or groups
- [ ] Are cross-field validation errors currently silent or unclear? → `beforeValidate` + `APIError`
- [ ] Is metadata (status, dates, author) mixed into the main content flow instead of the sidebar?
