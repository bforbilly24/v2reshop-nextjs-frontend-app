'use client'

import React, { useState } from 'react'
import { ProductItem } from '@/constant'

interface ReProductColorFilterProps {
  product: ProductItem
  color?: string
  onChange?: (color: string) => void
}

const ReProductColorFilter: React.FC<ReProductColorFilterProps> = ({
  product,
  color,
  onChange,
}) => {
  const parseColors = (colors: string[]): string[] => {
    if (!colors || colors.length === 0) return ['Black']
    return colors.flatMap((c) =>
      c.includes(',') ? c.split(',').map((col) => col.trim()) : [c.trim()]
    )
  }

  const availableColors = parseColors(product.colors)
  const [selectedColor, setSelectedColor] = useState(
    color || availableColors[0]
  )

  const getColorValue = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      Black: '#000000',
      White: '#FFFFFF',
      Red: '#EF4444',
      Blue: '#3B82F6',
      Green: '#10B981',
      Yellow: '#F59E0B',
      Pink: '#EC4899',
      Gray: '#6B7280',
      Grey: '#6B7280',
      Orange: '#F97316',
      Purple: '#8B5CF6',
      Brown: '#A16207',
    }
    return colorMap[colorName] || colorName.toLowerCase()
  }

  const handleColorChange = (newColor: string) => {
    setSelectedColor(newColor)
    onChange?.(newColor)
  }

  return (
    <div className='mb-4'>
      <div className='pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3'>
        <p className='font-normal text-sm lg:text-base text-muted-foreground'>
          Color:
        </p>
        <p className='font-medium text-sm lg:text-base text-foreground capitalize'>
          {selectedColor}
        </p>
      </div>
      <div className='flex space-x-4 rtl:space-x-reverse h-6'>
        {availableColors.map((color, index) => {
          const colorValue = getColorValue(color)
          const isSelected = color === selectedColor
          return (
            <label key={index}>
              <input
                type='radio'
                name='color'
                value={color}
                checked={isSelected}
                onChange={() => handleColorChange(color)}
                className='hidden'
              />
              <div
                style={{ backgroundColor: colorValue }}
                className={`h-7 w-7 ${
                  isSelected ? 'ring-emerald-500' : 'ring-gray-300'
                } ring-1 ring-offset-2 ring-offset-gray-50 cursor-pointer rounded-sm ${
                  color.toLowerCase() === 'white'
                    ? 'border border-gray-200'
                    : ''
                }`}
                title={`Select ${color}`}
              />
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { ReProductColorFilter }
