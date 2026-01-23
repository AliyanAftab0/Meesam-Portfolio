import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Only initialize if we have a project ID to avoid "Dataset not found" errors
export const client = projectId 
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
    })
  : null

const builder = client ? createImageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder || !source) {
    return { url: () => "" }
  }
  return builder.image(source)
}
