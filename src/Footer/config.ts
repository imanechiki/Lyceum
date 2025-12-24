import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: { read: () => true },
  fields: [
    {
      name: 'logo',
      label: 'Footer Logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    link({
      overrides: {
        name: 'link',
        label: 'Logo Link',
      },
    }),
    {
      name: 'primaryNavHeading',
      type: 'text',
      label: 'Primary Navigation Heading',
      defaultValue: 'lyceum',
    },
    {
      name: 'navItems',
      label: 'lyceum Navigation',
      type: 'array',
      fields: [link({ appearances: false })],
    },
    {
      name: 'secondaryNavHeading',
      type: 'text',
      label: 'Secondary Navigation Heading',
      defaultValue: 'duPont REGISTRY Group',
    },
    {
      name: 'secondNavItems',
      label: 'duPont Navigation',
      type: 'array',
      fields: [link({ appearances: false })],
    },
    {
      name: 'subscribeLabel',
      type: 'text',
      label: 'Subscribe Subtitle',
    },
    {
      name: 'subscribeButtonLabel',
      type: 'text',
      label: 'Subscribe Button Label',
    },
    {
      name: 'subscribeText',
      type: 'text',
      label: 'Subscribe Field Placeholder',
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'platform',
          type: 'text',
          label: 'Social Media Platform',
          required: true,
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Social Media URL',
          required: true,
        },
      ],
    },
    {
      name: 'privacyLinks',
      label: 'Privacy Policy Links',
      type: 'array',
      maxRows: 1,
      fields: [link({ appearances: false })],
    },
    {
      name: 'termsLinks',
      label: 'Terms & Conditions Links',
      type: 'array',
      maxRows: 1,
      fields: [link({ appearances: false })],
    },
  ],
  hooks: { afterChange: [revalidateFooter] },
}
