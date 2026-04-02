export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface Hero {
  tagline: string
  subtext: string
  backgroundImage: SanityImage
  ctaPrimaryLabel: string
  ctaSecondaryLabel: string
}

export interface About {
  storyTitle: string
  storyText: string
  image: SanityImage
  badges: string[]
}

export interface MenuItem {
  _id: string
  name: string
  description: string
  price: number
  category: 'drinks' | 'food' | 'seasonal'
  image: SanityImage
  available: boolean
  isVegan: boolean
  isGlutenFree: boolean
  allergenInfo: string
}

export interface GalleryPhoto {
  image: SanityImage
  caption: string
  order: number
}

export interface Gallery {
  photos: GalleryPhoto[]
}

export interface Promotion {
  _id: string
  title: string
  description: string
  active: boolean
  expiresAt: string | null
}

export interface Testimonial {
  _id: string
  quote: string
  author: string
  rating: number
  order: number
}

export interface HoursDay {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  openTime: string
  closeTime: string
  closed: boolean
}

export interface Hours {
  days: HoursDay[]
}

export interface Settings {
  shopName: string
  address: string
  phone: string
  email: string
  googleMapsUrl: string
  instagram: string
  facebook: string
  tiktok: string
  line: string
  metaTitle: string
  metaDescription: string
  ogImage: SanityImage
}
