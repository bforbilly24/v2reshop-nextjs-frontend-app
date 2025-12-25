'use client'

import React, { useState, useEffect, useRef } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { formatPrice } from '@/utils/format-price'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/atoms/drawer'
import { Separator } from '@/components/atoms/separator'
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
  const { cartItems, subtotal, updateQuantity, removeItem } = useCart()
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const scrollViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const viewport = scrollViewportRef.current
    if (!viewport) return

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = viewport
      setShowScrollIndicator(
        scrollHeight > clientHeight &&
          scrollTop < scrollHeight - clientHeight - 10
      )
    }

    checkScroll()
    viewport.addEventListener('scroll', checkScroll)

    const resizeObserver = new ResizeObserver(checkScroll)
    resizeObserver.observe(viewport)

    return () => {
      viewport.removeEventListener('scroll', checkScroll)
      resizeObserver.disconnect()
    }
  }, [cartItems])

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

            {/* Scrollable Content Area with Visual Indicators */}
            <div className='relative flex-1 overflow-hidden'>
              {/* Top Fade Indicator */}
              <div className='absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-gray-900 to-transparent z-10 pointer-events-none' />

              <ScrollArea.Root className='h-full w-full'>
                <ScrollArea.Viewport
                  ref={scrollViewportRef}
                  className='h-full w-full'
                >
                  <div className='p-4 pb-8'>
                    <Card className='bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 mb-4'>
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
                        <p className='text-center text-gray-500 dark:text-gray-400 py-8'>
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
                                  src={
                                    item.product.image[0] || '/placeholder.png'
                                  }
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
                                    {formatPrice(item.total_price)}
                                  </span>
                                </div>
                                <Button
                                  variant='link'
                                  className='p-0 h-auto text-red-600 dark:text-red-400 text-xs'
                                  onClick={() => removeItem(item.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </div>
                </ScrollArea.Viewport>

                {/* Enhanced Scrollbar - More Visible */}
                <ScrollArea.Scrollbar
                  orientation='vertical'
                  className='flex w-3 touch-none select-none bg-gray-300/50 dark:bg-gray-600/50 rounded-full m-1 transition-opacity hover:opacity-100'
                >
                  <ScrollArea.Thumb className='relative flex-1 bg-emerald-500 dark:bg-emerald-400 rounded-full hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors' />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

              {/* Bottom Scroll Indicator */}
              {showScrollIndicator && (
                <div className='absolute bottom-[28rem] left-0 right-0 pointer-events-none z-20'>
                  <div className='flex flex-col items-center animate-bounce'>
                    <div className='bg-emerald-500 dark:bg-emerald-400 text-white dark:text-gray-900 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1'>
                      <span>Scroll for more items</span>
                      <ChevronDown className='h-3 w-3' />
                    </div>
                  </div>
                  {/* Fade overlay at bottom of scroll area */}
                  <div className='h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent' />
                </div>
              )}
            </div>

            {/* Fixed Bottom Section - Summary & Actions */}
            <div className='border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'>
              <Separator className='bg-gray-200 dark:bg-gray-700' />
              <Card className='border-gray-200 dark:border-gray-700 m-4 shadow-sm'>
                <CardContent className='p-4 space-y-2 text-sm'>
                  <div className='flex justify-between text-gray-600 dark:text-gray-300'>
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <Separator className='my-2 bg-gray-200 dark:bg-gray-700' />
                  <div className='flex justify-between font-semibold text-gray-900 dark:text-white'>
                    <span>Total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                </CardContent>
              </Card>
              <div className='p-4 space-y-2'>
                <Button
                  className='w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                  onClick={onNavigateToCart}
                >
                  View Details
                </Button>
                <Button
                  variant='secondary'
                  className='w-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  onClick={onClose}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </AnimatePresence>
  )
}

export { ShoppingCartDrawer }
