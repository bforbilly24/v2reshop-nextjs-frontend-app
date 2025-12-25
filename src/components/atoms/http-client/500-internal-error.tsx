import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { InternalErrorIcon } from '@/components/atoms/landing-icons'

interface InternalErrorProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function InternalError({
  title = '500 - Internal Server Error',
  message = 'Something went wrong on our end. Please try again later.',
  onRetry,
}: InternalErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 text-center">
        <InternalErrorIcon />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {onRetry && (
            <Button onClick={onRetry}>
              Try Again
            </Button>
          )}
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
