import { getPreviewSecret } from '@/utilities/previewSecret'

type Props = {
  collection: 'projects'
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

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
