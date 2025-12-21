import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user has session token (sudah login)
  const sessionToken = request.cookies.get('next-auth.session-token') || 
                      request.cookies.get('__Secure-next-auth.session-token')

  // Auth pages (login, register)
  const isAuthPage = pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register')

  // Jika sudah login tapi akses halaman auth, redirect ke home
  if (isAuthPage && sessionToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Protected routes - uncomment jika ada routes yang perlu login
  // const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile')
  // if (isProtectedRoute && !sessionToken) {
  //   const loginUrl = new URL('/auth/login', request.url)
  //   loginUrl.searchParams.set('callbackUrl', pathname)
  //   return NextResponse.redirect(loginUrl)
  // }

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
