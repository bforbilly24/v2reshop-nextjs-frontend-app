'use client'

import { useState } from 'react'
import { Minus, Plus, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/utils/format-price'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'
import { Separator } from '@/components/atoms/separator'
import Wrapper from '@/components/atoms/wrapper'
import { Empty } from '@/components/atoms/empty'
import { Stepper } from '@/components/atoms/stepper'
import { useCart } from '@/features/shopping-cart/context/cart-context'
import { useCartFeedback } from '@/features/shopping-cart/context/cart-feedback-context'

const ShoppingCartSection: React.FC = () => {
  const { cartItems, updateQuantity, removeItem } = useCart()
  const { showSuccess } = useCartFeedback()
  const [voucherCode, setVoucherCode] = useState('')

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const savings = 0
  const storePickup = 99
  const tax = 199
  const total = subtotal + storePickup + tax - savings

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(id, newQuantity)
      const item = cartItems.find((item) => item.id === id)
      if (item) {
        showSuccess({ ...item, quantity: newQuantity })
      }
    }
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id)
    showSuccess(`Removed ${name} from your cart`)
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
          {cartItems.length === 0 ? (
            <Empty />
          ) : (
            <div className='space-y-4'>
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                >
                  <CardContent className='p-4 flex justify-between gap-4'>
                    <div className='w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0'>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={48}
                        height={36}
                        className='object-cover rounded'
                      />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1'>
                        {item.name}
                      </h3>
                      <p className='text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-2'>
                        {item.description}
                      </p>
                      <div className='flex gap-2 mb-2 text-xs text-gray-500 dark:text-gray-400'>
                        {item.color && (
                          <span>
                            <span className='font-medium'>Color:</span>{' '}
                            {item.color}
                          </span>
                        )}
                        {item.size && (
                          <span>
                            <span className='font-medium'>Size:</span>{' '}
                            {item.size}
                          </span>
                        )}
                      </div>
                      <div className='flex items-center gap-2 mb-2'>
                        <Button
                          size='icon'
                          variant='outline'
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
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
                          className='h-8 w-8 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                        >
                          <Plus className='h-4 w-4' />
                        </Button>
                        <span className='text-sm font-semibold text-gray-900 dark:text-white ml-auto'>
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <div className='flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2'>
                        <Truck className='h-4 w-4' />
                        <span>Delivery on {item.deliveryDate}</span>
                      </div>
                      <div className='flex items-center gap-4 text-xs'>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-emerald-600 dark:text-emerald-400'
                        >
                          Move to Favorites
                        </Button>
                        <Button
                          variant='link'
                          className='p-0 h-auto text-red-600 dark:text-red-400'
                          onClick={() => handleRemoveItem(item.id, item.name)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                  <span>Savings</span>
                  <span className='text-green-600 dark:text-green-400'>
                    {formatPrice(savings)}
                  </span>
                </div>
                <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                  <span>Store Pickup</span>
                  <span>{formatPrice(storePickup)}</span>
                </div>
                <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <Separator className='bg-gray-200 dark:bg-gray-700' />
                <div className='flex justify-between font-semibold text-gray-900 dark:text-white'>
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
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

              <div className='text-center text-xs text-gray-500 dark:text-gray-400'>
                One or more items require an account.{' '}
                <Link
                  href='/auth/signin'
                  className='text-emerald-600 dark:text-emerald-400 hover:underline'
                >
                  Sign in
                </Link>{' '}
                or{' '}
                <Link
                  href='/auth/signup'
                  className='text-emerald-600 dark:text-emerald-400 hover:underline'
                >
                  create an account
                </Link>
                .
              </div>
              <div className='space-y-2'>
                <p className='text-sm font-medium text-gray-900 dark:text-white'>
                  Voucher or Gift Card
                </p>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Enter code'
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className='bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white'
                  />
                  <Button
                    variant='outline'
                    className='border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300'
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Wrapper>
  )
}

export { ShoppingCartSection }
