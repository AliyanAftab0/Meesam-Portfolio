import { defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'role',
      title: 'Role/Company',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Testimonial',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5),
      initialValue: 5
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role'
    }
  }
})
