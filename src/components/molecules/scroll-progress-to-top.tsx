'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/cn'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { ScrollProgress } from '@/components/atoms/scroll-progress'

interface ScrollProgressToTopProps {
  className?: string
  showOffset?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'gradient'
  showTopProgress?: boolean
}

export function ScrollProgressToTop({
  className,
  showOffset = 300,
  size = 'md',
  variant = 'default',
  showTopProgress = true,
}: ScrollProgressToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [157, 0])

  useEffect(() => {
    const toggleVisibility = () => {
      if (typeof window !== 'undefined') {
        setIsVisible(window.pageYOffset > showOffset)
      }
    }

    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showOffset])

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  const sizeClasses = {
    sm: 'size-10',
    md: 'size-12',
    lg: 'size-14',
  }

  const iconSizes = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-6',
  }

  const svgSizes = {
    sm: 40,
    md: 48,
    lg: 56,
  }

  const variantClasses = {
    default:
      'bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-emerald-300',
    outline:
      'bg-transparent hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-200 hover:border-emerald-400',
    gradient:
      'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0',
  }

  return (
    <>
      {showTopProgress && <ScrollProgress className='top-0 h-1' />}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={cn('fixed bottom-8 right-8 z-50', className)}
          >
            <div className='relative'>
              <svg
                className='absolute inset-0 -rotate-90 pointer-events-none'
                width={svgSizes[size]}
                height={svgSizes[size]}
                viewBox={`0 0 ${svgSizes[size]} ${svgSizes[size]}`}
              >
                <circle
                  cx={svgSizes[size] / 2}
                  cy={svgSizes[size] / 2}
                  r={svgSizes[size] / 2 - 2}
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  className='text-gray-200 dark:text-gray-700'
                />
                <motion.circle
                  cx={svgSizes[size] / 2}
                  cy={svgSizes[size] / 2}
                  r={svgSizes[size] / 2 - 2}
                  stroke='currentColor'
                  strokeWidth='3'
                  fill='none'
                  strokeLinecap='round'
                  className='text-emerald-500'
                  style={{
                    strokeDasharray: 157,
                    strokeDashoffset: strokeDashoffset,
                  }}
                />
              </svg>

              <Button
                onClick={scrollToTop}
                size='icon'
                className={cn(
                  sizeClasses[size],
                  'cursor-pointer rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative z-10',
                  variantClasses[variant],
                  'dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
                  'cursor-pointer'
                )}
                aria-label='Scroll to top'
                type='button'
              >
                <Icon icon='lucide:arrow-up' className={iconSizes[size]} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
