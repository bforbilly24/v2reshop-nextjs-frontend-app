import { Card } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

export const ShoppingCartSkeleton = () => {
  return (
    <div className='space-y-4'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card
          key={i}
          className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
        >
          <div className='p-4 flex gap-4'>
            {/* Image */}
            <Skeleton className='h-24 w-24 rounded-lg flex-shrink-0' />

            {/* Content */}
            <div className='flex-1 space-y-3'>
              <div className='space-y-2'>
                <Skeleton className='h-5 w-3/4' />
                <Skeleton className='h-4 w-1/2' />
              </div>

              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-24' />
                <Skeleton className='h-10 w-28' />
              </div>
            </div>

            {/* Remove button */}
            <Skeleton className='h-8 w-8 rounded' />
          </div>
        </Card>
      ))}
    </div>
  )
}
