import type { CollectionAfterReadHook } from 'payload'

// The `user` collection has access control locked so that users are not publicly accessible.
// `overrideAccess` + `select: { name }` loads only display-safe fields for `populatedAuthors`.
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const populated: { id: number; name?: string | null }[] = []

    for (const author of doc.authors) {
      try {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
          overrideAccess: true,
          select: {
            name: true,
          },
        })

        if (authorDoc) {
          populated.push({
            id: authorDoc.id,
            name: authorDoc.name,
          })
        }
      } catch {
        // swallow error
      }
    }

    if (populated.length > 0) {
      doc.populatedAuthors = populated
    }
  }

  return doc
}
