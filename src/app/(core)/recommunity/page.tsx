import { Metadata } from 'next'
import { ReCommunity } from '@/features/recommunity'
import { siteConfig } from '@/config/seo'

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the ReShop community of environmentally conscious shoppers.',
  alternates: {
    canonical: `${siteConfig.url}/recommunity`,
  },
}

export default function ReCommunityPage() {
  return <ReCommunity />
}
