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
        seller: {
          login: '/auth/login-seller',
          register: '/auth/register-seller',
        },
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
      communities: {
        list: '/communities',
        join: (id: number) => `/communities/${id}/join`,
        posts: (id: number) => `/communities/${id}/posts`,
        approveMember: (communityId: number, memberId: number) =>
          `/communities/${communityId}/members/${memberId}/approve`,
        rejectMember: (communityId: number, memberId: number) =>
          `/communities/${communityId}/members/${memberId}/reject`,
      },
    },
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET!,
    url: process.env.NEXTAUTH_URL!,
  },
  seller: {
    dashboardUrl:
      process.env.NEXT_PUBLIC_SELLER_DASHBOARD_URL ||
      'https://reshop.circleit.dev/admin/login',
  },
  goapi: {
    key: process.env.GOAPI_KEY!,
    baseUrl: process.env.GOAPI_BASE_URL!,
  },
} as const
