'use client'

import React, { useState } from 'react'
import { ProductItem } from '@/constant'

interface ReProductSizeFilterProps {
  product: ProductItem
  size?: string
  onChange?: (size: string) => void
}

const ReProductSizeFilter: React.FC<ReProductSizeFilterProps> = ({
  product,
  size,
  onChange,
}) => {
  const availableSizes =
    product.sizes && product.sizes.length > 0 ? product.sizes : ['S']
  const [selectedSize, setSelectedSize] = useState(size || availableSizes[0])
  const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']

  const sortedSizes = availableSizes.sort((a, b) => {
    const indexA = sizeOrder.indexOf(a)
    const indexB = sizeOrder.indexOf(b)
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1
    return a.localeCompare(b)
  })

  const handleSizeChange = (newSize: string) => {
    setSelectedSize(newSize)
    onChange?.(newSize)
  }

  return (
    <div className='mb-4'>
      <div className='pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3'>
        <p className='font-normal text-sm lg:text-base text-muted-foreground'>
          Size:
        </p>
        <p className='font-medium text-base text-foreground'>{selectedSize}</p>
      </div>
      <div className='flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6'>
        {sortedSizes.map((size, index) => {
          const isSelected = size === selectedSize
          return (
            <label key={index}>
              <input
                type='radio'
                name='size'
                value={size}
                checked={isSelected}
                onChange={() => handleSizeChange(size)}
                className='hidden h-7 w-7'
              />
              <div
                className={`h-7 w-7 ${
                  isSelected ? 'ring-emerald-500' : 'ring-gray-300'
                } ring-1 ring-offset-2 flex justify-center items-center ring-offset-gray-50 cursor-pointer rounded-sm text-xs font-medium text-foreground bg-gray-100 hover:bg-gray-200 transition-colors duration-200`}
                title={`Select size ${size}`}
              >
                {size}
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { ReProductSizeFilter }
