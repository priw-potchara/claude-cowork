'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Leaf, Wheat, ChevronDown, ChevronUp } from 'lucide-react'
import { MenuItem } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import SectionHeader from '@/components/ui/SectionHeader'

type Category = 'drinks' | 'food' | 'seasonal'

const CATEGORIES: { label: string; value: Category; emoji: string }[] = [
  { label: 'Drinks', value: 'drinks', emoji: '☕' },
  { label: 'Food', value: 'food', emoji: '🥐' },
  { label: 'Seasonal', value: 'seasonal', emoji: '🌸' },
]

interface MenuCardProps {
  item: MenuItem
  index: number
}

function MenuCard({ item, index }: MenuCardProps) {
  const [showAllergens, setShowAllergens] = useState(false)

  const imageUrl = item.image
    ? urlFor(item.image).width(400).height(280).fit('crop').url()
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="bg-white rounded-card shadow-warm overflow-hidden flex flex-col"
    >
      <div className="relative h-44 bg-primary/30">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {item.category === 'drinks' ? '☕' : item.category === 'food' ? '🥐' : '🌸'}
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading text-lg text-text-dark leading-tight">{item.name}</h3>
          <span className="font-body font-bold text-accent text-base whitespace-nowrap shrink-0">
            ฿{item.price}
          </span>
        </div>
        {item.description && (
          <p className="text-text-dark/65 font-body text-sm mb-3 flex-1 leading-relaxed line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {item.isVegan && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-body font-medium px-2 py-1 rounded-full">
              <Leaf size={11} /> Vegan
            </span>
          )}
          {item.isGlutenFree && (
            <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-body font-medium px-2 py-1 rounded-full">
              <Wheat size={11} /> GF
            </span>
          )}
        </div>
        {item.allergenInfo && (
          <div className="mt-2 pt-2 border-t border-primary/30">
            <button
              onClick={() => setShowAllergens(!showAllergens)}
              className="flex items-center gap-1 text-xs text-text-dark/50 font-body hover:text-text-dark transition-colors"
            >
              {showAllergens ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
              Allergens
            </button>
            <AnimatePresence>
              {showAllergens && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-text-dark/55 font-body mt-1 overflow-hidden leading-relaxed"
                >
                  {item.allergenInfo}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}

interface MenuProps {
  menuItems: MenuItem[]
}

export default function Menu({ menuItems }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('drinks')

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Our Menu"
          subtitle="From morning lattes to evening desserts — everything crafted with intention."
          centered
        />

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mt-10 mb-10 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-button font-body font-medium text-sm transition-all duration-200 ${
                activeCategory === cat.value
                  ? 'bg-accent text-white shadow-warm'
                  : 'bg-white text-text-dark hover:bg-primary/30'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
              <span className={`text-xs ${activeCategory === cat.value ? 'opacity-70' : 'opacity-50'}`}>
                ({menuItems.filter((i) => i.category === cat.value).length})
              </span>
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.slice(0, 6).map((item, i) => (
                  <MenuCard key={item._id} item={item} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-5xl mb-4">
                  {activeCategory === 'drinks' ? '☕' : activeCategory === 'food' ? '🥐' : '🌸'}
                </p>
                <p className="font-heading text-xl text-text-dark mb-2">Coming soon</p>
                <p className="font-body text-text-dark/60 text-sm">
                  We&apos;re working on something delicious. Check back soon!
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {menuItems.length > 6 && (
          <div className="text-center mt-10">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-accent text-white font-body font-medium px-8 py-3.5 rounded-button transition-all duration-200 hover:opacity-90 active:scale-95 shadow-warm"
            >
              View Full Menu
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
