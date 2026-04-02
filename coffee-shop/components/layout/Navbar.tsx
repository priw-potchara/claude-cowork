'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Coffee } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps {
  shopName?: string
}

export default function Navbar({ shopName = 'Bloom Coffee' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return false
    return pathname === href
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileOpen
            ? 'bg-background/95 backdrop-blur-md shadow-warm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-xl font-semibold text-text-dark hover:text-accent transition-colors"
            >
              <Coffee size={24} className="text-accent" />
              <span>{shopName}</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body text-sm font-medium transition-colors duration-200 relative group ${
                    isActive(link.href)
                      ? 'text-accent'
                      : 'text-text-dark hover:text-accent'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full transition-all duration-200 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="bg-accent text-white font-body font-medium text-sm px-5 py-2.5 rounded-button transition-all duration-200 hover:opacity-90 active:scale-95 shadow-warm"
              >
                Find Us
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden p-2 text-text-dark hover:text-accent transition-colors"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-background/98 backdrop-blur-md border-t border-primary/30"
            >
              <nav className="px-4 py-6 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      href={link.href}
                      className={`block font-body font-medium text-base py-3 px-4 rounded-xl transition-colors ${
                        isActive(link.href)
                          ? 'bg-primary/50 text-accent'
                          : 'text-text-dark hover:bg-primary/30 hover:text-accent'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.2 }}
                  className="mt-2"
                >
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-accent text-white font-body font-medium text-base py-3 px-4 rounded-button transition-all duration-200 hover:opacity-90"
                  >
                    Find Us
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
