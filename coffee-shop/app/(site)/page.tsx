import { getHero, getAbout, getAllMenuItems, getGallery, getActivePromotions, getTestimonials, getSettings } from '@/sanity/lib/queries'
import PromotionBanner from '@/components/sections/PromotionBanner'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Menu from '@/components/sections/Menu'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default async function HomePage() {
  const [hero, about, menuItems, gallery, promotions, testimonials, settings] = await Promise.all([
    getHero(),
    getAbout(),
    getAllMenuItems(),
    getGallery(),
    getActivePromotions(),
    getTestimonials(),
    getSettings(),
  ])

  return (
    <>
      <PromotionBanner promotions={promotions || []} />
      <Hero hero={hero} />
      <About about={about} />
      <Menu menuItems={menuItems || []} />
      <Gallery gallery={gallery} />
      <Testimonials testimonials={testimonials || []} />
      <Contact settings={settings} />
    </>
  )
}
