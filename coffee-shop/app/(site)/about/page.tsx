import type { Metadata } from 'next'
import Image from 'next/image'
import { getAbout, getSettings } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeader from '@/components/ui/SectionHeader'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about the story behind Bloom Coffee — our passion for quality, community, and crafting the perfect cup.',
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()])

  const imageUrl = about?.image
    ? urlFor(about.image).width(800).height(600).fit('crop').url()
    : null

  const defaultBadges = [
    'Specialty Coffee',
    'Locally Sourced',
    'Eco-Friendly',
    'Made With Love',
    'Community First',
  ]

  const badges = about?.badges?.length ? about.badges : defaultBadges

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader
              title={about?.storyTitle || 'Our Story'}
              subtitle="Every great cup starts with a story worth telling."
              centered
            />
          </FadeIn>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/40 rounded-2xl" />
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm-lg">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={about?.storyTitle || 'About us'}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-8xl">☕</span>
                    </div>
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div>
                <p className="font-body text-text-dark/80 text-lg leading-relaxed whitespace-pre-line mb-8">
                  {about?.storyText ||
                    `We started Bloom Coffee with a simple dream: to create a space where neighbors become friends, and every cup feels like a warm hug.

Our founders, coffee enthusiasts at heart, spent years travelling the world to source the finest beans from ethical farms. We believe that great coffee should taste good and feel good — for you, for the farmers, and for the planet.

Today, Bloom Coffee is more than a café. It's a community gathering place where stories are shared, ideas are born, and the day always starts a little brighter.`}
                </p>

                <div className="flex flex-wrap gap-2">
                  {badges.map((badge: string, i: number) => (
                    <span
                      key={i}
                      className="bg-primary/50 text-text-dark font-body font-medium text-sm px-4 py-2 rounded-button"
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

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up">
            <SectionHeader title="Our Values" centered />
          </FadeIn>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: '🌱',
                title: 'Sustainability',
                desc: 'We use compostable cups, recycle, and partner with eco-conscious farmers.',
              },
              {
                emoji: '🤝',
                title: 'Community',
                desc: 'We support local artists, host community events, and give back monthly.',
              },
              {
                emoji: '☕',
                title: 'Quality',
                desc: 'Every bean is hand-selected. Every shot is timed. No shortcuts, ever.',
              },
              {
                emoji: '💛',
                title: 'Warmth',
                desc: 'We remember your name, your order, and your story. You belong here.',
              },
            ].map((value, i) => (
              <FadeIn key={i} direction="up" delay={i * 0.1}>
                <div className="bg-white rounded-card shadow-warm p-6 text-center">
                  <div className="text-4xl mb-4">{value.emoji}</div>
                  <h3 className="font-heading text-xl text-text-dark mb-3">{value.title}</h3>
                  <p className="text-text-dark/70 font-body text-sm leading-relaxed">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {settings?.address && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn direction="up">
              <SectionHeader title="Come Find Us" centered />
              <p className="font-body text-text-dark/70 text-lg mt-4 whitespace-pre-line">
                {settings.address}
              </p>
              {settings.phone && (
                <p className="font-body text-text-dark/70 mt-2">
                  <a href={`tel:${settings.phone}`} className="hover:text-accent transition-colors">
                    {settings.phone}
                  </a>
                </p>
              )}
            </FadeIn>
          </div>
        </section>
      )}
    </div>
  )
}
