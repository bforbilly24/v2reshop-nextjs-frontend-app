import { env } from '@/config/environment'
import NextAuth, { User, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthResponse } from '@/features/auth/types'

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
  return decoded.exp < currentTime + 60
}

export const authOptions = {
  secret: env.auth.secret,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const role = credentials?.role || 'customer'
          const endpoint = role === 'seller' 
            ? env.api.endpoints.auth.seller.login 
            : env.api.endpoints.auth.login

          const response = await fetch(
            `${env.api.baseUrl}${env.api.version}${endpoint}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          )

          if (!response.ok) {
            return null
          }

          const data: AuthResponse = await response.json()

          if (data.status === true && data.user) {
            const meResponse = await fetch(
              `${env.api.baseUrl}${env.api.version}/auth/me`,
              {
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${data.token}`,
                  'Accept': 'application/json',
                },
              }
            )

            let actualRole = role === 'seller' ? 'seller' : 'customer'
            if (meResponse.ok) {
              const meData = await meResponse.json()
              if (meData.status && meData.user?.roles) {
                if (meData.user.roles.includes('seller')) {
                  actualRole = 'seller'
                } else if (meData.user.roles[0]) {
                  actualRole = meData.user.roles[0]
                }
              }
            }

            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.name,
              accessToken: data.token,
              role: actualRole,
              redirectUrl: data.redirect_url,
            }
          }

          return null
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user && 'accessToken' in user) {
        token.accessToken = user.accessToken
        token.id = user.id
        token.role = ('role' in user ? user.role : 'customer') as string
        token.redirectUrl = user.redirectUrl as string

        const decoded = decodeJWT(user.accessToken as string)
        if (decoded?.exp) {
          token.accessTokenExpires = decoded.exp
        }
      }

      if (token.accessToken && typeof token.accessToken === 'string') {
        if (isTokenExpired(token.accessToken)) {
          token.error = 'TokenExpiredError'
          return token
        }
      }

      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (!token.accessToken || token.error) {
        session.error = 'TokenExpiredError'
        return session
      }

      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.redirectUrl = token.redirectUrl as string
        if (token.accessToken) {
          session.accessToken = token.accessToken as string
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in',
    signOut: '/auth/sign-in',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 60 * 60,
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === 'production'
          ? '__Secure-next-auth.session-token'
          : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  useSecureCookies: process.env.NODE_ENV === 'production',
}
