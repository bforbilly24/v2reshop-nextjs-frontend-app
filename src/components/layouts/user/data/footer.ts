type FooterLinkItem = {
  id: string
  title: string
  url: string
  external?: boolean
}

type FooterGroupItem = {
  id: string
  title: string
  items: FooterLinkItem[]
}

type FooterLogoItem = {
  src: string
  alt: string
  width: number
  height: number
}

type FooterContactItem = {
  address: string
  email: { label: string; url: string }
  phone: { label: string; url: string }
}

type FooterDataItem = {
  logo: FooterLogoItem
  contact: FooterContactItem
  groups: FooterGroupItem[]
  social: FooterLinkItem[]
  languages: FooterLinkItem[]
}

const FOOTER_LOGO: FooterLogoItem = {
  src: '/images/brand/brand-name.png',
  alt: 'ReShop Logo',
  width: 150,
  height: 150,
}

const FOOTER_CONTACT: FooterContactItem = {
  address: '17 Princess Road, London, UK',
  email: { label: 'hello@reshop.co.uk', url: 'mailto:hello@reshop.co.uk' },
  phone: { label: '+1234567890', url: 'tel:+1234567890' },
}

const FOOTER_GROUPS: FooterGroupItem[] = [
  {
    id: 'quick-links',
    title: 'Quick Links',
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
      { id: 'contact-us', title: 'contact-us', url: 'contact_link' },
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
]

const FOOTER_SOCIAL: FooterLinkItem[] = [
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
]

const FOOTER_LANGUAGES: FooterLinkItem[] = [
  { id: 'en-1', title: 'En', url: '/en' },
  { id: 'id-2', title: 'Id', url: '/id' },
]

const FOOTER_DATA: FooterDataItem = {
  logo: FOOTER_LOGO,
  contact: FOOTER_CONTACT,
  groups: FOOTER_GROUPS,
  social: FOOTER_SOCIAL,
  languages: FOOTER_LANGUAGES,
}

export {
  FOOTER_DATA,
  type FooterDataItem,
  FOOTER_LOGO,
  type FooterLogoItem,
  FOOTER_CONTACT,
  type FooterContactItem,
  FOOTER_GROUPS,
  type FooterGroupItem,
  FOOTER_SOCIAL,
  FOOTER_LANGUAGES,
  type FooterLinkItem
}