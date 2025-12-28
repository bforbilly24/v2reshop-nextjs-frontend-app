'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import type { CheckoutRequest, CheckoutResponse } from './types'

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

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.checkout.create}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  })

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
