import { defineField, defineType } from 'sanity'

export const menuItemType = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in local currency',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Drinks', value: 'drinks' },
          { title: 'Food', value: 'food' },
          { title: 'Seasonal', value: 'seasonal' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'available',
      title: 'Available',
      type: 'boolean',
      description: 'Is this item currently available?',
      initialValue: true,
    }),
    defineField({
      name: 'isVegan',
      title: 'Vegan',
      type: 'boolean',
      description: 'Is this item suitable for vegans?',
      initialValue: false,
    }),
    defineField({
      name: 'isGlutenFree',
      title: 'Gluten Free',
      type: 'boolean',
      description: 'Is this item gluten-free?',
      initialValue: false,
    }),
    defineField({
      name: 'allergenInfo',
      title: 'Allergen Information',
      type: 'text',
      description: 'List any allergens or dietary notes',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: subtitle ? subtitle.charAt(0).toUpperCase() + subtitle.slice(1) : 'Uncategorized',
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Price (low to high)',
      name: 'priceAsc',
      by: [{ field: 'price', direction: 'asc' }],
    },
  ],
})
