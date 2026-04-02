'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { Testimonial } from '@/lib/types'
import SectionHeader from '@/components/ui/SectionHeader'

interface TestimonialsProps {
  testimonials: Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    _id: 'default-1',
    quote:
      'The lattes here are absolutely magical. I come every morning and the baristas already know my order. This place feels like home.',
    author: 'Priya M.',
    rating: 5,
    order: 1,
  },
  {
    _id: 'default-2',
    quote:
      'Best croissants in the neighborhood, hands down. The atmosphere is cozy and the coffee is always perfectly extracted. My favorite spot to work from.',
    author: 'James L.',
    rating: 5,
    order: 2,
  },
  {
    _id: 'default-3',
    quote:
      'I stumbled in on a rainy day and never wanted to leave. The seasonal menu is so creative and the staff genuinely care about the craft.',
    author: 'Sara T.',
    rating: 5,
    order: 3,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-text-dark/20'}
        />
      ))}
    </div>
  )
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const items = testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (isPaused || items.length <= 1) return
    const timer = setInterval(goNext, 4000)
    return () => clearInterval(timer)
  }, [goNext, isPaused, items.length])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/20">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="What Our Guests Say"
          subtitle="Real words from real coffee lovers."
          centered
        />

        <div
          className="mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="bg-white rounded-2xl shadow-warm p-8 md:p-12 text-center"
              >
                <StarRating rating={items[activeIndex].rating} />
                <blockquote className="mt-6 font-heading text-xl md:text-2xl text-text-dark leading-relaxed">
                  &ldquo;{items[activeIndex].quote}&rdquo;
                </blockquote>
                <p className="mt-6 font-body font-semibold text-accent text-base">
                  — {items[activeIndex].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {items.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white text-text-dark hover:text-accent shadow-warm rounded-full p-2 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white text-text-dark hover:text-accent shadow-warm rounded-full p-2 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Dots */}
          {items.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1)
                    setActiveIndex(i)
                  }}
                  className={`rounded-full transition-all duration-200 ${
                    i === activeIndex
                      ? 'bg-accent w-6 h-2.5'
                      : 'bg-accent/30 w-2.5 h-2.5 hover:bg-accent/60'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
