'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { toast } from 'sonner'

/**
 * Get cookie value by name
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

/**
 * Delete cookie by name
 */
function deleteCookie(name: string) {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

/**
 * Decode JWT token and extract expiry time
 */
function decodeJWT(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

/**
 * Check if JWT token is expired
 */
function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT(token)
  if (!decoded?.exp) return true

  const currentTime = Math.floor(Date.now() / 1000)

  return decoded.exp < currentTime + 5
}

/**
 * Provider to check session expiry globally
 * Add this to your root layout to automatically logout users when token expires
 */
export function SessionExpiryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const sellerToken = getCookie('seller_token')

      if (sellerToken && isTokenExpired(sellerToken)) {
        deleteCookie('seller_token')

        if (pathname?.startsWith('/seller')) {
          toast.error('Session expired', {
            description: 'Please login again as seller',
          })
          router.push('/seller/auth/sign-in')
          return
        }
      }

      if (status === 'authenticated' && session?.accessToken) {
        if (
          typeof session.accessToken === 'string' &&
          isTokenExpired(session.accessToken)
        ) {
          toast.error('Session expired', {
            description: 'Please login again',
          })
          await signOut({ redirect: false })
          router.push('/auth/sign-in')
          return
        }
      }
    }

    checkAuth()

    const interval = setInterval(checkAuth, 30 * 1000)

    return () => clearInterval(interval)
  }, [session, status, router, pathname])

  return <>{children}</>
}
