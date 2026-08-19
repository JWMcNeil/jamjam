import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { type Field, type Plugin } from 'payload'
import { muxVideoPlugin } from '@oversightstudio/mux-video'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import type {
  GenerateDescription,
  GenerateImage,
  GenerateTitle,
  GenerateURL,
} from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { revalidateContactForm } from '@/hooks/revalidateContactForm'
import { r2StoragePlugin } from '@/plugins/r2Storage'

import type { BoardItem, Lab, Post, Project } from '@/payload-types'
import { getMuxCorsOrigin, getServerSideURL } from '@/utilities/getURL'
import { iconOptions } from '@/utilities/icons'

type SeoDoc = Post | Project | Lab | BoardItem

const generateTitle: GenerateTitle<SeoDoc> = ({ doc }) => {
  return doc?.title?.trim() || 'jamjam.dev'
}

const generateDescription: GenerateDescription<SeoDoc> = ({ doc }) => {
  if ('excerpt' in doc && typeof doc.excerpt === 'string' && doc.excerpt.trim()) {
    return doc.excerpt.trim()
  }
  if ('description' in doc && typeof doc.description === 'string' && doc.description.trim()) {
    return doc.description.trim()
  }
  if ('context' in doc && typeof doc.context === 'string' && doc.context.trim()) {
    return doc.context.trim()
  }
  return doc?.title?.trim() || 'jamjam.dev'
}

const generateImage: GenerateImage<SeoDoc> = ({ doc }) => {
  if ('cover' in doc && doc.cover != null) {
    const cover = doc.cover
    if (typeof cover === 'number') return cover
    if (typeof cover === 'object' && 'id' in cover) return cover.id
  }
  if (!('heroImage' in doc) || doc.heroImage == null) return ''
  const hero = doc.heroImage
  if (typeof hero === 'number') return hero
  if (typeof hero === 'object' && 'id' in hero) return hero.id
  return ''
}

const generateURL: GenerateURL<SeoDoc> = ({ doc, collectionSlug }) => {
  const base = getServerSideURL()
  if (!doc?.slug) return base

  if (collectionSlug === 'posts') return `${base}/posts/${doc.slug}`
  if (collectionSlug === 'projects') return `${base}/projects/${doc.slug}`
  if (collectionSlug === 'lab') return `${base}/lab/${doc.slug}`
  if (collectionSlug === 'board-items') return `${base}/board/${doc.slug}`

  return `${base}/${doc.slug}`
}

export const plugins: Plugin[] = [
  r2StoragePlugin,
  muxVideoPlugin({
    enabled: true,
    initSettings: {
      tokenId: process.env.MUX_TOKEN_ID || '',
      tokenSecret: process.env.MUX_TOKEN_SECRET || '',
      webhookSecret: process.env.MUX_WEBHOOK_SIGNING_SECRET || '',
    },
    uploadSettings: {
      cors_origin: getMuxCorsOrigin(),
    },
  }),
  redirectsPlugin({
    collections: ['posts', 'projects'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['tags'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateDescription,
    generateImage,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      hooks: {
        afterChange: [revalidateContactForm],
      },
      fields: ({ defaultFields }) => {
        const updatedFields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })

        const chipsBlock = {
          slug: 'chips',
          labels: {
            singular: 'Chips',
            plural: 'Chips',
          },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Field Name',
            },
            {
              name: 'label',
              type: 'text',
              label: 'Label',
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Required',
            },
            {
              name: 'options',
              type: 'array',
              label: 'Options',
              required: true,
              minRows: 1,
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                  label: 'Label',
                },
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  label: 'Icon',
                  options: [...iconOptions],
                },
              ],
            },
          ] as Field[],
        }

        const fieldsField = updatedFields.find(
          (field) => 'name' in field && field.name === 'fields',
        )
        if (fieldsField && 'blocks' in fieldsField && Array.isArray(fieldsField.blocks)) {
          fieldsField.blocks.push(chipsBlock)
        }

        return updatedFields
      },
    },
  }),
  searchPlugin({
    collections: ['posts', 'projects'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
