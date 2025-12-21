import { Metadata } from 'next'

export const siteConfig = {
  name: 'ReShop',
  title: 'ReShop - Sustainable Shopping Marketplace',
  description:
    'ReShop is your sustainable marketplace for recycled and eco-friendly products. Shop furniture, home decor, and building materials while reducing environmental impact.',
  url: 'https://reshop.com',
  ogImage: 'https://reshop.com/images/og-image.png',
  links: {
    twitter: 'https://twitter.com/reshop',
    github: 'https://github.com/circleit/reshop',
  },
  keywords: [
    'sustainable shopping',
    'recycled products',
    'eco-friendly marketplace',
    'furniture',
    'home decor',
    'building materials',
    'circular economy',
    'green shopping',
    'environmental products',
    'recycle marketplace',
  ],
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: 'CircleIT',
      url: 'https://circleit.dev',
    },
  ],
  creator: 'CircleIT',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@reshop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#16a34a',
      } as { rel: string; url: string; color: string },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteConfig.url,
  },
}
