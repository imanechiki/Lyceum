import type { Block } from 'payload'
import { link  } from '@/fields/link'
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor, OrderedListFeature, UnorderedListFeature } from '@payloadcms/richtext-lexical'


export const CTA: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  fields: [
    { name: 'backgroundImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'mobileBackgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Mobile Background Image',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Optional thumbnail image for the poster if the background is a video.',
      },
    },
    { name: 'title', type: 'text', required: true },
    {
      name: 'content',
      type: 'richText',
      required: false,
      admin: { description: 'Optional paragraph that appears below the title.' },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4', 'h5', 'h6'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            OrderedListFeature(),
          ]
        },
      }),
    },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
      },
    }),
    
  ],
}
