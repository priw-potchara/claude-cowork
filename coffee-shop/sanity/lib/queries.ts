import { client, isSanityConfigured } from './client'

async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { next?: { revalidate?: number; cache?: string } } = {}
): Promise<T | null> {
  if (!isSanityConfigured || !client) return null
  try {
    return await client.fetch<T>(query, params, options as Parameters<typeof client.fetch>[2])
  } catch {
    return null
  }
}

export async function getHero() {
  return sanityFetch(
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

export async function getAbout() {
  return sanityFetch(
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

export async function getMenuItems(category?: string) {
  const filter = category
    ? `*[_type == "menuItem" && category == $category && available != false]`
    : `*[_type == "menuItem" && available != false]`

  return sanityFetch(
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

export async function getAllMenuItems() {
  return sanityFetch(
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

export async function getGallery() {
  return sanityFetch(
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

export async function getActivePromotions() {
  const now = new Date().toISOString()
  return sanityFetch(
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

export async function getTestimonials() {
  return sanityFetch(
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

export async function getHours() {
  return sanityFetch(
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

export async function getSettings() {
  return sanityFetch(
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
