export const env = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
    version: '/api',
    endpoints: {
      auth: {
        login: '/auth/login',
        register: '/auth/register',
        me: '/auth/me',
        logout: '/auth/logout',
      },
      cart: {
        get: '/cart',
        post: '/cart',
        put: (id: number | string) => `/cart/${id}`,
        delete: (id: number | string) => `/cart/${id}`,
      },
      products: {
        list: '/products',
        detail: (slug: string) => `/products/${slug}`,
        categories: '/product-categories',
        variants: '/product-variants',
      },
      reviews: {
        list: '/reviews',
        create: '/reviews',
        delete: (id: number) => `/reviews/${id}`,
      },
      checkout: {
        create: '/checkout',
      },
    },
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
  },
} as const
