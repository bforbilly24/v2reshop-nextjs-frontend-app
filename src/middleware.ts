import { env } from '@/config/environment'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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
  return decoded.exp < currentTime
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const sessionToken =
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token')

  const sellerToken = request.cookies.get('seller_token')

  const isBuyerAuthPage =
    pathname.startsWith('/auth/sign-in') || pathname.startsWith('/auth/sign-up')
  const isSellerAuthPage =
    pathname.startsWith('/seller/auth/sign-in') ||
    pathname.startsWith('/seller/auth/sign-up')

  if (sellerToken?.value && isTokenExpired(sellerToken.value)) {
    if (!isSellerAuthPage) {
      const response = NextResponse.redirect(
        new URL('/seller/auth/sign-in', request.url)
      )
      response.cookies.delete('seller_token')
      return response
    } else {
      const response = NextResponse.next()
      response.cookies.delete('seller_token')
      return response
    }
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (sessionToken && !token && !isBuyerAuthPage) {
    const response = NextResponse.redirect(
      new URL('/auth/sign-in', request.url)
    )
    response.cookies.delete('next-auth.session-token')
    response.cookies.delete('__Secure-next-auth.session-token')
    response.cookies.delete('next-auth.csrf-token')
    response.cookies.delete('next-auth.callback-url')
    return response
  }

  if (token?.accessToken && typeof token.accessToken === 'string') {
    if (isTokenExpired(token.accessToken) && !isBuyerAuthPage) {
      const response = NextResponse.redirect(
        new URL('/auth/sign-in', request.url)
      )

      response.cookies.delete('next-auth.session-token')
      response.cookies.delete('__Secure-next-auth.session-token')
      response.cookies.delete('next-auth.csrf-token')
      response.cookies.delete('next-auth.callback-url')

      return response
    }
  }

  const protectedRoutes = [
    '/checkout',
    '/shopping-cart',
    '/reproduct',
    '/recommunity',
  ]

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  const hasValidSession = token && token.accessToken
  const hasValidSellerToken =
    sellerToken?.value && !isTokenExpired(sellerToken.value)

  if (isBuyerAuthPage) {
    if (hasValidSellerToken) {
      return NextResponse.redirect(
        new URL(env.seller.dashboardUrl, request.url)
      )
    }
    if (hasValidSession) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isSellerAuthPage) {
    if (hasValidSellerToken) {
      return NextResponse.redirect(
        new URL(env.seller.dashboardUrl, request.url)
      )
    }
    if (hasValidSession) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isProtectedRoute && !hasValidSession && !hasValidSellerToken) {
    const loginUrl = new URL('/auth/sign-in', request.url)
    loginUrl.searchParams.set('callbackUrl', '/reproduct')
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)',
  ],
}
