'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserProfileResponse,
} from './types'

export const loginUser = async (
  credentials: LoginRequest
): Promise<AuthResponse> => {
  const res = await fetch(`${env.api.baseUrl}/login`, {
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
  const res = await fetch(`${env.api.baseUrl}/register`, {
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

  const res = await fetch(`${env.api.baseUrl}/auth/me`, {
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
