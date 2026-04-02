'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { Leaf, Wheat, ChevronDown, ChevronUp } from 'lucide-react'
import { MenuItem } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

type Category = 'drinks' | 'food' | 'seasonal'

const CATEGORIES: { label: string; value: Category }[] = [
  { label: 'Drinks', value: 'drinks' },
  { label: 'Food', value: 'food' },
  { label: 'Seasonal', value: 'seasonal' },
]

interface MenuCardProps {
  item: MenuItem
}

function MenuCard({ item }: MenuCardProps) {
  const [showAllergens, setShowAllergens] = useState(false)

  const imageUrl = item.image
    ? urlFor(item.image).width(400).height(300).fit('crop').url()
    : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-card shadow-warm overflow-hidden flex flex-col"
    >
      <div className="relative h-48 w-full bg-primary/30">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-5xl">☕</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-xl text-text-dark leading-tight">{item.name}</h3>
          <span className="font-body font-semibold text-accent text-lg whitespace-nowrap">
            ฿{item.price}
          </span>
        </div>
        {item.description && (
          <p className="text-text-dark/70 font-body text-sm mb-3 flex-1 leading-relaxed">
            {item.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.isVegan && (
            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-body font-medium px-2.5 py-1 rounded-full">
              <Leaf size={12} />
              Vegan
            </span>
          )}
          {item.isGlutenFree && (
            <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-body font-medium px-2.5 py-1 rounded-full">
              <Wheat size={12} />
              Gluten Free
            </span>
          )}
        </div>
        {item.allergenInfo && (
          <div className="mt-3 border-t border-primary/30 pt-3">
            <button
              onClick={() => setShowAllergens(!showAllergens)}
              className="flex items-center gap-1 text-xs text-text-dark/60 font-body hover:text-text-dark transition-colors"
            >
              {showAllergens ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              Allergen Info
            </button>
            <AnimatePresence>
              {showAllergens && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-text-dark/60 font-body mt-1 overflow-hidden"
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

export default function MenuPageClient({ menuItems }: { menuItems: MenuItem[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>('drinks')

  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  return (
    <>
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-6 py-2.5 rounded-button font-body font-medium text-sm transition-all duration-200 ${
              activeCategory === cat.value
                ? 'bg-accent text-white shadow-warm'
                : 'bg-white text-text-dark hover:bg-primary/30'
            }`}
          >
            {cat.label}
            <span className="ml-2 text-xs opacity-70">
              ({menuItems.filter((i) => i.category === cat.value).length})
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">☕</p>
              <p className="font-heading text-2xl text-text-dark mb-2">Nothing here yet</p>
              <p className="text-text-dark/60 font-body">
                Check back soon — we&apos;re brewing something special.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
