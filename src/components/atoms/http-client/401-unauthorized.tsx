import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { UnauthorizedIcon } from '@/components/atoms/landing-icons'

interface UnauthorizedProps {
  title?: string
  message?: string
  showLoginButton?: boolean
}

export function Unauthorized({
  title = '401 - Unauthorized',
  message = 'You need to be authenticated to access this page.',
  showLoginButton = true,
}: UnauthorizedProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 text-center">
        <UnauthorizedIcon />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {showLoginButton && (
            <Button asChild>
              <Link href="/auth/sign-in">Sign In</Link>
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
