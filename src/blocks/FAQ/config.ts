import type { Block, Field } from 'payload'
import { link } from '@/fields/link'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  OrderedListFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const faqItemFields: Field[] = [
  {
    name: 'question',
    type: 'text',
    required: true,
    label: 'Question',
  },
  {
    name: 'answer',
    type: 'richText',
    required: true,
    label: 'Answer',
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
  {
    name: 'enableLink',
    type: 'checkbox',
    label: 'Enable Link',
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'FAQ Title',
      defaultValue: 'FAQ',
    },
    {
      name: 'items',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: faqItemFields,
      label: 'FAQ Items',
    },
  ],
  labels: {
    plural: 'FAQ Blocks',
    singular: 'FAQ Block',
  },
}
