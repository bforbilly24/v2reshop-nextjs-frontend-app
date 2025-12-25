import { Card } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

export const ProductListSkeleton = () => {
  return (
    <Card className='p-3 rounded-md 2xl:flex lg:flex md:flex-none sm:flex-none shadow-none border gap-x-3'>
      <div className='bg-gray-100 dark:bg-gray-800 relative h-[259px] flex flex-col justify-center items-center rounded-lg mb-3 lg:mb-0 ltr:md:mr-0 ltr:sm:mr-0 rtl:md:ml-0 rtl:sm:ml-0 ltr:lg:mr-3 rtl:lg:ml-3'>
        <Skeleton className='h-[235px] w-[266px]' />
      </div>

      <div className='flex flex-col flex-1'>
        <div className='flex items-start justify-center mb-2 flex-col gap-y-2'>
          <Skeleton className='h-4 w-20' />
          <Skeleton className='h-5 w-24' />
        </div>

        <Skeleton className='h-6 w-full mb-2' />
        <Skeleton className='h-4 w-full mb-1' />
        <Skeleton className='h-4 w-4/5 mb-4' />

        <div className='space-x-2 mb-2'>
          <Skeleton className='h-6 w-24 inline-block' />
          <Skeleton className='h-6 w-20 inline-block' />
        </div>

        <div className='flex items-center gap-2 pb-3'>
          <Skeleton className='h-4 w-16' />
          <Skeleton className='h-1 w-1 rounded-full' />
          <Skeleton className='h-4 w-16' />
        </div>
      </div>
    </Card>
  )
}
