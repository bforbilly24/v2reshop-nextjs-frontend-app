import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { env } from '@/config/environment'

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

  const protectedRoutes = [
    '/checkout',
    '/shopping-cart',
    '/reproduct',
    '/recommunity',
  ]

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )

  if (isBuyerAuthPage) {
    if (sellerToken) {
      return NextResponse.redirect(
        new URL(env.seller.dashboardUrl, request.url)
      )
    }
    if (sessionToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isSellerAuthPage) {
    if (sellerToken) {
      return NextResponse.redirect(
        new URL(env.seller.dashboardUrl, request.url)
      )
    }
    if (sessionToken) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isProtectedRoute && !sessionToken && !sellerToken) {
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
