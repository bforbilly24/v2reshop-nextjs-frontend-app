'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/ui/icon'

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: string
    color?: string
  }
>(({ children, className, color = 'bg-primary', icon = 'lucide:arrow-right', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'size-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]',
            color
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <Icon icon={icon} className="size-5" />
      </div>
    </button>
  )
})

InteractiveHoverButton.displayName = 'InteractiveHoverButton'