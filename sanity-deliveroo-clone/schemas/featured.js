import {defineField, defineType} from 'sanity'
import restaurant from './restaurant'

export default defineType({
  name: 'featured',
  title: 'Featured Menu categories',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Featured Category Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'restaurants',
      title: 'Restaurants',
      type: 'array',
      validation: (Rule) => Rule.required().max(200),
      of: [
        {
          type: 'reference',
          to: [
            {
              type: restaurant.name,
            },
          ],
        },
      ],
    }),
  ],
})
