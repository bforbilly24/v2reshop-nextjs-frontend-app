import { Search, User, ShoppingCart } from 'lucide-react'

interface NavbarItem {
  id: number
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
  items?: { id: number; title: string; url: string }[]
}

interface NavbarData {
  brand: {
    name: string
    url: string
  }
  navbarGroups: {
    title: string
    items: NavbarItem[]
  }[]
}

const NAVBAR: NavbarData = {
  brand: {
    name: 'Re-shop',
    url: '/',
  },
  navbarGroups: [
    {
      title: 'Main',
      items: [
        {
          id: 1,
          title: 'Home',
          url: '/',
        },
        {
          id: 2,
          title: 'About Us',
          url: '/about-us',
        },
        {
          id: 3,
          title: 'Explore',
          url: '#',
          items: [
            { id: 1, title: 'Re-Product', url: '/reproduct' },
            { id: 2, title: 'Re-Community', url: '/recommunity' },
            { id: 3, title: 'Re-Charity [Coming Soon]', url: '/coming-soon' },
            { id: 4, title: 'Re-Study [Coming Soon]', url: '/coming-soon' },
            { id: 5, title: 'Re-Event [Coming Soon]', url: '/coming-soon' },
          ],
        },
        {
          id: 4,
          title: 'Contact Us',
          url: '/contact-us',
        },
      ],
    },
    {
      title: 'Actions',
      items: [
        {
          id: 5,
          title: 'Search',
          url: '/search',
          icon: Search,
        },
        {
          id: 6,
          title: 'Account',
          url: '#',
          icon: User,
          items: [{ id: 1, title: 'Logout', url: '/auth/login' }],
        },
        {
          id: 7,
          title: 'Cart',
          url: '/shopping-cart',
          icon: ShoppingCart,
        },
      ],
    },
  ],
}
export { NAVBAR, type NavbarItem, type NavbarData }
