import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Restaurant Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "short_description",
      type: "string",
      title: "Short Description",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image of the restaurant",
    }),
    defineField({
      name: "lat",
      type: "number",
      title: "Latitude of the Restaurant",
    }),
    defineField({
      name: "long",
      type: "number",
      title: "Longitude of the Restaurant",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Restaurant Address",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "rating",
      type: "number",
      title: "Enter a rating from (1-5 Stars)",
      validation: (Rule) => Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a value between 1 and 5")
    }),
    defineField({
      name: "type",
      title: "Category",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "category" }]
    }),
    defineField({
      name: "dishes",
      title: "Dishes",
      type: "array",
      validation: (Rule) => Rule.required(),
      of: [{ type: "reference", to: [{ type: "dish" }] }]
    }),
  ],
})
