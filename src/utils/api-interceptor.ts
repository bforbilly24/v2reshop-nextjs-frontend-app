'use client'

import { signOut } from 'next-auth/react'
import { toast } from 'sonner'

/**
 * Global fetch wrapper that handles 401 unauthorized responses
 */
export async function secureFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  const response = await fetch(url, options)

  if (response.status === 401) {
    toast.error('Session expired', {
      description: 'Please login again',
    })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    await signOut({ redirect: false })
    window.location.href = '/auth/sign-in'

    throw new Error('Unauthorized')
  }

  return response
}

/**
 * Check if response is unauthorized and handle it
 */
export function handleUnauthorized(response: Response): void {
  if (response.status === 401) {
    toast.error('Session expired', {
      description: 'Please login again',
    })

    setTimeout(() => {
      signOut({ redirect: false }).then(() => {
        window.location.href = '/auth/sign-in'
      })
    }, 1000)
  }
}
