import Image from 'next/image'
import { About as AboutType } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

interface AboutProps {
  about?: AboutType | null
}

const DEFAULT_BADGES = [
  'Specialty Coffee',
  'Locally Sourced',
  'Eco-Friendly',
  'Community First',
  'Made With Love',
]

export default function About({ about }: AboutProps) {
  const imageUrl = about?.image
    ? urlFor(about.image).width(700).height(550).fit('crop').url()
    : null

  const badges = about?.badges?.length ? about.badges : DEFAULT_BADGES

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <FadeIn direction="left">
            <div className="relative">
              {/* Decorative block */}
              <div className="absolute -top-4 -left-4 w-4/5 h-4/5 bg-primary/50 rounded-2xl -z-10" />
              <div className="relative aspect-[5/4] rounded-2xl overflow-hidden shadow-warm-lg">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={about?.storyTitle || 'About our coffee shop'}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-primary/70 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-7xl mb-4">☕</div>
                      <p className="font-heading text-text-dark text-xl opacity-60">Our Story</p>
                    </div>
                  </div>
                )}
              </div>
              {/* Small accent card */}
              <div className="absolute -bottom-4 -right-4 bg-accent text-white rounded-2xl px-5 py-3 shadow-warm-lg">
                <p className="font-heading text-lg leading-none">Since</p>
                <p className="font-heading text-3xl font-bold">2018</p>
              </div>
            </div>
          </FadeIn>

          {/* Text */}
          <FadeIn direction="right">
            <div>
              <SectionHeader
                title={about?.storyTitle || 'Brewed With Passion'}
                subtitle="A little corner where big moments happen."
                centered={false}
              />
              <p className="font-body text-text-dark/75 text-base md:text-lg leading-relaxed mt-6 whitespace-pre-line">
                {about?.storyText ||
                  `We started Bloom Coffee with a simple dream: create a space where neighbors become friends, and every cup feels like a warm hug.

Our founders spent years sourcing the finest beans from ethical farms around the world. We believe great coffee should feel good — for you, the farmers, and the planet.

Today, Bloom Coffee is more than a café. It's a community gathering place where stories are shared and the day always starts a little brighter.`}
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {badges.map((badge: string, i: number) => (
                  <span
                    key={i}
                    className="bg-primary/60 text-text-dark font-body font-medium text-sm px-4 py-2 rounded-button"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
