'use client'

import React from 'react'
import { Icon as IconIfyIcon } from '@iconify/react'
import { cn } from '@/lib/cn'

const Icon = React.forwardRef<
  React.ElementRef<typeof IconIfyIcon>,
  React.ComponentPropsWithoutRef<typeof IconIfyIcon>
>(({ className, ...props }, ref) => {
  return (
    <IconIfyIcon
      className={cn('fill-current', className)}
      ref={ref}
      {...props}
    />
  )
})
Icon.displayName = 'Icon'

export { Icon }
