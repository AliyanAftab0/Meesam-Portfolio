import { defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'aboutP1',
      title: 'About Paragraph 1',
      type: 'text',
      rows: 3
    },
    {
      name: 'aboutP2',
      title: 'About Paragraph 2',
      type: 'text',
      rows: 3
    },
    {
      name: 'aboutP3',
      title: 'About Paragraph 3',
      type: 'text',
      rows: 3
    },
    {
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'string',
      initialValue: 'Video Editor & Graphic Designer'
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Crafting Premium Visual Stories.'
    },
    {
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 2,
      initialValue: 'I help brands and creators stand out through cinematic video editing and intentional graphic design.'
    },
    {
      name: 'profileImage',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
      initialValue: 'Less Noise, More Impact.'
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      validation: Rule => Rule.email()
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url'
    },
    {
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url'
    },
    {
      name: 'tiktokUrl',
      title: 'TikTok URL',
      type: 'url'
    }
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings'
      }
    }
  }
})
