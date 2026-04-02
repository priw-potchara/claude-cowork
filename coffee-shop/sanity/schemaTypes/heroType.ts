import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Main headline displayed in the hero section',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subtext',
      title: 'Subtext',
      type: 'text',
      description: 'Supporting text below the tagline',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA Button Label',
      type: 'string',
      description: 'Text for the primary call-to-action button',
      initialValue: 'View Our Menu',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary CTA Button Label',
      type: 'string',
      description: 'Text for the secondary call-to-action button',
      initialValue: 'Find Us',
    }),
  ],
  preview: {
    select: {
      title: 'tagline',
      media: 'backgroundImage',
    },
  },
})
