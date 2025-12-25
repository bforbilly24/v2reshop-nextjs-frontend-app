/**
 * Type-safe route configuration
 * Provides autocomplete and type checking for navigation
 */

export const routes = {
  home: '/',

  // Auth routes
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },

  // Product routes
  reproduct: '/reproduct',
  reproductDetail: (slug: string) => `/reproduct/${slug}`,

  // Community routes
  recommunity: '/recommunity',

  // Cart & Checkout
  cart: '/shopping-cart',
  checkout: '/checkout',

  // Info pages
  aboutUs: '/about-us',
  contactUs: '/contact-us',
} as const

// Type for all possible route paths
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

// Export types for usage
export type NavigationItem = (typeof navigation.main)[number]
