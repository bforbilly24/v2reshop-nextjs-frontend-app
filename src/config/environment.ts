export const env = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
  },
} as const
