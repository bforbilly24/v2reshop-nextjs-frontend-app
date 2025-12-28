'use client'

import { InternalError } from '@/components/atoms/http-client'

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <InternalError
          message='A critical error occurred. Please refresh the page.'
          onRetry={reset}
        />
      </body>
    </html>
  )
}
