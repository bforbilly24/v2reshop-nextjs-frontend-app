// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  status: boolean
  message?: string
  data: T
}

// ============================================
// CART TYPES
// ============================================

export interface CartItemVariant {
  id: number
  type: string
  value: string
  stock: number
  price: number | null
  product_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface CartItemProduct {
  id: number
  name: string
  slug: string
  description: string
  image: string[]
  price: number
  discount_price: number | null
  stock: number | null
  is_allow_custom: boolean
  is_active: boolean
  sold_count: number
  rating_count: number
  category_id: number
  user_id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface CartItem {
  id: number
  user_id: number
  transaction_id: number | null
  product_id: number
  product_variant_id: number | null
  quantity: number
  price: number
  total_price: number
  is_checked_out: boolean
  created_at: string
  updated_at: string
  product: CartItemProduct
  variant: CartItemVariant | null
}

export interface CartData {
  items: CartItem[]
  subtotal: number
}

// ============================================
// API REQUEST TYPES
// ============================================

export interface AddToCartRequest {
  product_id: number
  product_variant_id?: number | null
  quantity: number
}

export interface UpdateCartQuantityRequest {
  quantity: number
}

// ============================================
// API RESPONSE TYPES
// ============================================

export type GetCartResponse = ApiResponse<CartData>

export type AddToCartResponse = ApiResponse<CartItem | null>

export type UpdateCartResponse = ApiResponse<{ message: string }>

export type RemoveFromCartResponse = ApiResponse<{ message: string }>
