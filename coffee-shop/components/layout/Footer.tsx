import Link from 'next/link'
import { Coffee, Instagram, Facebook, MapPin, Phone, Mail, ExternalLink } from 'lucide-react'
import { Settings } from '@/lib/types'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

interface FooterProps {
  settings?: Settings | null
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const shopName = settings?.shopName || 'Bloom Coffee'

  return (
    <footer className="bg-warm-charcoal text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <Coffee size={22} className="text-accent" />
              <span className="font-heading text-xl text-cream">{shopName}</span>
            </Link>
            <p className="font-body text-sm text-cream/70 leading-relaxed mb-6">
              A cozy corner for specialty coffee, fresh bites, and warm conversations. Come as you are.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream/10 hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="text-cream" />
                </a>
              )}
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream/10 hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="Facebook"
                >
                  <Facebook size={16} className="text-cream" />
                </a>
              )}
              {settings?.tiktok && (
                <a
                  href={settings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-cream/10 hover:bg-accent transition-colors flex items-center justify-center"
                  aria-label="TikTok"
                >
                  <ExternalLink size={16} className="text-cream" />
                </a>
              )}
              {!settings?.instagram && !settings?.facebook && !settings?.tiktok && (
                <>
                  <div className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center opacity-40">
                    <Instagram size={16} className="text-cream" />
                  </div>
                  <div className="w-9 h-9 rounded-full bg-cream/10 flex items-center justify-center opacity-40">
                    <Facebook size={16} className="text-cream" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-heading text-lg text-cream mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Address */}
          <div>
            <h3 className="font-heading text-lg text-cream mb-5">Visit Us</h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <p className="font-body text-xs text-cream/50 uppercase tracking-wider">Hours</p>
                <div className="font-body text-sm text-cream/70 space-y-1">
                  <p>Mon – Fri: 7:00 – 21:00</p>
                  <p>Sat – Sun: 8:00 – 22:00</p>
                </div>
              </div>
              {settings?.address && (
                <div className="flex gap-2">
                  <MapPin size={15} className="text-accent mt-0.5 shrink-0" />
                  <p className="font-body text-sm text-cream/70 whitespace-pre-line leading-relaxed">
                    {settings.address}
                  </p>
                </div>
              )}
              {settings?.phone && (
                <div className="flex gap-2 items-center">
                  <Phone size={15} className="text-accent shrink-0" />
                  <a
                    href={`tel:${settings.phone}`}
                    className="font-body text-sm text-cream/70 hover:text-accent transition-colors"
                  >
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings?.email && (
                <div className="flex gap-2 items-center">
                  <Mail size={15} className="text-accent shrink-0" />
                  <a
                    href={`mailto:${settings.email}`}
                    className="font-body text-sm text-cream/70 hover:text-accent transition-colors"
                  >
                    {settings.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-heading text-lg text-cream mb-5">Legal</h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-cream/70 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {settings?.line && (
              <div className="mt-6">
                <p className="font-body text-xs text-cream/50 uppercase tracking-wider mb-2">LINE</p>
                <p className="font-body text-sm text-cream/70">{settings.line}</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-cream/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-cream/50">
            © {currentYear} {shopName}. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream/40">
            Crafted with ☕ and care.
          </p>
        </div>
      </div>
    </footer>
  )
}
