import { client } from './client'

export async function getHero() {
  return client.fetch(
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
  return client.fetch(
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

  return client.fetch(
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
  return client.fetch(
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
  return client.fetch(
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
  return client.fetch(
    `*[_type == "promotion" && active == true && (expiresAt == null || expiresAt > $now)] | order(_createdAt desc) {
      _id,
      title,
      description,
      active,
      expiresAt
    }`,
    { now },
    { next: { cache: 'no-store' } }
  )
}

export async function getTestimonials() {
  return client.fetch(
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
  return client.fetch(
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
  return client.fetch(
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
