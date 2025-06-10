'use client'

import { useMemo, useEffect } from 'react'
import { faker } from '@faker-js/faker'
import Link from 'next/link'
import { Button } from '@/components/ui/shadcn/button'
import { Card } from '@/components/ui/shadcn/card'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'
import { Stepper } from '@/components/ui/stepper'
import { useCart } from '@/features/shopping-cart/context/cart-context'

const CheckoutSection: React.FC = () => {
  const { clearCart } = useCart()

  const steps = [
    { id: 'cart', label: 'Cart' },
    { id: 'checkout', label: 'Checkout' },
  ]

  const orderId = useMemo(() => {
    return faker.string.alphanumeric({ length: 7, casing: 'upper' })
  }, [])

  const whatsappTrackingUrl = `https://wa.me/+1234567890?text=Track%20order%20%23${orderId}`

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <Wrapper className='py-20 lg:py-32'>
      <Stepper steps={steps} activeStep='checkout' />
      <div className='mx-auto max-w-2xl flex flex-col items-center justify-center gap-y-4'>
        <div className='flex flex-row items-center justify-start w-full'>
          <Icon
            icon='heroicons:check-circle-solid'
            className='size-20 text-emerald-500'
          />
          <h2 className='text-xl font-semibold text-foreground sm:text-4xl mb-2 w-full'>
            Thanks for your order!
          </h2>
        </div>
        <p className='text-muted-foreground items-center w-full'>
          Your order{' '}
          <Link
            href={whatsappTrackingUrl}
            className='font-medium text-emerald-500 hover:underline'
          >
            #{orderId}
          </Link>{' '}
          will be processed within 24 hours during working days. We will notify
          you by email once your order has been shipped.
        </p>
        <div className='flex items-center space-x-4 w-full'>
          <Button
            asChild
            className='bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg text-sm px-4 py-2 focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800'
          >
            <Link href={whatsappTrackingUrl}>Track your order</Link>
          </Button>
          <Button
            asChild
            variant='outline'
            className='text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-emerald-700 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700 text-sm font-medium px-4 py-2'
          >
            <Link href='/reproduct'>Return to shopping</Link>
          </Button>
        </div>
        <Card className='space-y-4 sm:space-y-2 border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 w-full p-6'>
          <dl className='sm:flex items-center justify-between gap-4'>
            <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
              Date
            </dt>
            <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
              {new Date().toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </dd>
          </dl>
          <dl className='sm:flex items-center justify-between gap-4'>
            <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
              Payment Method
            </dt>
            <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
              JPMorgan monthly installments
            </dd>
          </dl>
          <dl className='sm:flex items-center justify-between gap-4'>
            <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
              Name
            </dt>
            <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
              Flowbite Studios LLC
            </dd>
          </dl>
          <dl className='sm:flex items-center justify-between gap-4'>
            <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
              Address
            </dt>
            <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
              34 Scott Street, San Francisco, California, USA
            </dd>
          </dl>
          <dl className='sm:flex items-center justify-between gap-4'>
            <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
              Phone
            </dt>
            <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
              +(123) 456 7890
            </dd>
          </dl>
        </Card>
        <div className='text-muted-foreground w-full'>
          Need anything in the meantime? You can reach us at
          <Link href='mailto:support@reshopid.com' target='_blank'>
            <span className='text-blue-600 hover:underline'>
              {' '}
              support@reshopid.com
            </span>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

export { CheckoutSection }
