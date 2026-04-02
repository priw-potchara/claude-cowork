import { client, isSanityConfigured } from './client'
import type { Hero, About, MenuItem, Gallery, Promotion, Testimonial, Hours, Settings } from '@/lib/types'

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { next?: { revalidate?: number } } = {}
): Promise<T | null> {
  if (!isSanityConfigured || !client) return null
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await (client.fetch as any)(query, params, options) as T
  } catch {
    return null
  }
}

export async function getHero(): Promise<Hero | null> {
  return sanityFetch<Hero>(
    `*[_type == "hero"][0]{
      tagline,
      subtext,
      backgroundImage,
      ctaPrimaryLabel,
      ctaSecondaryLabel
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getAbout(): Promise<About | null> {
  return sanityFetch<About>(
    `*[_type == "about"][0]{
      storyTitle,
      storyText,
      image,
      badges
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getMenuItems(category?: string): Promise<MenuItem[] | null> {
  const filter = category
    ? `*[_type == "menuItem" && category == $category && available != false]`
    : `*[_type == "menuItem" && available != false]`

  return sanityFetch<MenuItem[]>(
    `${filter} | order(name asc) {
      _id,
      name,
      description,
      price,
      category,
      image,
      available,
      isVegan,
      isGlutenFree,
      allergenInfo
    }`,
    category ? { category } : {},
    { next: { revalidate: 3600 } }
  )
}

export async function getAllMenuItems(): Promise<MenuItem[] | null> {
  return sanityFetch<MenuItem[]>(
    `*[_type == "menuItem" && available != false] | order(category asc, name asc) {
      _id,
      name,
      description,
      price,
      category,
      image,
      available,
      isVegan,
      isGlutenFree,
      allergenInfo
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getGallery(): Promise<Gallery | null> {
  return sanityFetch<Gallery>(
    `*[_type == "gallery"][0]{
      photos[] | order(order asc) {
        image,
        caption,
        order
      }
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getActivePromotions(): Promise<Promotion[] | null> {
  const now = new Date().toISOString()
  return sanityFetch<Promotion[]>(
    `*[_type == "promotion" && active == true && (expiresAt == null || expiresAt > $now)] | order(_createdAt desc) {
      _id,
      title,
      description,
      active,
      expiresAt
    }`,
    { now },
    { next: { revalidate: 0 } }
  )
}

export async function getTestimonials(): Promise<Testimonial[] | null> {
  return sanityFetch<Testimonial[]>(
    `*[_type == "testimonial"] | order(order asc) {
      _id,
      quote,
      author,
      rating,
      order
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getHours(): Promise<Hours | null> {
  return sanityFetch<Hours>(
    `*[_type == "hours"][0]{
      days[] {
        day,
        openTime,
        closeTime,
        closed
      }
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}

export async function getSettings(): Promise<Settings | null> {
  return sanityFetch<Settings>(
    `*[_type == "settings"][0]{
      shopName,
      address,
      phone,
      email,
      googleMapsUrl,
      instagram,
      facebook,
      tiktok,
      line,
      metaTitle,
      metaDescription,
      ogImage
    }`,
    {},
    { next: { revalidate: 3600 } }
  )
}
