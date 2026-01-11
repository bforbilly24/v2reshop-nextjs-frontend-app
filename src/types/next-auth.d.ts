import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
    user: {
      id: string
      role?: string
      redirectUrl?: string
    } & DefaultSession['user']
  }

  interface User {
    accessToken?: string
    role?: string
    redirectUrl?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    accessTokenExpires?: number
    id?: string
    role?: string
    redirectUrl?: string
    error?: string
  }
}
