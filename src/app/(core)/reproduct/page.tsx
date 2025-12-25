import { siteConfig } from '@/config/seo'
import { Metadata } from 'next'
import { ReProductView } from '@/features/reproduct'

export const metadata: Metadata = {
  title: 'Browse Products',
  description:
    'Explore our collection of sustainable, recycled, and eco-friendly products. Find furniture, home decor, and building materials that are good for you and the planet.',
  keywords: [
    'products',
    'sustainable products',
    'eco-friendly shopping',
    ...siteConfig.keywords,
  ],
  openGraph: {
    title: 'Browse Sustainable Products | ReShop',
    description:
      'Explore our collection of sustainable, recycled, and eco-friendly products.',
    url: `${siteConfig.url}/reproduct`,
  },
  alternates: {
    canonical: `${siteConfig.url}/reproduct`,
  },
}

export default function ReProductPage() {
  return <ReProductView />
}
