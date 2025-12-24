import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const BackgroundRichText: Block = {
  slug: 'backgroundRichText',
  interfaceName: 'BackgroundRichTextBlock',
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Background Image',
    },
    {
      name: 'title',
      type: 'textarea',
      required: true,
      label: 'Title',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
          ]
        },
      }),
      label: 'Content',
      required: true,
    },
  ],
}

