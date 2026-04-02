import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Bloom Coffee',
    default: 'Bloom Coffee — A Place to Pause & Savor',
  },
  description:
    'Bloom Coffee is a cozy neighborhood coffee shop crafting specialty drinks, fresh pastries, and warm memories. Visit us for a cup of something beautiful.',
  metadataBase: new URL('https://bloomcoffee.com'),
  openGraph: {
    type: 'website',
    siteName: 'Bloom Coffee',
  },
}

const gaId = process.env.NEXT_PUBLIC_GA_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <body className="font-body bg-background text-text-dark antialiased">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#3E2C2C',
              color: '#FFF9F4',
              borderRadius: '12px',
              fontFamily: 'DM Sans, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#C9A9A6',
                secondary: '#FFF9F4',
              },
            },
          }}
        />
      </body>
    </html>
  )
}
