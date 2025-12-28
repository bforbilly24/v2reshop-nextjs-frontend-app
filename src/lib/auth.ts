import { env } from '@/config/environment'
import NextAuth, { User, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthResponse } from '@/features/auth/types'

export const authOptions = {
  secret: env.auth.secret,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            `${env.api.baseUrl}${env.api.version}${env.api.endpoints.auth.login}`,
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
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.name,
              accessToken: data.token,
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
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id as string
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
    maxAge: 7 * 24 * 60 * 60,
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

export default NextAuth(authOptions)
