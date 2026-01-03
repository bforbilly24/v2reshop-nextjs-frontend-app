'use client'

import { useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

/**
 * Hook to check session expiry and auto logout
 */
export const useSessionCheck = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.error) {
      toast.error('Session expired', {
        description: 'Please login again',
      })
      signOut({ redirect: false }).then(() => {
        router.push('/auth/sign-in')
      })
    }
  }, [session, status, router])

  return { session, status }
}
