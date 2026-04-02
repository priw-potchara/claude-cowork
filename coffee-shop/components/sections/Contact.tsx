'use client'

import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Phone, Mail, MapPin, Instagram, Facebook, ExternalLink, Clock } from 'lucide-react'
import { Settings, Hours } from '@/lib/types'
import SectionHeader from '@/components/ui/SectionHeader'
import FadeIn from '@/components/ui/FadeIn'

interface ContactProps {
  settings?: Settings | null
  hoursData?: Hours | null
}

interface FormData {
  name: string
  email: string
  message: string
}

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}

const DAY_ORDER = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

function getTodayKey(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return days[new Date().getDay()]
}

export default function Contact({ settings, hoursData }: ContactProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const todayKey = getTodayKey()

  const sortedDays = hoursData?.days
    ? [...hoursData.days].sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day))
    : null

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.success) {
        toast.error(json.error || 'Something went wrong. Please try again.')
        return
      }
      toast.success(json.message || 'Message sent! We will get back to you soon.')
      reset()
    } catch {
      toast.error('Network error. Please check your connection and try again.')
    }
  }

  const mapsUrl = settings?.googleMapsUrl

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <FadeIn direction="up">
          <SectionHeader
            title="Find Us"
            subtitle="We are here and we would love to hear from you."
            centered
          />
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Map + Hours */}
          <FadeIn direction="left">
            <div className="space-y-8">
              {/* Map */}
              <div className="rounded-2xl overflow-hidden shadow-warm h-64 md:h-80 bg-primary/30">
                {mapsUrl ? (
                  <iframe
                    src={mapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Bloom Coffee location"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center flex-col gap-3">
                    <MapPin size={36} className="text-accent opacity-50" />
                    <p className="font-body text-text-dark/50 text-sm">Map will appear here</p>
                    <p className="font-body text-text-dark/40 text-xs">Configure Google Maps URL in settings</p>
                  </div>
                )}
              </div>

              {/* Opening Hours */}
              <div className="bg-white rounded-2xl shadow-warm p-6">
                <div className="flex items-center gap-2 mb-5">
                  <Clock size={18} className="text-accent" />
                  <h3 className="font-heading text-xl text-text-dark">Opening Hours</h3>
                </div>
                {sortedDays ? (
                  <table className="w-full">
                    <tbody>
                      {sortedDays.map((d) => {
                        const isToday = d.day === todayKey
                        return (
                          <tr
                            key={d.day}
                            className={`border-b last:border-0 ${
                              isToday ? 'bg-primary/30 rounded-lg' : ''
                            }`}
                          >
                            <td
                              className={`py-2.5 px-3 font-body text-sm ${
                                isToday ? 'font-semibold text-accent' : 'text-text-dark/70'
                              }`}
                            >
                              {DAY_LABELS[d.day] || d.day}
                              {isToday && (
                                <span className="ml-2 text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded-full font-medium">
                                  Today
                                </span>
                              )}
                            </td>
                            <td
                              className={`py-2.5 px-3 font-body text-sm text-right ${
                                isToday ? 'font-semibold text-accent' : d.closed ? 'text-red-400' : 'text-text-dark/70'
                              }`}
                            >
                              {d.closed ? 'Closed' : `${d.openTime} – ${d.closeTime}`}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="space-y-2.5">
                    {[
                      { label: 'Monday – Friday', hours: '7:00 – 21:00' },
                      { label: 'Saturday', hours: '8:00 – 22:00' },
                      { label: 'Sunday', hours: '8:00 – 20:00' },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between border-b last:border-0 py-2">
                        <span className="font-body text-sm text-text-dark/70">{row.label}</span>
                        <span className="font-body text-sm text-text-dark/70">{row.hours}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Address & Social */}
              <div className="space-y-3">
                {settings?.address && (
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-accent mt-0.5 shrink-0" />
                    <p className="font-body text-text-dark/75 text-sm whitespace-pre-line leading-relaxed">
                      {settings.address}
                    </p>
                  </div>
                )}
                {settings?.phone && (
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex gap-3 items-center group"
                  >
                    <Phone size={18} className="text-accent shrink-0" />
                    <span className="font-body text-text-dark/75 text-sm group-hover:text-accent transition-colors">
                      {settings.phone}
                    </span>
                  </a>
                )}
                {settings?.email && (
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex gap-3 items-center group"
                  >
                    <Mail size={18} className="text-accent shrink-0" />
                    <span className="font-body text-text-dark/75 text-sm group-hover:text-accent transition-colors">
                      {settings.email}
                    </span>
                  </a>
                )}
                <div className="flex items-center gap-3 pt-2">
                  {settings?.instagram && (
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-dark/60 hover:text-accent transition-colors font-body text-sm"
                    >
                      <Instagram size={18} /> Instagram
                    </a>
                  )}
                  {settings?.facebook && (
                    <a
                      href={settings.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-dark/60 hover:text-accent transition-colors font-body text-sm"
                    >
                      <Facebook size={18} /> Facebook
                    </a>
                  )}
                  {settings?.tiktok && (
                    <a
                      href={settings.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-text-dark/60 hover:text-accent transition-colors font-body text-sm"
                    >
                      <ExternalLink size={18} /> TikTok
                    </a>
                  )}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Contact Form */}
          <FadeIn direction="right">
            <div className="bg-white rounded-2xl shadow-warm p-6 md:p-8">
              <h3 className="font-heading text-2xl text-text-dark mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div>
                  <label htmlFor="name" className="block font-body text-sm font-medium text-text-dark mb-1.5">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    {...register('name', { required: 'Name is required', maxLength: { value: 100, message: 'Name is too long' } })}
                    className={`w-full font-body text-sm text-text-dark bg-background border rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-text-dark/30 focus:border-accent ${
                      errors.name ? 'border-red-400' : 'border-primary/60 hover:border-accent/50'
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500 font-body">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block font-body text-sm font-medium text-text-dark mb-1.5">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="your@email.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                    })}
                    className={`w-full font-body text-sm text-text-dark bg-background border rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-text-dark/30 focus:border-accent ${
                      errors.email ? 'border-red-400' : 'border-primary/60 hover:border-accent/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-body">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block font-body text-sm font-medium text-text-dark mb-1.5">
                    Message <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what's on your mind..."
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      maxLength: { value: 2000, message: 'Message is too long (max 2000 characters)' },
                    })}
                    className={`w-full font-body text-sm text-text-dark bg-background border rounded-xl px-4 py-3 outline-none transition-colors placeholder:text-text-dark/30 focus:border-accent resize-none ${
                      errors.message ? 'border-red-400' : 'border-primary/60 hover:border-accent/50'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-body">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-white font-body font-semibold text-base py-3.5 px-8 rounded-button transition-all duration-200 hover:opacity-90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs font-body text-text-dark/40 text-center">
                  We usually respond within 24 hours.
                </p>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
