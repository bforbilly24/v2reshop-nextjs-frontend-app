import { Category } from '@/features/reproduct/types'

export interface VariantOption {
  id: number
  value: string
  stock: number
  price: number | null
  is_available: boolean
}

export interface ProductDetail {
  id: number
  name: string
  slug: string
  description: string
  images: string[]
  price: number
  discount_price: number
  final_price: number
  rating_count: number
  sold_count: number
  is_allow_custom: boolean
  in_stock: boolean
  category: Category
  variants: {
    [key: string]: VariantOption[]
  }
}

// Review Types
export interface Review {
  id: number
  user_id: number
  product_id: number
  rating: number
  comment: string
  created_at: string
  user: {
    id: number
    name: string
    email: string
    avatar?: string
  }
}

export interface CreateReviewPayload {
  product_id: number
  rating: number
  comment: string
}
