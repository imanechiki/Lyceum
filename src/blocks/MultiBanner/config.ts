import type { Block } from 'payload'
import { link } from '@/fields/link'

export const MultiBanner: Block = {
  slug: 'multiBanner',
  interfaceName: 'MultiBannerBlock',
  labels: { singular: 'Multi Banner', plural: 'Multi Banners' },
  fields: [
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Slide', plural: 'Slides' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'background',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          admin: {
            description: 'Short heading (uppercased in design). Keep under ~10 words.',
          },
        },
        {
          name: 'link',
          type: 'group',
          fields: [
            link({
              overrides: {
                name: 'button',
                label: 'Button',
              },
            }),
          ],
        },
      ],
    },
  ],
}

export default MultiBanner
