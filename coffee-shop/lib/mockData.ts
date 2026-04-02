import type { Hero, About, MenuItem, Promotion, Testimonial, Settings, Hours } from './types'

export const mockHero: Hero = {
  tagline: 'Where Every Cup Tells a Story',
  subtext:
    'Handcrafted specialty coffee, fresh pastries, and a warm corner to call your own. Come as you are — stay as long as you like.',
  backgroundImage: null as any,
  ctaPrimaryLabel: 'View Our Menu',
  ctaSecondaryLabel: 'Find Us',
}

export const mockAbout: About = {
  storyTitle: 'Brewed With Passion',
  storyText: `We started Bloom Coffee with a simple dream: create a space where neighbors become friends, and every cup feels like a warm hug.

Our founders spent years travelling the world to source the finest beans from ethical farms. We believe great coffee should feel good — for you, the farmers, and the planet.

Today, Bloom Coffee is more than a café. It's a community gathering place where stories are shared, ideas are born, and the day always starts a little brighter.`,
  image: null as any,
  badges: ['Specialty Coffee', 'Locally Sourced', 'Eco-Friendly', 'Community First', 'Made With Love'],
}

export const mockMenuItems: MenuItem[] = [
  // Drinks
  {
    _id: 'mock-1',
    name: 'Bloom Latte',
    description: 'Our signature double espresso with velvety steamed milk and a hint of vanilla syrup.',
    price: 120,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: true,
    allergenInfo: 'Contains dairy. Available with oat or almond milk.',
  },
  {
    _id: 'mock-2',
    name: 'Single Origin Pour Over',
    description: 'Slow-brewed Ethiopian Yirgacheffe with bright floral and citrus notes.',
    price: 95,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: '',
  },
  {
    _id: 'mock-3',
    name: 'Iced Strawberry Matcha',
    description: 'Ceremonial grade matcha layered with fresh strawberry purée and cold oat milk.',
    price: 135,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: '',
  },
  {
    _id: 'mock-4',
    name: 'Honey Oat Cappuccino',
    description: 'Rich espresso topped with silky oat milk foam and a drizzle of wildflower honey.',
    price: 115,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: 'Contains oat milk.',
  },
  {
    _id: 'mock-5',
    name: 'Dirty Chai Latte',
    description: 'Spiced masala chai with a bold espresso shot and creamy steamed milk.',
    price: 125,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: true,
    allergenInfo: 'Contains dairy. Oat milk available.',
  },
  {
    _id: 'mock-6',
    name: 'Cold Brew Tonic',
    description: 'Smooth 18-hour cold brew poured over sparkling tonic water with a twist of orange.',
    price: 130,
    category: 'drinks',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: '',
  },
  // Food
  {
    _id: 'mock-7',
    name: 'Butter Croissant',
    description: 'Classic French croissant, baked fresh every morning. Flaky, golden, and perfectly buttery.',
    price: 65,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: false,
    allergenInfo: 'Contains gluten, dairy, eggs.',
  },
  {
    _id: 'mock-8',
    name: 'Avocado Toast',
    description: 'Sourdough with smashed avocado, chili flakes, lemon zest, and a poached egg on top.',
    price: 145,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: false,
    allergenInfo: 'Contains gluten, eggs. GF bread available +15.',
  },
  {
    _id: 'mock-9',
    name: 'Banana Walnut Loaf',
    description: 'Moist and warmly spiced banana bread with toasted walnuts. A slice of comfort.',
    price: 75,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: false,
    allergenInfo: 'Contains gluten, dairy, eggs, tree nuts (walnut).',
  },
  {
    _id: 'mock-10',
    name: 'Açaí Granola Bowl',
    description: 'Organic açaí blended with banana, topped with house-made granola, fresh berries, and honey.',
    price: 165,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: false,
    allergenInfo: 'Contains oats. GF granola available on request.',
  },
  {
    _id: 'mock-11',
    name: 'Cheese & Herb Scone',
    description: 'Savory scone with aged cheddar and fresh rosemary, served warm with herb butter.',
    price: 85,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: false,
    allergenInfo: 'Contains gluten, dairy, eggs.',
  },
  {
    _id: 'mock-12',
    name: 'Overnight Oats',
    description: 'Creamy oats soaked in coconut milk, layered with chia pudding, mango, and toasted coconut.',
    price: 120,
    category: 'food',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: 'Contains coconut.',
  },
  // Seasonal
  {
    _id: 'mock-13',
    name: 'Sakura Blossom Latte',
    description: 'Seasonal cherry blossom syrup with vanilla espresso and oat milk, topped with pink foam.',
    price: 145,
    category: 'seasonal',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: '',
  },
  {
    _id: 'mock-14',
    name: 'Mango Passionfruit Fizz',
    description: 'Seasonal sparkling mocktail with fresh mango, passionfruit, lime, and a sprig of mint.',
    price: 110,
    category: 'seasonal',
    image: null as any,
    available: true,
    isVegan: true,
    isGlutenFree: true,
    allergenInfo: '',
  },
  {
    _id: 'mock-15',
    name: 'Pandan Coconut Cake',
    description: 'Layered pandan sponge with coconut cream frosting and toasted coconut flakes.',
    price: 95,
    category: 'seasonal',
    image: null as any,
    available: true,
    isVegan: false,
    isGlutenFree: false,
    allergenInfo: 'Contains gluten, dairy, eggs, coconut.',
  },
]

export const mockPromotions: Promotion[] = [
  {
    _id: 'mock-promo-1',
    title: '🌸 Spring Special — Buy 2 Drinks, Get a Pastry Free!',
    description: 'Valid every day until end of April. Dine-in only.',
    active: true,
    expiresAt: '2026-04-30T23:59:59.000Z',
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    _id: 'mock-t-1',
    quote:
      'The lattes here are absolutely magical. I come every morning and the baristas already know my order. This place truly feels like home.',
    author: 'Priya M.',
    rating: 5,
    order: 1,
  },
  {
    _id: 'mock-t-2',
    quote:
      'Best croissants in the neighborhood, hands down. The atmosphere is cozy and the coffee is always perfectly extracted. My go-to workspace.',
    author: 'James L.',
    rating: 5,
    order: 2,
  },
  {
    _id: 'mock-t-3',
    quote:
      'I stumbled in on a rainy afternoon and never wanted to leave. The seasonal menu is so creative and the staff genuinely care about the craft.',
    author: 'Sara T.',
    rating: 5,
    order: 3,
  },
  {
    _id: 'mock-t-4',
    quote:
      'The pour-over changed my life. I had no idea coffee could taste this clean and bright. Bloom Coffee has ruined me for everywhere else.',
    author: 'Krit P.',
    rating: 5,
    order: 4,
  },
]

export const mockSettings: Settings = {
  shopName: 'Bloom Coffee',
  address: '42 Sukhumvit Soi 11\nKlongtoey Nua, Watthana\nBangkok 10110',
  phone: '+66 2 123 4567',
  email: 'hello@bloomcoffee.co',
  googleMapsUrl: '',
  instagram: 'https://instagram.com/bloomcoffee',
  facebook: 'https://facebook.com/bloomcoffee',
  tiktok: 'https://tiktok.com/@bloomcoffee',
  line: '',
  metaTitle: 'Bloom Coffee — Specialty Coffee in Bangkok',
  metaDescription:
    'Handcrafted specialty coffee, fresh pastries, and a cozy atmosphere in the heart of Bangkok.',
  ogImage: null as any,
}

export const mockHours: Hours = {
  days: [
    { day: 'monday', openTime: '07:00', closeTime: '21:00', closed: false },
    { day: 'tuesday', openTime: '07:00', closeTime: '21:00', closed: false },
    { day: 'wednesday', openTime: '07:00', closeTime: '21:00', closed: false },
    { day: 'thursday', openTime: '07:00', closeTime: '21:00', closed: false },
    { day: 'friday', openTime: '07:00', closeTime: '22:00', closed: false },
    { day: 'saturday', openTime: '08:00', closeTime: '22:00', closed: false },
    { day: 'sunday', openTime: '08:00', closeTime: '20:00', closed: false },
  ],
}
