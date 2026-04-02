import Link from 'next/link'
import Image from 'next/image'
import { Hero as HeroType } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface HeroProps {
  hero?: HeroType | null
}

export default function Hero({ hero }: HeroProps) {
  const bgImageUrl = hero?.backgroundImage
    ? urlFor(hero.backgroundImage).width(1920).height(1080).fit('crop').url()
    : null

  const tagline = hero?.tagline || 'Where Every Cup Tells a Story'
  const subtext =
    hero?.subtext ||
    'Handcrafted specialty coffee, fresh pastries, and a warm corner to call your own. Come as you are — stay as long as you like.'
  const ctaPrimary = hero?.ctaPrimaryLabel || 'View Our Menu'
  const ctaSecondary = hero?.ctaSecondaryLabel || 'Find Us'

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      {bgImageUrl ? (
        <Image
          src={bgImageUrl}
          alt="Coffee shop atmosphere"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-warm-charcoal via-accent/80 to-warm-charcoal" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-warm-charcoal/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div
          className="opacity-0 translate-y-6 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]"
          style={{ animationFillMode: 'forwards' }}
        >
          <p className="font-body text-accent text-sm font-semibold uppercase tracking-widest mb-6">
            Specialty Coffee
          </p>
        </div>

        <div
          className="opacity-0 translate-y-6"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
          }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-tight mb-6">
            {tagline}
          </h1>
        </div>

        <div
          className="opacity-0 translate-y-6"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
          }}
        >
          <p className="font-body text-cream/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
            {subtext}
          </p>
        </div>

        <div
          className="opacity-0 translate-y-6 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.8s forwards',
          }}
        >
          <Link
            href="/menu"
            className="w-full sm:w-auto bg-accent text-white font-body font-semibold text-base px-8 py-4 rounded-button transition-all duration-200 hover:opacity-90 active:scale-95 shadow-warm-lg"
          >
            {ctaPrimary}
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-transparent text-white font-body font-semibold text-base px-8 py-4 rounded-button border-2 border-white transition-all duration-200 hover:bg-white hover:text-text-dark active:scale-95"
          >
            {ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0"
        style={{ animation: 'fadeInUp 0.8s ease-out 1.2s forwards' }}
      >
        <div className="w-6 h-10 border-2 border-cream/40 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-cream/60 rounded-full animate-bounce" />
        </div>
      </div>

    </section>
  )
}
