import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono, Unbounded } from 'next/font/google'
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

const unbounded = Unbounded({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700', '900'],
})

import { SiteHeader } from '@/components/layout/Header';
import { SiteFooter } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { CartProvider } from '@/context/CartProvider';
import { CurrencyProvider } from '@/context/CurrencyProvider';
import { LanguageProvider } from '@/context/LanguageProvider';

export const metadata: Metadata = {
  title: 'Arrdublu | Digital & Experiential Design Agency',
  description: 'Arrdublu is a leading digital and experiential design agency specializing in immersive WebGL, virtual production, luxury branding, and real-time environments.',
  icons: {
    icon: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0',
    shortcut: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0',
    apple: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0',
  },
  openGraph: {
    title: 'Arrdublu | Immersive Digital Environments',
    description: 'Discover Arrdublu\'s portfolio of high-end digital experiences, virtual production, and global branding.',
    url: 'https://arrdublu.us',
    siteName: 'Arrdublu',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0',
        width: 1200,
        height: 630,
        alt: 'Arrdublu Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arrdublu | Immersive Digital Environments',
    description: 'Discover Arrdublu\'s portfolio of high-end digital experiences, virtual production, and global branding.',
    images: ['https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${unbounded.variable} dark`} suppressHydrationWarning>
      <body className="bg-[#020304] text-slate-100 overflow-x-hidden antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <CurrencyProvider>
              <CartProvider>
                <SiteHeader />
                {children}
                <SiteFooter />
              </CartProvider>
            </CurrencyProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
