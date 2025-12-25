import type {
  GetCartResponse,
  AddToCartRequest,
  AddToCartResponse,
  UpdateCartQuantityRequest,
  UpdateCartResponse,
  RemoveFromCartResponse,
} from '@/features/shopping-cart/types'

const API_BASE = '/api'

/**
 * Get cart items
 */
export async function getCartItems(): Promise<GetCartResponse> {
  const res = await fetch(`${API_BASE}/cart`, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch cart')
  }

  return res.json()
}

/**
 * Add item to cart
 */
export async function addToCartAPI(
  payload: AddToCartRequest
): Promise<AddToCartResponse> {
  const res = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || 'Failed to add to cart')
  }

  return data
}

/**
 * Update cart item quantity
 */
export async function updateCartItemAPI(
  cartItemId: number,
  payload: UpdateCartQuantityRequest
): Promise<UpdateCartResponse> {
  const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to update cart')
  }

  return res.json()
}

/**
 * Remove item from cart
 */
export async function removeCartItemAPI(
  cartItemId: number
): Promise<RemoveFromCartResponse> {
  const res = await fetch(`${API_BASE}/cart/${cartItemId}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to remove item')
  }

  return res.json()
}
