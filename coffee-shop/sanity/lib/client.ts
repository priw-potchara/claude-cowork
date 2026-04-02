import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Only valid if projectId is set and contains only a-z, 0-9, dashes
export const isSanityConfigured =
  typeof projectId === 'string' && /^[a-z0-9-]+$/.test(projectId)

export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null
