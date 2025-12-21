'use client'

import { Button } from '@/components/atoms/button'
import { EmptyCartIcon } from '@/components/icons/empty-cart-icon'

interface EmptyProps {
  Title?: string
  Desc?: string
  ButtonText?: string
  onClick?: () => void
}

const Empty: React.FC<EmptyProps> = ({
  Title = "There's nothing here",
  Desc = 'Try exploring our products to find something you love',
  ButtonText = 'Browse Products',
  onClick = () => console.log('Button clicked'),
}) => {
  return (
    <div className='grid gap-4 w-60 mx-auto flex-flex-col items-center justify-center text-center'>
      <EmptyCartIcon className='mx-auto' />
      <h2 className='text-base font-semibold text-foreground mb-1'>
        {Title}
      </h2>
      <p className='text-sm font-normal text-foreground mb-4'>
        {Desc}
      </p>
      <Button
        variant={'default'}
        size={'lg'}
        onClick={onClick}
        className='w-full'
      >
        {ButtonText}
      </Button>
    </div>
  )
}

export { Empty }
