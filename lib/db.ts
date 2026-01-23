import { client } from './sanity'
import { groq } from 'next-sanity'

// Projects
export async function getAllProjects() {
  if (!client) return []
  return client.fetch(
    groq`*[_type == "project"] | order(_createdAt desc) {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image_url": thumbnail.asset->url,
      "video_url": videoUrl,
      "video_file": videoFile.asset->url,
      skills,
      "is_featured": isFeatured,
      "created_at": _createdAt
    }`
  )
}

export async function getFeaturedProjects() {
  if (!client) return []
  return client.fetch(
    groq`*[_type == "project" && isFeatured == true] | order(_createdAt desc) [0...6] {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image_url": thumbnail.asset->url,
      "video_url": videoUrl,
      "video_file": videoFile.asset->url,
      skills,
      "is_featured": isFeatured,
      "created_at": _createdAt
    }`
  )
}

export async function getProjectById(id: string) {
  if (!client) return null
  return client.fetch(
    groq`*[_type == "project" && _id == $id][0] {
      _id,
      "id": _id,
      title,
      "slug": slug.current,
      category,
      description,
      "image_url": thumbnail.asset->url,
      "video_url": videoUrl,
      "video_file": videoFile.asset->url,
      skills,
      "is_featured": isFeatured,
      "created_at": _createdAt
    }`,
    { id }
  )
}

// Services
export async function getServices() {
  if (!client) return []
  return client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      _id,
      title,
      description,
      icon
    }`
  )
}

// Site Settings
export async function getSettings() {
  if (!client) {
    return {
      about_p1: 'Professional Video Editor and Motion Graphics Artist with a passion for storytelling.',
      about_p2: 'Specializing in cinematic edits, high-end commercials, and engaging social media content.',
      about_p3: 'Based in Pakistan, working with clients globally.',
      contact_email: 'hello@example.com',
      instagram_url: '#',
      youtube_url: '#',
      tiktok_url: '#'
    }
  }

  const settings = await client.fetch(
    groq`*[_type == "siteSettings"][0] {
      "hero_tagline": heroTagline,
      "hero_title": heroTitle,
      "hero_description": heroDescription,
      "profile_image": profileImage.asset->url,
      "about_title": aboutTitle,
      "about_p1": aboutP1,
      "about_p2": aboutP2,
      "about_p3": aboutP3,
      "contact_email": contactEmail,
      "instagram_url": instagramUrl,
      "youtube_url": youtubeUrl,
      "tiktok_url": tiktokUrl
    }`
  )
  
  // Return default values if no settings found
  return settings || {
    about_p1: 'Professional Video Editor and Motion Graphics Artist with a passion for storytelling.',
    about_p2: 'Specializing in cinematic edits, high-end commercials, and engaging social media content.',
    about_p3: 'Based in Pakistan, working with clients globally.',
    contact_email: 'hello@example.com',
    instagram_url: '#',
    youtube_url: '#',
    tiktok_url: '#'
  }
}

// Testimonials
export async function getTestimonials() {
  if (!client) return []
  return client.fetch(
    groq`*[_type == "testimonial"] | order(order asc) {
      _id,
      name,
      role,
      content,
      rating
    }`
  )
}
