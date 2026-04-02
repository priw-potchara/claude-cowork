import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSettings } from '@/sanity/lib/queries'
import { mockSettings } from '@/lib/mockData'

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  const resolved = settings ?? mockSettings

  return (
    <>
      <Navbar shopName={resolved.shopName} />
      <main>{children}</main>
      <Footer settings={resolved} />
    </>
  )
}
