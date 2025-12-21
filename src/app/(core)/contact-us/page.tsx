import { Metadata } from 'next'
import { ContactUs } from '@/features/contact'
import { siteConfig } from '@/config/seo'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ReShop team.',
  alternates: {
    canonical: `${siteConfig.url}/contact-us`,
  },
}

export default function ContactUsPage() {
  return <ContactUs />
}
