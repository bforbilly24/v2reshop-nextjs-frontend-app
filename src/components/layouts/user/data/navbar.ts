import {
//   Search,
  User,
  ShoppingCart,
  Waypoints,
  HandHeart,
  Home,
  Info,
  Compass,
  Phone,
  LogOut,
  Box,
  PartyPopper,
  BookOpenCheck,
} from 'lucide-react'

interface NavbarItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  menu?: {
    title: string
    tagline?: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

const NAV_LINKS: NavbarItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'About Us',
    href: '/about-us',
    icon: Info,
  },
  {
    title: 'Explore',
    href: '#',
    icon: Compass,
    menu: [
      {
        title: 'Re-Product',
        tagline: 'Discover innovative features and capabilities.',
        href: '/reproduct',
        icon: Box,
      },
      {
        title: 'Re-Community',
        tagline: 'Learn about the benefits and advantages we offer.',
        href: '/recommunity',
        icon: HandHeart,
      },
      {
        title: 'Re-Charity',
        tagline: 'Explore our premium services and solutions.',
        href: '/coming-soon',
        icon: Waypoints,
      },
      {
        title: 'Re-Study',
        tagline: 'Read testimonials from our satisfied customers.',
        href: '/coming-soon',
        icon: BookOpenCheck,
      },
      {
        title: 'Re-Event',
        tagline: 'Read testimonials from our satisfied customers.',
        href: '/coming-sson',
        icon: PartyPopper,
      },
    ],
  },
  {
    title: 'Contact Us',
    href: '/contact-us',
    icon: Phone,
  },
]

const ACTION_LINKS: NavbarItem[] = [
//   {
//     title: 'Search',
//     href: '/search',
//     icon: Search,
//   },
  {
    title: 'Account',
    href: '#',
    icon: User,
    menu: [
      {
        title: 'Profile',
        tagline: 'Manage your account settings.',
        href: '/profile',
        icon: User,
      },
      {
        title: 'Logout',
        tagline: 'Sign out from your account.',
        href: '/auth/login',
        icon: LogOut,
      },
    ],
  },
  {
    title: 'Cart',
    href: '/shopping-cart',
    icon: ShoppingCart,
  },
]

const NAVBAR_CONFIG = {
  brand: {
    name: 'Re-shop',
    href: '/',
  },
  navLinks: NAV_LINKS,
  actionLinks: ACTION_LINKS,
}

export { NAVBAR_CONFIG, NAV_LINKS, ACTION_LINKS, type NavbarItem }
