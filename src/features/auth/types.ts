export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
  role: string
}

export interface SellerRegisterRequest {
  name: string
  email: string
  phone: string
  password: string
}

export interface AuthUser {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  status: boolean
  message: string
  token: string
  redirect_url?: string
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    image: string | null
    phone: string
    bio: string
    created_at: string
    updated_at: string
  }
}

export interface ApiError {
  status: boolean
  message: string
  errors?: {
    [key: string]: string[]
  }
}

export interface UserProfile {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  image: string | null
  phone: string
  bio: string
  created_at: string
  updated_at: string
}

export interface UserProfileResponse {
  status: boolean
  user: UserProfile
}

export interface SellerAuthResponse {
  status: boolean
  message: string
  token: string
  redirect_url: string
  user: {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    image: string | null
    phone: string
    bio: string
    created_at: string
    updated_at: string
  }
}
