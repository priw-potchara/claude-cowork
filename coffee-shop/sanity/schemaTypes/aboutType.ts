import { defineField, defineType } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'storyTitle',
      title: 'Story Title',
      type: 'string',
      description: 'Title for the about/story section',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'storyText',
      title: 'Story Text',
      type: 'text',
      description: 'The brand story or about us text',
      rows: 6,
      validation: (Rule) => Rule.required().max(2000),
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'badges',
      title: 'Badges',
      type: 'array',
      description: 'Short highlight phrases shown as pill badges',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
  ],
  preview: {
    select: {
      title: 'storyTitle',
      media: 'image',
    },
  },
})
