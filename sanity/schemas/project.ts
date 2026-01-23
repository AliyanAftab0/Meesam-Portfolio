import { defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Video', value: 'Video' },
          { title: 'Graphic Design', value: 'Graphic Design' },
          { title: 'Motion Graphics', value: 'Motion Graphics' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'videoUrl',
      title: 'External Video URL',
      description: 'YouTube, TikTok, or Instagram link',
      type: 'url'
    },
    {
      name: 'videoFile',
      title: 'Direct Video File',
      description: 'Upload an MP4 file directly (use this if you have the file locally)',
      type: 'file',
      options: {
        accept: 'video/mp4'
      }
    },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required()
    },
    {
      name: 'isFeatured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category'
    },
    prepare({ title, media, category }) {
      return {
        title,
        subtitle: category,
        media
      }
    }
  }
})
