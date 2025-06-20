import * as React from 'react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/shadcn/button'
import { Icon } from '@/components/ui/icon'

type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
>

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    return (
      <div className={cn('relative rounded-md', className)}>
        <input
          type={showPassword ? 'text' : 'password'}
          className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <Button
          type='button'
          size='icon'
          variant='ghost'
          disabled={disabled}
          className='absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-md text-muted-foreground'
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <Icon icon='mdi:eye' width={18} height={18} />
          ) : (
            <Icon icon='mdi:eye-off' width={18} height={18} />
          )}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
