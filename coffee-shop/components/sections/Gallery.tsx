'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Gallery as GalleryType, GalleryPhoto } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeIn from '@/components/ui/FadeIn'

interface GalleryProps {
  gallery?: GalleryType | null
}

const FALLBACK_PHOTOS = [
  { caption: 'Morning brew', emoji: '☕' },
  { caption: 'Fresh pastries', emoji: '🥐' },
  { caption: 'Cozy atmosphere', emoji: '🪑' },
  { caption: 'Latte art', emoji: '🎨' },
  { caption: 'Beans sourced ethically', emoji: '🌱' },
  { caption: 'Our team', emoji: '👋' },
]

export default function Gallery({ gallery }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const photos: GalleryPhoto[] = gallery?.photos || []

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)

  const prevPhoto = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length)
  }

  const nextPhoto = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % photos.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
  }

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up">
          <SectionHeader
            title="Gallery"
            subtitle="Moments from our little corner of the world."
            centered
          />
        </FadeIn>

        {photos.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {photos.map((photo, i) => {
              const imageUrl = photo.image
                ? urlFor(photo.image).width(600).height(450).fit('crop').url()
                : null

              const isWide = i === 0 || i === 5
              const isTall = i === 3

              return (
                <FadeIn key={i} direction="up" delay={i * 0.05}>
                  <motion.button
                    onClick={() => openLightbox(i)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`relative overflow-hidden rounded-card bg-primary/30 cursor-pointer w-full ${
                      isWide ? 'md:col-span-2' : ''
                    } ${isTall ? 'row-span-2' : ''}`}
                    style={{ aspectRatio: isWide ? '16/9' : '4/3' }}
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={photo.caption || `Gallery photo ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
                        <span className="text-4xl">{FALLBACK_PHOTOS[i % FALLBACK_PHOTOS.length]?.emoji}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-warm-charcoal/0 hover:bg-warm-charcoal/30 transition-colors duration-300 flex items-end">
                      {photo.caption && (
                        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 p-4 w-full bg-gradient-to-t from-warm-charcoal/70 to-transparent">
                          <p className="font-body text-sm text-cream font-medium">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  </motion.button>
                </FadeIn>
              )
            })}
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {FALLBACK_PHOTOS.map((item, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.05}>
                <div
                  className="relative rounded-card bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
                  style={{ aspectRatio: '4/3' }}
                >
                  <div className="text-center">
                    <p className="text-5xl mb-2">{item.emoji}</p>
                    <p className="font-body text-text-dark/60 text-sm">{item.caption}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-warm-charcoal/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-cream hover:text-accent transition-colors p-2"
                aria-label="Close lightbox"
              >
                <X size={28} />
              </button>

              {/* Image */}
              <div className="relative w-full max-h-[75vh] rounded-2xl overflow-hidden">
                {photos[lightboxIndex].image && (
                  <div className="relative" style={{ aspectRatio: '16/10' }}>
                    <Image
                      src={urlFor(photos[lightboxIndex].image).width(1200).height(750).fit('crop').url()}
                      alt={photos[lightboxIndex].caption || `Photo ${lightboxIndex + 1}`}
                      fill
                      sizes="90vw"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Caption */}
              {photos[lightboxIndex].caption && (
                <p className="mt-4 font-body text-cream/80 text-center text-sm">
                  {photos[lightboxIndex].caption}
                </p>
              )}

              {/* Nav buttons */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-cream hover:text-accent transition-colors p-2 hidden md:block"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={36} />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-cream hover:text-accent transition-colors p-2 hidden md:block"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={36} />
                  </button>
                  {/* Mobile nav */}
                  <div className="flex gap-4 mt-4 md:hidden">
                    <button onClick={prevPhoto} className="text-cream hover:text-accent transition-colors p-2">
                      <ChevronLeft size={28} />
                    </button>
                    <span className="font-body text-cream/60 text-sm self-center">
                      {lightboxIndex + 1} / {photos.length}
                    </span>
                    <button onClick={nextPhoto} className="text-cream hover:text-accent transition-colors p-2">
                      <ChevronRight size={28} />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
