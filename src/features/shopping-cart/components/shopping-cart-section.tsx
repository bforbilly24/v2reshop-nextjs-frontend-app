'use client'

import { Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format-price'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import { Empty } from '@/components/atoms/empty'
import { Separator } from '@/components/atoms/separator'
import { Stepper } from '@/components/atoms/stepper'
import Wrapper from '@/components/atoms/wrapper'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import { ShoppingCartSkeleton } from './atoms/shopping-cart-skeleton'

const ShoppingCartSection: React.FC = () => {
  const {
    cartItems,
    subtotal,
    updateQuantity,
    removeItem,
    initialLoading,
    updatingItemIds,
  } = useCart()

  const handleUpdateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      await updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = async (id: number) => {
    await removeItem(id)
  }

  const steps = [
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout' },
  ]

  return (
    <Wrapper className='py-20 lg:py-32'>
      <Stepper steps={steps} activeStep='cart' />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <h1 className='text-xl font-semibold text-gray-900 dark:text-white mb-6'>
            Your Cart
          </h1>
          {initialLoading ? (
            <ShoppingCartSkeleton />
          ) : cartItems.length === 0 ? (
            <Empty />
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item) => {
                const availableStock = item.variant
                  ? item.variant.stock
                  : (item.product.stock ?? 0)
                const isMaxStock = item.quantity >= availableStock

                return (
                  <Card
                    key={item.id}
                    className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                  >
                    <CardContent className='p-4 flex justify-between gap-4'>
                      <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0'>
                        <Image
                          src={item.product.image[0] || '/placeholder.png'}
                          alt={item.product.name}
                          width={48}
                          height={36}
                          className='object-cover rounded'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1'>
                          {item.product.name}
                        </h3>
                        <p className='text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2'>
                          {item.product.description}
                        </p>
                        {item.variant && (
                          <div className='flex gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400'>
                            <span>
                              <span className='font-medium'>
                                {item.variant.type}:
                              </span>{' '}
                              {item.variant.value}
                            </span>
                          </div>
                        )}
                        <div className='flex items-center gap-2 mb-2'>
                          <Button
                            size='icon'
                            variant='outline'
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={
                              item.quantity <= 1 || updatingItemIds.has(item.id)
                            }
                            className='h-8 w-8 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          >
                            <Minus className='h-4 w-4' />
                          </Button>
                          <span className='text-sm text-gray-900 dark:text-white w-8 text-center'>
                            {item.quantity}
                          </span>
                          <Button
                            size='icon'
                            variant='outline'
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={
                              updatingItemIds.has(item.id) || isMaxStock
                            }
                            className='h-8 w-8 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          >
                            <Plus className='h-4 w-4' />
                          </Button>
                          <span className='text-sm font-semibold text-gray-900 dark:text-white ml-auto'>
                            {formatPrice(item.total_price)}
                          </span>
                        </div>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-red-600 dark:text-red-400 text-xs'
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={updatingItemIds.has(item.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>

        <div className='lg:col-span-1'>
          <Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-6'>
            <CardContent className='p-4 space-y-4'>
              <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Order Summary
              </h2>
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <Separator className='bg-gray-200 dark:bg-gray-700' />
                <div className='flex justify-between font-semibold text-gray-900 dark:text-white'>
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <Button
                  className='w-full bg-gray-400 cursor-not-allowed text-white'
                  disabled
                >
                  Proceed to Checkout
                </Button>
              ) : (
                <Button
                  className='w-full bg-emerald-500 hover:bg-emerald-600 text-white'
                  asChild
                >
                  <Link href='/checkout'>Proceed to Checkout</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  )
}

export { ShoppingCartSection }
