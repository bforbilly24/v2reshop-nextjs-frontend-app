'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import type {
  GetCartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartQuantityRequest,
  UpdateCartResponse,
  RemoveFromCartResponse,
} from './types'

export const getCart = async (): Promise<GetCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.get}?_t=${Date.now()}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    if (res.status === 401) {
      throw new Error('Unauthenticated')
    }
    throw new Error(`Failed to fetch cart: ${res.status} ${errorBody}`)
  }

  return res.json()
}

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

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.post}`, {
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

export const updateCartQuantity = async (
  cartItemId: number,
  payload: UpdateCartQuantityRequest
): Promise<UpdateCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.put(cartItemId)}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  const result = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthenticated')
    }
    if (res.status === 404) {
      throw new Error('Cart item not found')
    }
    throw new Error(result.message || `Failed to update cart: ${res.status}`)
  }

  return result
}

export const removeFromCart = async (
  cartItemId: number
): Promise<RemoveFromCartResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.delete(cartItemId)}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!res.ok) {
    const errorBody = await res.text()
    if (res.status === 401) {
      throw new Error('Unauthenticated')
    }
    if (res.status === 404) {
      throw new Error('Cart item not found')
    }
    throw new Error(
      `Failed to remove item from cart: ${res.status} ${errorBody}`
    )
  }

  return res.json()
}
