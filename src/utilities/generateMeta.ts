import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/bg.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title || 'lyceum'
  const baseUrl = getServerSideURL()

  let slugPath = ''
  if (Array.isArray(doc?.slug)) {
    slugPath = doc?.slug.join('/')
  } else if (typeof doc?.slug === 'string' && doc.slug !== 'home') {
    slugPath = doc.slug
  }

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: `${baseUrl}${slugPath ? `/${slugPath}` : ''}`,
    }),
    title,
    alternates: {
      canonical: `${baseUrl}${slugPath ? `/${slugPath}` : ''}`,
    },
  }
}
