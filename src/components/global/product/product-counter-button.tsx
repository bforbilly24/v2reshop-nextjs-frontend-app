'use client'

import React from 'react'
import { Button } from '@/components/ui/shadcn/button'
import { Icon } from '@/components/ui/icon'

const ProductCounterButton = () => {
  const [count, setCount] = React.useState<number>(1)
  const [show, setShow] = React.useState<boolean>(false)

  const handleIncreaseQuantity = () => {
    if (count < 10) {
      setCount(count + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return (
    <>
      {!show && (
        <Button
          variant='outline'
          size='lg'
          onClick={() => setShow(true)}
          className='w-full'
        >
          <Icon
            icon='heroicons:shopping-cart'
            className='w-4 h-4 me-2 text-sm leading-none'
          />
          Add to Cart
        </Button>
      )}
      {show && (
        <div className='flex gap-4 items-center '>
          <div className='flex-1 h-8 flex border border-1 border-default-900 delay-150 ease-in-out dark:border-default-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-default-900 dark:divide-default-600 rounded'>
            <Button
              onClick={handleDecreaseQuantity}
              variant={'outline'}
              disabled={count <= 1}
              size={'icon'}
              className='dark:text-white text-default-900 hover:bg-default-900 hover:text-white dark:hover:bg-default-700 disabled:cursor-not-allowed disabled:opacity-50 '
            >
              <Icon icon='eva:minus-fill' />
            </Button>

            <div className='flex-1 w-[62px] text-center flex items-center justify-center'>
              {count}
            </div>

            <Button
              onClick={handleIncreaseQuantity}
              type='button'
              variant={'outline'}
              disabled={count >= 10}
              size={'icon'}
              className='flex-none px-2 disabled:cursor-not-allowed disabled:opacity-50 text-default-900 hover:bg-default-900 hover:text-white dark:text-white dark:hover:bg-default-700 rtl:dark:hover:rounded-l ltr:dark:hover:rounded-r'
            >
              <Icon icon='eva:plus-fill' />
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export { ProductCounterButton }
