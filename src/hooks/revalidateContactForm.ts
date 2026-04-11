import type { CollectionAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidateContactForm: CollectionAfterChangeHook = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateTag('contact_form', 'max')
  }
  return doc
}
