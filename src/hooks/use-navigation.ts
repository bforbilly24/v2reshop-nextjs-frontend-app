import { routes } from '@/config/routes'
import { useRouter, usePathname } from 'next/navigation'

/**
 * Type-safe navigation hook with TanStack-like API
 */
export function useNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = {
    /**
     * Navigate to a route
     */
    to: (path: string) => {
      router.push(path)
    },

    /**
     * Navigate to home
     */
    home: () => {
      router.push(routes.home)
    },

    /**
     * Navigate to products
     */
    reproduct: () => {
      router.push(routes.reproduct)
    },

    /**
     * Navigate to product detail
     */
    reproductDetail: (slug: string) => {
      router.push(routes.reproductDetail(slug))
    },

    /**
     * Navigate to cart
     */
    cart: () => {
      router.push(routes.cart)
    },

    /**
     * Navigate to checkout
     */
    checkout: () => {
      router.push(routes.checkout)
    },

    /**
     * Navigate to login
     */
    login: () => {
      router.push(routes.auth.login)
    },

    /**
     * Navigate to register
     */
    register: () => {
      router.push(routes.auth.register)
    },

    /**
     * Navigate back
     */
    back: () => {
      router.back()
    },

    /**
     * Navigate forward
     */
    forward: () => {
      router.forward()
    },

    /**
     * Refresh current page
     */
    refresh: () => {
      router.refresh()
    },

    /**
     * Replace current route
     */
    replace: (path: string) => {
      router.replace(path)
    },
  }

  /**
   * Check if current path matches
   */
  const isActive = (path: string): boolean => {
    return pathname === path
  }

  /**
   * Check if current path starts with
   */
  const isActiveSection = (path: string): boolean => {
    return pathname.startsWith(path)
  }

  return {
    navigate,
    pathname,
    isActive,
    isActiveSection,
  }
}
