import type { Block } from 'payload'
import { link } from '@/fields/link'

export const ActivityCarousel: Block = {
  slug: 'activityCarousel',
  interfaceName: 'ActivityCarouselBlock',
  labels: {
    singular: 'Activity Carousel',
    plural: 'Activity Carousels',
  },
  fields: [
    {
      name: 'enableAutoplay',
      label: 'Enable Autoplay',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'autoplayDelay',
      label: 'Autoplay Delay (ms)',
      type: 'number',
      defaultValue: 6000,
      min: 1000,
      admin: {
        description: 'Time between slide changes when autoplay is enabled.',
        step: 100,
        width: '50%',
        condition: (_, siblingData) => Boolean(siblingData?.enableAutoplay),
      },
    },
    {
      name: 'slides',
      label: 'Slides',
      type: 'array',
      labels: {
        plural: 'Slides',
        singular: 'Slide',
      },
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'dateLabel',
          label: 'Date Label',
          type: 'text',
        },
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
        },
        link({
          overrides: {
            name: 'link',
            label: 'Button Link',
          },
        }),
        {
          name: 'image',
          label: 'Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
