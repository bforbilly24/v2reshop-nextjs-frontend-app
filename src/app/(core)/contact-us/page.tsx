import { siteConfig } from '@/config/seo'
import { Metadata } from 'next'
import { ContactUs } from '@/features/contact'

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
