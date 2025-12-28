import { Card } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

export const ProductDetailSkeleton = () => {
  return (
    <div className='w-full space-y-6'>
      <div className='hidden lg:flex items-center gap-2'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-24' />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='space-y-4'>
          <Skeleton className='w-full h-[25rem] rounded-lg' />
          <div className='flex gap-3'>
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
          </div>
        </div>

        <div className='space-y-6'>
          <Skeleton className='h-6 w-24 rounded-full' />

          <div className='space-y-2'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-3/4' />
          </div>

          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-24' />
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-1 w-1 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-6 w-24' />
          </div>

          <div className='space-y-4'>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-16' />
              <div className='flex gap-2'>
                <Skeleton className='h-10 w-20' />
                <Skeleton className='h-10 w-20' />
                <Skeleton className='h-10 w-20' />
              </div>
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-5 w-16' />
              <div className='flex gap-2'>
                <Skeleton className='h-10 w-16' />
                <Skeleton className='h-10 w-16' />
                <Skeleton className='h-10 w-16' />
              </div>
            </div>
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-5 w-20' />
            <Skeleton className='h-10 w-32' />
          </div>

          <Skeleton className='h-5 w-32' />

          <div className='flex gap-3'>
            <Skeleton className='h-12 flex-1' />
            <Skeleton className='h-12 w-12' />
          </div>

          <div className='space-y-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-4/5' />
          </div>
        </div>
      </div>

      <Card className='p-6'>
        <Skeleton className='h-6 w-48 mb-6' />
        <div className='space-y-6'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='space-y-3 pb-6 border-b last:border-b-0'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-10 w-10 rounded-full' />
                <div className='flex-1 space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-24' />
                </div>
              </div>
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-4/5' />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
