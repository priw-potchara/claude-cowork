import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      description: 'The customer review text',
      rows: 4,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      description: 'Name of the reviewer',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      description: 'Star rating from 1 to 5',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [
          { title: '★☆☆☆☆ - 1 star', value: 1 },
          { title: '★★☆☆☆ - 2 stars', value: 2 },
          { title: '★★★☆☆ - 3 stars', value: 3 },
          { title: '★★★★☆ - 4 stars', value: 4 },
          { title: '★★★★★ - 5 stars', value: 5 },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the carousel',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'quote',
      rating: 'rating',
    },
    prepare(selection) {
      const { title, subtitle, rating } = selection
      const stars = rating ? '★'.repeat(rating) + '☆'.repeat(5 - rating) : ''
      return {
        title: `${title} ${stars}`,
        subtitle: subtitle ? subtitle.substring(0, 80) + (subtitle.length > 80 ? '...' : '') : '',
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Rating (highest first)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
  ],
})
