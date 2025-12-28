'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
  SellerAuthResponse,
} from './types'

export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.auth.login}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to login')
  }

  return res.json()
}

export const registerUser = async (
  data: RegisterRequest
): Promise<AuthResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.auth.register}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to register')
  }

  return res.json()
}

export const getCurrentUser = async (): Promise<UserProfileResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Not authenticated')
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.auth.me}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to fetch user profile')
  }

  return res.json()
}

// Client-side function to get user profile with token (for sellers)
export const getCurrentUserWithToken = async (token: string): Promise<UserProfileResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.auth.me}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to fetch user profile')
  }

  return res.json()
}

export const loginSeller = async (
  credentials: LoginRequest
): Promise<SellerAuthResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}/auth/login-seller`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(credentials),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to login')
  }

  return res.json()
}

export const registerSeller = async (
  data: RegisterRequest
): Promise<SellerAuthResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}/auth/register-seller`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.json()
    throw new Error(errorBody.message || 'Failed to register')
  }

  return res.json()
}
