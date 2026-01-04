/**
 * Type-safe route configuration
 * Provides autocomplete and type checking for navigation
 */

export const routes = {
  home: '/',

  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },

  reproduct: '/reproduct',
  reproductDetail: (slug: string) => `/reproduct/${slug}`,

  recommunity: '/recommunity',
  recommunityDetail: (slug: string) => `/recommunity/${slug}`,

  cart: '/shopping-cart',
  checkout: '/checkout',

  aboutUs: '/about-us',
  contactUs: '/contact-us',
} as const

export type RouteKey = keyof typeof routes
export type RoutePath = string

/**
 * Helper to get route with type safety
 */
export const getRoute = {
  home: () => routes.home,
  login: () => routes.auth.login,
  register: () => routes.auth.register,
  reproduct: () => routes.reproduct,
  reproductDetail: (slug: string) => routes.reproductDetail(slug),
  recommunity: () => routes.recommunity,
  cart: () => routes.cart,
  checkout: () => routes.checkout,
  aboutUs: () => routes.aboutUs,
  contactUs: () => routes.contactUs,
} as const

/**
 * Navigation helper with type safety
 */
export const navigation = {
  main: [
    { name: 'Home', href: routes.home },
    { name: 'Products', href: routes.reproduct },
    { name: 'Community', href: routes.recommunity },
    { name: 'About Us', href: routes.aboutUs },
    { name: 'Contact', href: routes.contactUs },
  ],
} as const

export type NavigationItem = (typeof navigation.main)[number]
