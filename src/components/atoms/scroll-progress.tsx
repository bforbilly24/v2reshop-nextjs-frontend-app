'use client'

import React from 'react'
import { motion, MotionProps, useScroll } from 'motion/react'
import { cn } from '@/lib/cn'

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps>,
    MotionProps {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.section
      id='scroll-progress'
      ref={ref}
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-yellow-500 via-blue-500 to-emerald-500',
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  )
})

ScrollProgress.displayName = 'ScrollProgress'
