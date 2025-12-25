import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { ForbiddenIcon } from '@/components/atoms/landing-icons'

interface ForbiddenProps {
  title?: string
  message?: string
}

export function Forbidden({
  title = '403 - Forbidden',
  message = "You don't have permission to access this resource.",
}: ForbiddenProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 text-center">
        <ForbiddenIcon />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
