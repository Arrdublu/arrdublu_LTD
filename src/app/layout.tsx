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
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { CartProvider } from '@/context/CartProvider';
import { CurrencyProvider } from '@/context/CurrencyProvider';

export const metadata = {
  title: 'Arrdublu | Immersive WebGL Hero and Portfolio',
  description: 'An immersive, WebGL-powered brand media tech experience with cyberpunk visuals.',
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
          <CurrencyProvider>
            <CartProvider>
              <SiteHeader />
              {children}
            </CartProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
