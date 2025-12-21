'use client'

import React from 'react'
import { cn } from '@/lib/cn'
import { Icon } from '@/components/atoms/icon'

interface ReProductColorSectionProps {
  colors: string[]
  selectedColor: string
  onSelectColor: (color: string) => void
}

const ReProductColorSection: React.FC<ReProductColorSectionProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
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

  if (colors.length === 0) return null

  return (
    <div className='mb-4'>
      <div className='pb-2 flex items-center space-x-2 rtl:space-x-reverse mb-3'>
        <p className='font-normal text-sm lg:text-base text-muted-foreground'>
          Color:
        </p>
        <p className='font-medium text-base text-foreground'>{selectedColor}</p>
      </div>
      <div className='flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6'>
        {colors.map((color, index) => {
          const isSelected = color === selectedColor
          const colorValue = getColorValue(color)
          
          return (
            <label key={index} className='relative cursor-pointer group'>
              <input
                type='radio'
                name='color-filter'
                value={color}
                checked={isSelected}
                onChange={() => onSelectColor(color)}
                className='sr-only'
              />
              <span
                className={cn(
                  'block w-8 h-8 rounded-full border-2 transition-all duration-200',
                  isSelected
                    ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
                    : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                )}
                style={{ backgroundColor: colorValue }}
                title={color}
              />
              {isSelected && (
                 <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Icon icon="ph:check" className={cn("w-4 h-4", color === 'White' ? 'text-black' : 'text-white')} />
                 </span>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}

export { ReProductColorSection }
