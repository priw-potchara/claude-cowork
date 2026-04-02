import {
  getHero,
  getAbout,
  getAllMenuItems,
  getGallery,
  getActivePromotions,
  getTestimonials,
  getSettings,
  getHours,
} from '@/sanity/lib/queries'
import {
  mockHero,
  mockAbout,
  mockMenuItems,
  mockPromotions,
  mockTestimonials,
  mockSettings,
  mockHours,
} from '@/lib/mockData'
import PromotionBanner from '@/components/sections/PromotionBanner'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Menu from '@/components/sections/Menu'
import Gallery from '@/components/sections/Gallery'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'

export default async function HomePage() {
  const [hero, about, menuItems, gallery, promotions, testimonials, settings, hours] =
    await Promise.all([
      getHero(),
      getAbout(),
      getAllMenuItems(),
      getGallery(),
      getActivePromotions(),
      getTestimonials(),
      getSettings(),
      getHours(),
    ])

  return (
    <>
      <PromotionBanner promotions={promotions ?? mockPromotions} />
      <Hero hero={hero ?? mockHero} />
      <About about={about ?? mockAbout} />
      <Menu menuItems={menuItems ?? mockMenuItems} />
      <Gallery gallery={gallery} />
      <Testimonials testimonials={testimonials ?? mockTestimonials} />
      <Contact settings={settings ?? mockSettings} hoursData={hours ?? mockHours} />
    </>
  )
}
