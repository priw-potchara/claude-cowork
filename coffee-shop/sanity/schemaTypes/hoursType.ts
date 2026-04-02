import { defineField, defineType } from 'sanity'

export const hoursType = defineType({
  name: 'hours',
  title: 'Opening Hours',
  type: 'document',
  fields: [
    defineField({
      name: 'days',
      title: 'Days',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayHours',
          title: 'Day Hours',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openTime',
              title: 'Opening Time',
              type: 'string',
              description: 'e.g. 07:00',
              validation: (Rule) => Rule.regex(/^\d{2}:\d{2}$/, { name: 'time format', invert: false }).warning('Please use HH:MM format'),
            }),
            defineField({
              name: 'closeTime',
              title: 'Closing Time',
              type: 'string',
              description: 'e.g. 21:00',
              validation: (Rule) => Rule.regex(/^\d{2}:\d{2}$/, { name: 'time format', invert: false }).warning('Please use HH:MM format'),
            }),
            defineField({
              name: 'closed',
              title: 'Closed',
              type: 'boolean',
              description: 'Is the shop closed on this day?',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              day: 'day',
              openTime: 'openTime',
              closeTime: 'closeTime',
              closed: 'closed',
            },
            prepare(selection) {
              const { day, openTime, closeTime, closed } = selection
              const dayLabel = day ? day.charAt(0).toUpperCase() + day.slice(1) : 'Unknown'
              const hours = closed ? 'Closed' : `${openTime || '--'} – ${closeTime || '--'}`
              return {
                title: dayLabel,
                subtitle: hours,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Opening Hours',
      }
    },
  },
})
