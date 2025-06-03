import { en, Faker } from '@faker-js/faker'

interface FaqAboutItem {
  question: string
  answer: string
}

const FAQABOUT: FaqAboutItem[] = [
  {
    question: 'Apa itu Re-Shop?',
    answer:
      'Re-Shop adalah platform digital yang memfasilitasi proses daur ulang dan penjualan barang bekas, serta menyediakan berbagai produk yang terbuat dari material hasil daur ulang.',
  },
  {
    question: 'Barang seperti apa yang bisa saya temukan di Re-Shop?',
    answer:
      'Anda dapat menemukan berbagai jenis barang, mulai dari material mentah seperti kayu bekas, besi, hingga produk jadi seperti furnitur, kerajinan tangan, dan aksesoris hasil daur ulang.',
  },
  {
    question:
      'Apakah Re-Shop menerima donasi atau penjualan barang bekas dari pengguna?',
    answer:
      'Ya, kami menerima barang bekas yang masih layak daur ulang. Anda bisa memilih untuk mendonasikan atau menjualnya melalui fitur unggah produk di dashboard pengguna.',
  },
  {
    question:
      'Apakah produk yang dijual di Re-Shop sudah melalui proses quality control?',
    answer:
      'Setiap produk yang diproses oleh mitra Re-Shop akan melalui tahap kurasi dan pemeriksaan agar layak pakai serta aman digunakan oleh konsumen.',
  },
  {
    question: 'Siapa saja yang bisa menggunakan Re-Shop?',
    answer:
      'Re-Shop terbuka untuk siapa saja—baik individu, komunitas, pelaku usaha kecil, maupun industri kreatif yang ingin berkontribusi dalam ekonomi sirkular dan konsumsi berkelanjutan.',
  },
]

interface SlideItem {
  id: number
  image: string
  alt: string
  title: string
  heroYear: string
  twitterIcon: string
  facebookIcon: string
  googleIcon: string
  heroCategory: string
  heroTitle: string
}

const HEROSLIDERABOUT: SlideItem[] = [
  {
    id: 1,
    image: '/images/hero/slider-about-hero-1.jpg',
    alt: 'Slides Hero 1',
    title: 'ReShop Interior Studio',
    heroYear: '2025',
    twitterIcon: 'mdi:twitter',
    facebookIcon: 'mdi:facebook',
    googleIcon: 'mdi:google',
    heroCategory: 'ReShop interior studio',
    heroTitle: 'ReShop and Modern',
  },
  {
    id: 2,
    image: '/images/hero/slider-about-hero-2.jpg',
    alt: 'Slides Hero 2',
    title: 'Modern Design',
    heroYear: '2025',
    twitterIcon: 'mdi:twitter',
    facebookIcon: 'mdi:facebook',
    googleIcon: 'mdi:google',
    heroCategory: 'Contemporary designs',
    heroTitle: 'Elegant and Sophisticated',
  },
  {
    id: 3,
    image: '/images/hero/slider-about-hero-3.jpg',
    alt: 'Slides Hero 3',
    title: 'Minimalist Style',
    heroYear: '2025',
    twitterIcon: 'mdi:twitter',
    facebookIcon: 'mdi:facebook',
    googleIcon: 'mdi:google',
    heroCategory: 'Minimalist approach',
    heroTitle: 'Clean and Simple',
  },
]

interface PartnerItem {
  id: number
  name: string
  image: string
  alt: string
}

const PARTNERS: PartnerItem[] = [
  {
    id: 1,
    name: 'Company 1',
    image: '/images/partners/company-1.svg',
    alt: 'company-1',
  },
  {
    id: 2,
    name: 'Company 2',
    image: '/images/partners/company-2.svg',
    alt: 'company-2',
  },
  {
    id: 3,
    name: 'Company 3',
    image: '/images/partners/company-3.svg',
    alt: 'company-3',
  },
]

interface PerkItem {
  id: number
  title: string
  description: string
  icon: string
}

const PERKS: PerkItem[] = [
  {
    id: 1,
    title: 'Relationships',
    description: 'Gain more relationships with others',
    icon: 'mdi:account-group',
  },
  {
    id: 2,
    title: 'Create an Event',
    description: 'Create an environmental care event together',
    icon: 'mdi:calendar-star',
  },
  {
    id: 3,
    title: 'Concern',
    description: 'Growing mutual concern',
    icon: 'mdi:heart',
  },
  {
    id: 4,
    title: 'Community Impact',
    description: 'Make a lasting impact through sustainable actions',
    icon: 'mdi:leaf',
  },
]

const faker = new Faker({ locale: [en] })

const generateTestimonialContent = () => {
  const testimonials = [
    `The AI valuation tool provided spot-on pricing for my listings, helping me close deals ${faker.number.int(
      {
        min: 20,
        max: 40,
      }
    )}% faster than traditional methods.`,
    `Virtual tours and 3D views made property hunting a breeze, saving me hours of travel and effort.`,
    `The automated maintenance tracking and tenant portal streamlined my property management process.`,
    `Digital contracts and secure payments simplified my rental operations, making everything hassle-free.`,
    `Market analytics and trend insights empowered me to make smarter investment decisions.`,
    `Tenant screening tools and rental management features cut my vacancy rates by ${faker.number.int(
      {
        min: 10,
        max: 30,
      }
    )}%.`,
  ]
  return faker.helpers.arrayElement(testimonials)
}

// Generate testimonials
const TESTIMONIALS = Array.from({ length: 6 }, (_, index) => ({
  content: generateTestimonialContent(),
  name: faker.person.firstName(),
  username: `@${faker.internet.userName().toLowerCase()}`,
  image: `/images/person-${index + 1}.jpg`,
  rating: faker.number.int({ min: 4, max: 5 }),
}))

export {
  FAQABOUT,
  type FaqAboutItem,
  HEROSLIDERABOUT,
  type SlideItem,
  PARTNERS,
  type PartnerItem,
  PERKS,
  type PerkItem,
  TESTIMONIALS,
}
