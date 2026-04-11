import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function fetchContactForm() {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'forms',
    depth: 1,
    limit: 1,
    overrideAccess: false,
    where: {
      title: {
        equals: 'Contact',
      },
    },
  })
  return result.docs[0] ?? null
}

/**
 * Cached Payload form titled "Contact" (depth 1 for field blocks).
 * Tag `contact_form` — invalidated by {@link revalidateContactForm} on forms afterChange.
 */
export const getCachedContactForm = unstable_cache(
  fetchContactForm,
  ['contact-form-by-title'],
  { tags: ['contact_form'] },
)
