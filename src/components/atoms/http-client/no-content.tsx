import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { NoContentIcon } from '@/components/atoms/landing-icons'

interface NoContentProps {
  title?: string
  message?: string
  showBackButton?: boolean
}

export function NoContent({
  title = 'No Content',
  message = 'There is no content available at the moment.',
  showBackButton = true,
}: NoContentProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 text-center">
        <NoContentIcon />

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md">{message}</p>
        </div>

        {showBackButton && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
