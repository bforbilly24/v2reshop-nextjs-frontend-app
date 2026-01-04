'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import type { CheckoutRequest, CheckoutResponse } from './types'

const GOAPI_KEY = 'b1f28663-1283-55a3-1858-8edb09fd'
const GOAPI_BASE_URL = 'https://api.goapi.io'

/**
 * Fetch all provinces in Indonesia
 */
export async function fetchProvinces() {
  try {
    const response = await fetch(`${GOAPI_BASE_URL}/regional/provinsi`, {
      headers: {
        'X-API-KEY': GOAPI_KEY,
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('API Error:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    console.log('Provinces API response:', data)
    
    if (!data || !Array.isArray(data.data)) {
      console.error('Invalid API response format')
      return []
    }
    
    return data.data
  } catch (error) {
    console.error('Error fetching provinces:', error)
    return []
  }
}

/**
 * Fetch cities by province ID
 */
export async function fetchCities(provinceId: string) {
  if (!provinceId) return []
  
  try {
    const response = await fetch(
      `${GOAPI_BASE_URL}/regional/kota?provinsi_id=${provinceId}`,
      {
        headers: {
          'X-API-KEY': GOAPI_KEY,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Cities API Error:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    
    if (!data || !Array.isArray(data.data)) {
      console.error('Invalid cities API response format')
      return []
    }
    
    return data.data
  } catch (error) {
    console.error('Error fetching cities:', error)
    return []
  }
}

/**
 * Fetch kecamatan (sub-districts) by city ID
 */
export async function fetchKecamatan(cityId: string) {
  if (!cityId) return []
  
  try {
    const response = await fetch(
      `${GOAPI_BASE_URL}/regional/kecamatan?kota_id=${cityId}`,
      {
        headers: {
          'X-API-KEY': GOAPI_KEY,
        },
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      console.error('Kecamatan API Error:', response.status, response.statusText)
      return []
    }

    const data = await response.json()
    
    if (!data || !Array.isArray(data.data)) {
      console.error('Invalid kecamatan API response format')
      return []
    }
    
    return data.data
  } catch (error) {
    console.error('Error fetching kecamatan:', error)
    return []
  }
}

/**
 * Checkout cart user
 * Requires authentication - must be logged in
 *
 * Melakukan checkout seluruh cart aktif milik user yang sedang login,
 * membuat transaksi, dan menghasilkan URL WhatsApp untuk admin.
 */
export const checkoutCart = async (
  payload: CheckoutRequest
): Promise<CheckoutResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    redirect('/auth/login')
  }

  const res = await fetch(
    `${env.api.baseUrl}${env.api.version}${env.api.endpoints.checkout.create}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  )

  if (!res.ok) {
    if (res.status === 401) {
      redirect('/auth/sign-in')
    }

    const errorData = await res.json()

    return {
      status: false,
      message: errorData.message || `Checkout failed: ${res.status}`,
      data: null,
    }
  }

  return res.json()
}
