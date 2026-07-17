import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency, ExchangeRates } from "./types"
import type { Metadata } from "next"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number, // Assume amount is always in USD
  targetCurrency: Currency,
  rates: ExchangeRates
): string {
  const rate = rates[targetCurrency] || 1;
  const convertedAmount = amount * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
}

export function constructMetadata({
  title = 'Arrdublu | Digital & Experiential Design Agency',
  description = 'Arrdublu is a leading digital and experiential design agency specializing in immersive WebGL, virtual production, luxury branding, and real-time environments.',
  image = 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
  icons = 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_logoArtboard%201.jpg?alt=media&token=e701d629-1649-4abb-90fa-c85ff38cb9f0',
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://arrdublu.us',
      siteName: 'Arrdublu',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    icons: {
      icon: icons,
      shortcut: icons,
      apple: icons,
    },
    metadataBase: new URL('https://arrdublu.us'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}
