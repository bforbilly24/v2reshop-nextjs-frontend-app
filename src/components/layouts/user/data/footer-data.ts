export interface FooterLink {
  id: string
  title: string // Translation key (e.g., 'works')
  url: string
  external?: boolean
}

export interface FooterGroup {
  id: string
  title: string // Translation key (e.g., 'quick_links')
  items: FooterLink[]
}

export interface FooterData {
  logo: {
    src: string
    alt: string
    width: number
    height: number
  }
  contact: {
    address: string
    email: { label: string; url: string }
    phone: { label: string; url: string }
  }
  groups: FooterGroup[]
  social: FooterLink[]
  languages: FooterLink[]
}

export const footerData: FooterData = {
  logo: {
    src: '/images/brand/brand-name.png',
    alt: 'ReShop Logo',
    width: 150,
    height: 150,
  },
  contact: {
    address: '17 Princess Road, London, UK',
    email: { label: 'hello@reshop.co.uk', url: 'mailto:hello@reshop.co.uk' },
    phone: { label: '+1234567890', url: 'tel:+1234567890' },
  },
  groups: [
    {
      id: 'quick-links',
      title: 'quick_links',
      items: [
        { id: 'works-1', title: 'works', url: '/contact' },
        { id: 'affiliate-2', title: 'affiliate', url: '/contact' },
        { id: 'shop-3', title: 'shop', url: '/contact' },
        { id: 'partners-4', title: 'partners', url: '/about-us' },
        { id: 'reviews-5', title: 'reviews', url: '/' },
      ],
    },
    {
      id: 'stickers',
      title: 'studio',
      items: [
        { id: 'about-1', title: 'about', url: '/about-us' },
        { id: 'contact-us', url: 'contact_link', title: '/contact-us' },
        { id: 'career-3', title: 'career', url: '/careers' },
        { id: 'blog-4', title: 'blog', url: '/blog' },
      ],
    },
    {
      id: 'help-center',
      title: 'help_center',
      items: [
        { id: 'faqs-1', title: 'faqs', url: '/faqs' },
        { id: 'terms-2', title: 'terms_&_conditions', url: '/terms' },
        { id: 'privacy-3', title: 'privacy_policy', url: '/privacy' },
        { id: 'help-4', title: 'help', url: '/contact' },
        { id: 'services-5', title: 'services', url: '/' },
      ],
    },
  ],
  social: [
    {
      id: 'twitter-1',
      title: 'Twitter',
      url: 'https://twitter.com',
      external: true,
    },
    {
      id: 'facebook-2',
      title: 'Facebook',
      url: 'https://facebook.com',
      external: true,
    },
    {
      id: 'instagram-3',
      title: 'Instagram',
      url: 'https://instagram.com',
      external: true,
    },
  ],
  languages: [
    { id: 'en-1', title: 'En', url: '/en' },
    { id: 'id-2', title: 'Id', url: '/id' },
  ],
}
