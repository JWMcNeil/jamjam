import { getPreviewSecret } from '@/utilities/previewSecret'

type Props = {
  collection: 'posts'
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    previewSecret: getPreviewSecret() ?? '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}

