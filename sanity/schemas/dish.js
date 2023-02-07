import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of the Dish',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'short_description',
      title: 'Short description',
      type: 'string',
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: 'price',
      title: 'Price of the Dish in $',
      type: 'number',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'image',
      title: 'Image of the Dish',
      type: 'image',
    }),
  ],
})
