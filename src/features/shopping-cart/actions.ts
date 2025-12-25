'use server'

import { redirect } from 'next/navigation'
import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type {
  GetCartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartQuantityRequest,
  UpdateCartResponse,
  RemoveFromCartResponse,
} from './types'

// ============================================
// CART ACTIONS (Requires Authentication)
// ============================================

/**
 * Get user's cart items
 * Requires authentication - must be logged in
 */
export const getCart = async (): Promise<GetCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
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
      redirect('/auth/login')
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
  payload: AddToCartRequest
): Promise<AddToCartResponse> => {
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
  payload: UpdateCartQuantityRequest
): Promise<UpdateCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
  }

  const res = await fetch(`${env.api.baseUrl}/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/auth/login')
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
): Promise<RemoveFromCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
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
      redirect('/auth/login')
    }
    if (res.status === 404) {
      throw new Error('Cart item not found')
    }
    const errorBody = await res.text()
    throw new Error(
      `Failed to remove item from cart: ${res.status} ${errorBody}`
    )
  }

  return res.json()
}
