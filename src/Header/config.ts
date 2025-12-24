import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Logo',
      admin: {
        description: 'Upload the logo to be displayed in the site header.',
      },
    },
    link({
      overrides: {
        name: 'link',
        label: 'Link',
      },
    }),
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({ appearances: false }),
        {
          name: 'isBubble',
          type: 'checkbox',
          label: 'Bubble Style Button',
          admin: {
            description: 'If enabled, this nav item will render as a bubble CTA (e.g., Tickets).',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
