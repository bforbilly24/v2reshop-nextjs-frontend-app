import { cn } from '@/lib/cn'

interface LoadingStateProps {
  message?: string
  className?: string
}

/**
 * Loading overlay to prevent content flash during auth checks
 * Shows immediately on page load before redirects happen
 */
export const AuthLoadingState = ({
  message = 'Checking authentication...',
  className,
}: LoadingStateProps) => {
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background',
        className
      )}
    >
      <div className='flex flex-col items-center gap-4'>
        {/* Spinner */}
        <div className='size-12 animate-spin rounded-full border-4 border-muted border-t-emerald-500' />
        
        {/* Message */}
        <p className='text-sm text-muted-foreground'>{message}</p>
      </div>
    </div>
  )
}
