import { getPreviewSecret } from '@/utilities/previewSecret'

type Props = {
  collection: 'board-items'
  slug: string
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  const encodedParams = new URLSearchParams({
    slug,
    collection,
    previewSecret: getPreviewSecret() ?? '',
  })

  return `/next/preview?${encodedParams.toString()}`
}
