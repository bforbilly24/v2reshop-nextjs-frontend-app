'use client'

import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'

interface ReProductCartSectionProps {
  quantity: number
  setQuantity: (quantity: number) => void
  onAddToCart: () => void
  stock: number
  isLoading?: boolean
}

const ReProductCartSection: React.FC<ReProductCartSectionProps> = ({
  quantity,
  setQuantity,
  onAddToCart,
  stock,
  isLoading = false,
}) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= stock) {
      setQuantity(value)
    }
  }

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col sm:flex-row gap-4 w-full'>
        <div className='flex items-center border border-gray-200 dark:border-gray-700 rounded-lg w-full sm:w-fit justify-between sm:justify-start h-12 sm:h-10'>
          <Button
            variant='ghost'
            size='icon'
            className='h-12 w-12 sm:h-10 sm:w-10 rounded-none'
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Icon icon='ph:minus' className='w-4 h-4' />
          </Button>
          <Input
            type='number'
            min={1}
            max={stock}
            value={quantity}
            onChange={handleInputChange}
            className='h-12 sm:h-10 w-full sm:w-16 border-none text-center focus-visible:ring-0 rounded-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          />
          <Button
            variant='ghost'
            size='icon'
            className='h-12 w-12 sm:h-10 sm:w-10 rounded-none'
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= stock}
          >
            <Icon icon='ph:plus' className='w-4 h-4' />
          </Button>
        </div>

        <Button
          size='lg'
          className='flex-1 gap-2 w-full min-h-[48px] sm:min-h-[40px]'
          onClick={onAddToCart}
          disabled={stock === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <Icon icon='ph:spinner' className='w-5 h-5 animate-spin' />
              Adding...
            </>
          ) : (
            <>
              <Icon icon='ph:shopping-cart' className='w-5 h-5' />
              {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </Button>
      </div>
      {quantity >= stock && stock > 0 && (
        <p className='text-sm text-red-500 font-medium animate-in fade-in slide-in-from-top-1'>
          Max stock reached ({stock} items available)
        </p>
      )}
    </div>
  )
}

export { ReProductCartSection }
