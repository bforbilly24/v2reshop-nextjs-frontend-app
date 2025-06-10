'use client'

import React from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Truck } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/utils/format-price'
import { Button } from '@/components/ui/shadcn/button'
import { Card, CardContent } from '@/components/ui/shadcn/card'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/shadcn/drawer'
import { Separator } from '@/components/ui/shadcn/separator'
import { useCart } from '@/features/shopping-cart/context/cart-context'

interface ShoppingCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToCart: () => void
}

const ShoppingCartDrawer: React.FC<ShoppingCartDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToCart,
}) => {
  const { cartItems, updateQuantity, removeItem } = useCart()

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const storePickup = 99
  const tax = 199
  const total = subtotal + storePickup + tax

  return (
    <AnimatePresence>
      {isOpen && (
        <Drawer open={isOpen} onOpenChange={onClose} direction='right'>
          <DrawerContent className='h-full max-w-md ml-auto bg-white dark:bg-gray-900'>
            <DrawerHeader className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700'>
              <DrawerTitle className='text-lg font-semibold text-gray-900 dark:text-white'>
                My Shopping Cart
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='hover:bg-gray-100 dark:hover:bg-gray-800'
                >
                  <X className='h-5 w-5 text-gray-600 dark:text-gray-300' />
                </Button>
              </DrawerClose>
            </DrawerHeader>
            <ScrollArea.Root className='h-[calc(100vh-34rem)] w-full'>
              <ScrollArea.Viewport className='h-full w-full'>
                <div className='p-4'>
                  <Card className='bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 mb-4 sticky top-0'>
                    <CardContent className='p-4 text-sm text-gray-600 dark:text-gray-300'>
                      <p>
                        Get{' '}
                        <span className='font-medium text-emerald-600 dark:text-emerald-400'>
                          free shipping
                        </span>{' '}
                        by adding products worth{' '}
                        <span className='font-medium'>Rp600</span>.
                      </p>
                      <Button
                        variant='link'
                        className='p-0 h-auto text-emerald-600 dark:text-emerald-400 text-sm mt-1'
                      >
                        How can I get this? →
                      </Button>
                    </CardContent>
                  </Card>
                  <div className='flex-1 space-y-4'>
                    {cartItems.length === 0 ? (
                      <p className='text-center text-gray-500 dark:text-gray-400'>
                        Your cart is empty
                      </p>
                    ) : (
                      cartItems.map((item) => (
                        <Card
                          key={item.id}
                          className='border-gray-200 dark:border-gray-700'
                        >
                          <CardContent className='p-4 flex gap-4'>
                            <div className='w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0'>
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
                                <span>
                                  <span className='font-medium'>Color:</span>{' '}
                                  {item.color}
                                </span>
                                <span>
                                  <span className='font-medium'>Size:</span>{' '}
                                  {item.size}
                                </span>
                              </div>
                              <div className='flex items-center gap-2 mb-2'>
                                <Button
                                  size='icon'
                                  variant='outline'
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  disabled={item.quantity <= 1}
                                  className='h-8 w-8 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className='h-8 w-8 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
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
                                  onClick={() => removeItem(item.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              </ScrollArea.Viewport>
              <ScrollArea.Scrollbar
                orientation='vertical'
                className='flex w-2.5 touch-none select-none bg-gray-200 dark:bg-gray-700'
              >
                <ScrollArea.Thumb className='relative flex-1 bg-gray-400 dark:bg-gray-500 rounded-full' />
              </ScrollArea.Scrollbar>
              <Separator className='my-4 bg-gray-200 dark:bg-gray-700' />
              <div className='p-4'>
                <Button
                  variant='link'
                  className='p-0 h-auto text-emerald-600 dark:text-emerald-400 text-sm'
                >
                  Add coupon code
                </Button>
              </div>
              <Card className='border-gray-200 dark:border-gray-700 m-4'>
                <CardContent className='p-4 space-y-2 text-sm'>
                  <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                    <span>Savings</span>
                    <span className='text-green-600 dark:text-green-400'>
                      Rp0
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
                  <Separator className='my-2 bg-gray-200 dark:bg-gray-700' />
                  <div className='flex justify-between font-semibold text-gray-900 dark:text-white'>
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </CardContent>
              </Card>
              <div className='p-4 space-y-2'>
                <Button
                  className='w-full bg-emerald-600 hover:bg-emerald-700 text-white'
                  onClick={onNavigateToCart}
                >
                  View Details
                </Button>
                {/* <Button
                  variant='outline'
                  className='w-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={onNavigateToCart}
                >
                  View Details
                </Button> */}
                <Button
                  variant='secondary'
                  className='w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </ScrollArea.Root>
          </DrawerContent>
        </Drawer>
      )}
    </AnimatePresence>
  )
}

export { ShoppingCartDrawer }
