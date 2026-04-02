import { defineField, defineType } from 'sanity'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'photo',
          title: 'Photo',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (Rule) => Rule.max(200),
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              description: 'Lower numbers appear first',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              order: 'order',
            },
            prepare(selection) {
              const { title, media, order } = selection
              return {
                title: title || 'Untitled photo',
                subtitle: order !== undefined ? `Order: ${order}` : '',
                media,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      photos: 'photos',
    },
    prepare(selection) {
      const { photos } = selection
      return {
        title: 'Gallery',
        subtitle: photos ? `${photos.length} photo(s)` : '0 photos',
      }
    },
  },
})
