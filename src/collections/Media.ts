import type { CollectionConfig } from 'payload'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import {
  isConvertibleImage,
  convertImageToWebP,
  changeExtensionToWebP,
} from '../utilities/mediaConverter'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  hooks: {
    beforeChange: [
      async ({ data, req }) => {
        // Only process if there's a file being uploaded
        if (req.file && req.file.data) {
          const mimeType = req.file.mimetype

          // Convert images to WebP
          if (isConvertibleImage(mimeType)) {
            try {
              console.log(`Converting ${req.file.name} to WebP...`)

              // Convert to WebP
              const webpBuffer = await convertImageToWebP(req.file.data)

              // Update the file data
              req.file.data = webpBuffer
              req.file.mimetype = 'image/webp'
              req.file.name = changeExtensionToWebP(req.file.name)
              req.file.size = webpBuffer.length

              console.log(`Successfully converted to WebP: ${req.file.name}`)
            } catch (error) {
              console.error('Failed to convert image to WebP:', error)
            }
          }
        }

        return data
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ],
  upload: {
    mimeTypes: [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'video/mp4',
      'video/webm',
      'video/ogg',
      'video/*',
      'application/pdf',
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
      },
      {
        name: 'square',
        width: 500,
        height: 500,
      },
      {
        name: 'small',
        width: 600,
      },
      {
        name: 'medium',
        width: 900,
      },
      {
        name: 'large',
        width: 1400,
      },
      {
        name: 'xlarge',
        width: 1920,
      },
      {
        name: 'og',
        width: 1200,
        height: 630,
        crop: 'center',
      },
    ],
  },
}
