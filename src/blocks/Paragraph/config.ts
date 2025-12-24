import type { Block } from 'payload'
import { link } from '@/fields/link'

export const Paragraph: Block = {
  slug: 'paragraph',
  interfaceName: 'Paragraph',
  fields: [
    {
      name: 'paragraph',
      type: 'textarea',
      required: true,
    },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
      },
    }),
  ],
}
