// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface PaginatedResponse<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    active: boolean
    page?: number | null
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// ============================================
// PRODUCT TYPES
// ============================================

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  image: string[]
  price: number
  discount_price: number
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
  category: Category
}

export interface Category {
  id: number
  name: string
  slug?: string
  created_at?: string
  updated_at?: string
  deleted_at?: string | null
}

export interface Variant {
  id: number
  type: 'COLOR' | 'SIZE' | 'SHAPE'
}

// ============================================
// API REQUEST TYPES
// ============================================

export interface GetProductsRequest {
  search?: string
  category_id?: number
  customized?: boolean
  price_min?: number
  price_max?: number
  rating_min?: number
  sort?: 'rating' | 'price' | 'created_at'
  order?: 'asc' | 'desc'
  page?: number
}

// ============================================
// API RESPONSE TYPES
// ============================================

export type GetProductsResponse = ApiResponse<PaginatedResponse<Product>>

export type GetProductCategoriesResponse = ApiResponse<Category[]>

export type GetProductVariantsResponse = ApiResponse<Variant[]>

// Legacy alias for backward compatibility
export type ProductParams = GetProductsRequest
