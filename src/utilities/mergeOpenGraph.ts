import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630
export const OG_IMAGE_MAX_BYTES = 500_000
export const TWITTER_HANDLE = '@jamjamdev'
export const SITE_NAME = 'jamjam.dev'
export const OG_LOCALE = 'en_US'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: SITE_NAME,
  images: [
    {
      url: `${getServerSideURL()}/og?title=${encodeURIComponent(SITE_NAME)}`,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: SITE_NAME,
    },
  ],
  locale: OG_LOCALE,
  siteName: SITE_NAME,
  title: SITE_NAME,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
