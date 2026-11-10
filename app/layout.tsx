import type { Metadata, Viewport } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ClientLayoutShell } from '@/components/layout/ClientLayoutShell';

export const metadata: Metadata = {
  metadataBase: new URL('https://minolijewels.com'),
  title: 'MINOLI | Haute Joaillerie – Handcrafted Luxury Jewellery',
  description:
    'Discover timeless jewellery designed to celebrate every beautiful moment. Explore uncut Polki chokers, heritage temple kadas, diamond solitaires, and everyday waterproof gold chains. Order direct via WhatsApp.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  keywords: [
    'MINOLI jewellery',
    'haute joaillerie',
    'polki choker',
    'kundan bridal jewellery',
    'temple jewellery',
    'solitaire ring',
    'luxury jewellery india',
    'whatsapp jewellery order',
  ],
  authors: [{ name: 'MINOLI Maison' }],
  openGraph: {
    title: 'MINOLI | Haute Joaillerie – Luxury Handcrafted Jewellery',
    description: 'Elegance That Speaks Without Words. Explore our latest bridal and everyday fine jewellery collections.',
    url: 'https://minolijewels.com',
    siteName: 'MINOLI',
    images: [
      {
        url: '/images/hero/hero-main.jpg',
        width: 1200,
        height: 630,
        alt: 'MINOLI Fine Jewellery Collection',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#C6A15B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-charcoal-700 antialiased selection:bg-champagne-200 selection:text-charcoal-900 font-sans">
        <CartProvider>
          <WishlistProvider>
            <ClientLayoutShell>{children}</ClientLayoutShell>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
