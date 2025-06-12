import {
  //   Search,
  User,
  ShoppingCart,
//   Waypoints,
  HandHeart,
  Home,
  Info,
  Compass,
  Phone,
  LogOut,
  Box,
//   PartyPopper,
//   BookOpenCheck,
  Lock,
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
    isComingSoon?: boolean
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
        tagline: 'Explore our charity services and solutions.',
        href: '/coming-soon',
        icon: Lock,
        isComingSoon: true,
      },
      {
        title: 'Re-Study',
        tagline: 'Access educational resources and materials.',
        href: '/coming-soon',
        icon: Lock,
        isComingSoon: true,
      },
      {
        title: 'Re-Event',
        tagline: 'Discover upcoming events and activities.',
        href: '/coming-soon',
        icon: Lock,
        isComingSoon: true,
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
