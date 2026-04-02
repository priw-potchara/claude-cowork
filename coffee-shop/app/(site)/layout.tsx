import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { getSettings } from '@/sanity/lib/queries'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()

  return (
    <>
      <Navbar shopName={settings?.shopName || 'Bloom Coffee'} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
