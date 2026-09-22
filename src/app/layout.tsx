
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '@/lib/seo'

const DEFAULT_TITLE = 'detapro - Detachering voor Professionals'
const DEFAULT_DESCRIPTION = 'Detachering voor IT & Business professionals. Zwart-wit afspraken, engineering-first, senior resultaten.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/detapro_favicon_v1_dark.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/android-chrome-192x192.png', sizes: '192x192' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'nl_NL',
    type: 'website',
    images: [{ url: DEFAULT_OG_IMAGE, width: 512, height: 512, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="nl">
      <body className="bg-bg text-fg">
        <header className="header">
          <div className="container">
            <Header />
          </div>
        </header>
        <main id="top">{children}</main>
        <footer className="border-t border-border mt-16">
          <div className="container">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  )
}
