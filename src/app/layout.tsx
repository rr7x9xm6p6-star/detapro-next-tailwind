
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'detapro - Detachering voor Professionals',
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
