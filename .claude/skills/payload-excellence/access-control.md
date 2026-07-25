# Access control: role-aware authoring

Access control isn't just security — used well, it's also how the admin UI declutters itself per role. A field/collection a user can't access is hidden from the Admin Panel automatically, not just blocked at the API.

## Levels

Collection, Global, and Field all take an `access` object with `create`/`read`/`update`/`delete` functions (Globals skip create/delete — they're singletons). Each receives `{ req: { user }, data, doc, siblingData, id }` and returns a **boolean**, or — at collection level only — a `Where` query to scope which documents match:

```ts
export const isAdmin = ({ req: { user } }) => Boolean(user?.role === 'admin')

export const readPublishedOrOwn = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: 'published' } } // public: published only
}

export const Posts: CollectionConfig = {
  access: { read: readPublishedOrOwn, create: isAdmin, update: isAdmin, delete: isAdmin },
}
```

Field-level access can't return a query — boolean only. `read: false` omits the field entirely from the response and the form.

## Using it to shape the authoring experience, not just lock it down

- **Hide entire collections per role** — a collection whose `read` access returns `false` for a role disappears from the nav. Use this instead of training people to ignore sections they can't use.
- **Sensitive fields, not sensitive collections** — e.g. `paymentId` visible only to `isAdmin`, on an otherwise shared Orders collection. Cheaper than splitting into two collections.
- **Scope to "your own"** — `update: ({ req: { user } }) => ({ createdBy: { equals: user.id } })` lets authors edit only their own docs without a separate collection per role.
- Prefer this over `admin.condition` when the gate is about *permission*, not *form state* — `condition` is client-side UI-only and shouldn't be trusted for security.

## Gotcha

Local API (`payload.find()` etc. called from your own server code) **skips access control by default**. If you're calling Payload from a hook, script, or RSC and want your own access rules enforced, pass `overrideAccess: false` explicitly.
