import { siteConfig } from '@/config/seo'
import { Metadata } from 'next'
import { AboutUs } from '@/features/about-us'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about ReShop mission to create a sustainable marketplace for eco-friendly products.',
  alternates: {
    canonical: `${siteConfig.url}/about-us`,
  },
}

export default function AboutUsPage() {
  return <AboutUs />
}
