import createImageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { isSanityConfigured } from './client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'placeholder'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

// Build with raw config so we don't depend on the client being non-null
const builder = createImageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource) {
  if (!isSanityConfigured) return null as unknown as ReturnType<typeof builder.image>
  return builder.image(source)
}
