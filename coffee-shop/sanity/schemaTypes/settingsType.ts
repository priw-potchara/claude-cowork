import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'shopName',
      title: 'Shop Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsUrl',
      title: 'Google Maps Embed URL',
      type: 'url',
      description: 'The full embed URL from Google Maps (not the share URL)',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'line',
      title: 'LINE ID or URL',
      type: 'string',
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Default page title for SEO',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Default meta description for SEO',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image used when sharing on social media (1200x630px recommended)',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'shopName',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Site Settings',
      }
    },
  },
})
