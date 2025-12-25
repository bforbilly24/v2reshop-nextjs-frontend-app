// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  status: boolean
  message: string
  data: T | null
}

// ============================================
// TRANSACTION TYPES
// ============================================

export interface WhatsAppSeller {
  seller_id: number
  seller_name: string
  whatsapp: string
}

export interface Transaction {
  id?: number
  user_id?: number
  invoice: string
  shipping_service?: string
  shipping_address?: string
  note?: string | null
  total_price?: number
  status: string
  whatsapp_admin: string
  whatsapp_sellers?: WhatsAppSeller[]
  created_at?: string
  updated_at?: string
}

// ============================================
// API REQUEST TYPES
// ============================================

export interface CheckoutRequest {
  shipping_service: string
  shipping_address: string
  note?: string
}

// ============================================
// API RESPONSE TYPES
// ============================================

export type CheckoutResponse = ApiResponse<Transaction>
