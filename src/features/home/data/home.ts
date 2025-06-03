import {
  BadgeCheckIcon,
  HeadsetIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react'

type CategoryItem = {
  id: string
  slug: string
  title: string
  image: string
  description: string
}

const CATEGORIES: CategoryItem[] = [
  {
    id: '1',
    slug: 'furniture',
    title: 'Furniture',
    image: '/images/categories/furniture.jpg',
    description:
      'Browse our collection of stylish furniture.\nPerfect for any room in your home.',
  },
  {
    id: '2',
    slug: 'kitchen-set',
    title: 'Kitchen Set',
    image: '/images/categories/kitchen-set.jpg',
    description:
      'Modern kitchen sets for every taste.\nCreate the cooking space of your dreams.',
  },
  {
    id: '3',
    slug: 'material-building',
    title: 'Material Building',
    image: '/images/categories/material-building.jpg',
    description:
      'High-quality building materials available.\nPerfect for your next renovation project.',
  },
]

type FeatureItem = {
  id: number
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}

const FEATURES: FeatureItem[] = [
  {
    id: 1,
    icon: ShieldCheckIcon,
    title: 'High Quality',
    subtitle: 'Crafted from top materials',
  },
  {
    id: 2,
    icon: BadgeCheckIcon,
    title: 'Warranty Protection',
    subtitle: 'Over 2 years',
  },
  {
    id: 3,
    icon: TruckIcon,
    title: 'Free Shipping',
    subtitle: 'Order over 150 $',
  },
  {
    id: 4,
    icon: HeadsetIcon,
    title: '24 / 7 Support',
    subtitle: 'Dedicated support',
  },
]

interface SlideItem {
  id: number
  image: string
  alt: string
}

const HEROSLIDERHOME: SlideItem[] = [
  {
    id: 1,
    image: '/images/hero/slider-home-hero-1.webp',
    alt: 'Slides Hero 1',
  },
  {
    id: 2,
    image: '/images/hero/slider-home-hero-2.webp',
    alt: 'Slides Hero 2',
  },
  {
    id: 3,
    image: '/images/hero/slider-home-hero-3.webp',
    alt: 'Slides Hero 3',
  },
]

type ServiceItem = {
  id: string
  title: string
  content: string
  icon: string
  alt?: string
}

export {
  CATEGORIES,
  type CategoryItem,
  FEATURES,
  type FeatureItem,
  HEROSLIDERHOME,
  type SlideItem,
  type ServiceItem,
}
