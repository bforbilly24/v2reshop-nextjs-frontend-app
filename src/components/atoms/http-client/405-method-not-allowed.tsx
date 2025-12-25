import Link from 'next/link'
import { Button } from '@/components/atoms/button'
import { MethodNotAllowedIcon } from '@/components/atoms/landing-icons'

interface MethodNotAllowedProps {
  title?: string
  message?: string
}

export function MethodNotAllowed({
  title = '405 - Method Not Allowed',
  message = 'The request method is not supported for this resource.',
}: MethodNotAllowedProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <div className="flex flex-col items-center space-y-6 text-center">
        <MethodNotAllowedIcon />

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-md">{message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
