'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  ApiResponse,
  Category,
  PaginatedResponse,
  Product,
  ProductParams,
  Variant,
} from './types'

// Cart Types
interface CartItem {
  id: number
  product_id: number
  variant_id: number | null
  quantity: number
  price: number
  total_price: number
  is_checked_out: boolean
  product: {
    id: number
    name: string
    slug: string
    image: string[]
    price: number
    discount_price: number | null
    final_price: number
  }
  variant?: {
    id: number
    type: string
    value: string
    stock: number
    price: number
  }
}

interface CartData {
  items: CartItem[]
  subtotal: number
}

interface AddToCartPayload {
  product_id: number
  quantity: number
}

export const getProducts = async (
  params?: ProductParams
): Promise<ApiResponse<PaginatedResponse<Product>>> => {
  const url = new URL(`${env.api.baseUrl}/products`)

  if (params) {
    if (params.search) url.searchParams.append('search', params.search)
    if (params.category_id)
      url.searchParams.append('category_id', params.category_id.toString())
    if (params.customized !== undefined)
      url.searchParams.append('customized', params.customized ? '1' : '0')
    if (params.price_min)
      url.searchParams.append('price_min', params.price_min.toString())
    if (params.price_max)
      url.searchParams.append('price_max', params.price_max.toString())
    if (params.rating_min)
      url.searchParams.append('rating_min', params.rating_min.toString())
    if (params.sort) url.searchParams.append('sort', params.sort)
    if (params.order) url.searchParams.append('order', params.order)
    if (params.page) url.searchParams.append('page', params.page.toString())
  }

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Failed to fetch products: ${res.status} ${errorBody}`)
  }

  return res.json()
}

export const getProductCategories = async (): Promise<
  ApiResponse<Category[]>
> => {
  const res = await fetch(`${env.api.baseUrl}/product-categories`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch product categories')
  }

  return res.json()
}

export const getProductVariants = async (): Promise<ApiResponse<Variant[]>> => {
  const res = await fetch(`${env.api.baseUrl}/product-variants`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch product variants')
  }

  return res.json()
}

// ============================================
// CART ACTIONS (Requires Authentication)
// ============================================

/**
 * Get user's cart items
 * Requires authentication - must be logged in
 */
export const getCart = async (): Promise<ApiResponse<CartData>> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized: Please login to view cart')
  }

  const res = await fetch(`${env.api.baseUrl}/cart`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Please login again')
    }
    const errorBody = await res.text()
    throw new Error(`Failed to fetch cart: ${res.status} ${errorBody}`)
  }

  return res.json()
}

/**
 * Add product to cart
 * Requires authentication - must be logged in
 */
export const addToCart = async (
  payload: AddToCartPayload
): Promise<ApiResponse<CartItem | null>> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return {
      status: false,
      message: 'Please login to add items to cart',
      data: null,
    }
  }

  const res = await fetch(`${env.api.baseUrl}/cart`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      return {
        status: false,
        message: 'Please login again',
        data: null,
      }
    }
    if (res.status === 400) {
      return {
        status: false,
        message: data.message || 'Product out of stock',
        data: null,
      }
    }
    return {
      status: false,
      message: data.message || 'Failed to add to cart',
      data: null,
    }
  }

  return data
}

/**
 * Update cart item quantity
 * Requires authentication - must be logged in
 */
export const updateCartQuantity = async (
  cartItemId: number,
  quantity: number
): Promise<ApiResponse<{ message: string }>> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized: Please login to update cart')
  }

  const res = await fetch(`${env.api.baseUrl}/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({ quantity }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Please login again')
    }
    if (res.status === 404) {
      throw new Error('Cart item not found')
    }
    const errorBody = await res.text()
    throw new Error(`Failed to update cart: ${res.status} ${errorBody}`)
  }

  return res.json()
}

/**
 * Remove item from cart
 * Requires authentication - must be logged in
 */
export const removeFromCart = async (
  cartItemId: number
): Promise<ApiResponse<{ message: string }>> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized: Please login to remove items from cart')
  }

  const res = await fetch(`${env.api.baseUrl}/cart/${cartItemId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Please login again')
    }
    if (res.status === 404) {
      throw new Error('Cart item not found')
    }
    const errorBody = await res.text()
    throw new Error(`Failed to remove item from cart: ${res.status} ${errorBody}`)
  }

  return res.json()
}
