'use client'

import { useEffect } from 'react'
import { InternalError } from '@/components/atoms/http-client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <InternalError
      message="Something went wrong! Please try again."
      onRetry={reset}
    />
  )
}
