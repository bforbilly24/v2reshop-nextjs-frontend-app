'use client'

import { formatPrice } from '@/utils/format-price'
import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Icon } from '@/components/atoms/icon'

interface ReProductCartActionsProps {
  product: {
    price: string
  }
  quantity: number
  setQuantity: (quantity: number) => void
}

const ReProductCartActions: React.FC<ReProductCartActionsProps> = ({
  product,
  quantity,
  setQuantity,
}) => {
  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, change <= 10 ? quantity + change : 10))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const parsedValue = parseInt(value, 10)
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 10) {
      setQuantity(parsedValue)
    } else if (value === '') {
      setQuantity(1)
    }
  }

  const priceAsNumber = parseFloat(product.price.replace(/\./g, ''))
  const totalPrice = priceAsNumber * quantity

  return (
    <>
      <tr className='space-x-1 rtl:space-x-reverse'>
        <td className='py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-muted-foreground'>
          Quantity:
        </td>
        <td className='py-2'>
          <div className='flex items-center bg-gray-100 rounded-md overflow-hidden w-fit'>
            <Button
              variant='outline'
              size='sm'
              className='size-8 p-0 hover:bg-gray-200'
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Icon icon='ph:minus' className='w-4 h-4 text-gray-500' />
            </Button>
            <Input
              type='number'
              value={quantity}
              onChange={handleInputChange}
              className='focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-8 w-20 text-center border-y font-medium text-foreground text-sm'
              min='1'
              max='10'
            />
            <Button
              variant='outline'
              size='sm'
              className='size-8 p-0 hover:bg-gray-200'
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 10}
            >
              <Icon icon='ph:plus' className='w-4 h-4 text-gray-500' />
            </Button>
          </div>
        </td>
      </tr>
      <tr className='space-x-1 rtl:space-x-reverse'>
        <td className='py-2 pl-0 rtl:pr-0 font-normal text-sm lg:text-base text-gray-500'>
          Total Price:
        </td>
        <td className='py-2 text-foreground font-semibold text-base lg:text-xl'>
          {formatPrice(totalPrice)}
        </td>
      </tr>
    </>
  )
}

export { ReProductCartActions }
