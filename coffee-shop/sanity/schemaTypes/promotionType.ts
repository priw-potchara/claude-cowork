import { defineField, defineType } from 'sanity'

export const promotionType = defineType({
  name: 'promotion',
  title: 'Promotion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Short promotional headline',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'More detail about the promotion',
      rows: 3,
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Is this promotion currently active?',
      initialValue: true,
    }),
    defineField({
      name: 'expiresAt',
      title: 'Expires At',
      type: 'datetime',
      description: 'When does this promotion expire? Leave empty for no expiry.',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
      expiresAt: 'expiresAt',
    },
    prepare(selection) {
      const { title, active, expiresAt } = selection
      const expired = expiresAt && new Date(expiresAt) < new Date()
      const status = !active ? 'Inactive' : expired ? 'Expired' : 'Active'
      return {
        title,
        subtitle: status,
      }
    },
  },
})
