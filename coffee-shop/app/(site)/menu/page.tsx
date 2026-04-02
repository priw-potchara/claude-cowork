import type { Metadata } from 'next'
import { getAllMenuItems } from '@/sanity/lib/queries'
import MenuPageClient from './MenuPageClient'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore our full menu of handcrafted drinks, fresh food, and seasonal specialties. Something delicious for every visit.',
}

export default async function MenuPage() {
  const menuItems = await getAllMenuItems()

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl text-text-dark mb-4">Our Menu</h1>
          <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
          <p className="text-text-dark/70 font-body text-lg max-w-xl mx-auto">
            Crafted with love, sourced with care. Every item on our menu is made to delight.
          </p>
        </div>
        <MenuPageClient menuItems={menuItems || []} />
      </div>
    </div>
  )
}
