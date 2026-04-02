'use client'

import { useState } from 'react'
import { X, Tag } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Promotion } from '@/lib/types'

interface PromotionBannerProps {
  promotions: Promotion[]
}

export default function PromotionBanner({ promotions }: PromotionBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  const activePromo = promotions[0]

  if (!activePromo || isDismissed) {
    return null
  }

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="bg-accent text-white px-4 py-2.5">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <Tag size={16} className="shrink-0" />
                <p className="font-body text-sm font-medium truncate">
                  <span className="font-semibold">{activePromo.title}</span>
                  {activePromo.description && (
                    <span className="hidden sm:inline"> — {activePromo.description}</span>
                  )}
                </p>
              </div>
              <button
                onClick={() => setIsDismissed(true)}
                className="shrink-0 p-1 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Dismiss promotion"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
