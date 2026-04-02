import type { Metadata } from 'next'
import { getSettings, getHours } from '@/sanity/lib/queries'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Bloom Coffee. Find our location, opening hours, and send us a message. We love to hear from you.',
}

export default async function ContactPage() {
  const [settings, hoursData] = await Promise.all([getSettings(), getHours()])

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl text-text-dark mb-4">Contact Us</h1>
            <div className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full" />
            <p className="text-text-dark/70 font-body text-lg max-w-xl mx-auto">
              We&apos;d love to hear from you. Drop us a message or come visit us in person.
            </p>
          </div>
          <Contact settings={settings} hoursData={hoursData} />
        </div>
      </div>
    </div>
  )
}
