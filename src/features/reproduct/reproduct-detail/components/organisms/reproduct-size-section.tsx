'use client'

import React from 'react'
import { cn } from '@/lib/cn'

interface ReProductSizeSectionProps {
  sizes: string[]
  selectedSize: string
  onSelectSize: (size: string) => void
}

const ReProductSizeSection: React.FC<ReProductSizeSectionProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']

  const sortedSizes = [...sizes].sort((a, b) => {
    const indexA = sizeOrder.indexOf(a)
    const indexB = sizeOrder.indexOf(b)
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return a.localeCompare(b)
  })

  if (sizes.length === 0) return null

  return (
    <div className='mb-4'>
      <div className='pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3'>
        <p className='font-normal text-sm lg:text-base text-muted-foreground'>
          Size:
        </p>
        <p className='font-medium text-base text-foreground'>{selectedSize}</p>
      </div>
      <div className='flex flex-wrap gap-3 mb-4'>
        {sortedSizes.map((size, index) => {
          const isSelected = size === selectedSize
          return (
            <label key={index} className='cursor-pointer'>
              <input
                type='radio'
                name='size-filter'
                value={size}
                checked={isSelected}
                onChange={() => onSelectSize(size)}
                className='sr-only'
              />
              <span
                className={cn(
                  'flex items-center justify-center min-w-[3rem] h-10 px-3 rounded-md border text-sm font-medium transition-all duration-200',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {size}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { ReProductSizeSection }
