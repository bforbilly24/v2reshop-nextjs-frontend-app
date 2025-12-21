import { Card, CardContent, CardFooter, CardHeader } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

export const ProductBoxSkeleton = () => {
  return (
    <Card className='gap-4 rounded-md shadow-none border h-full flex flex-col overflow-hidden'>
      <CardHeader className='p-0'>
        <div className='bg-gray-100 dark:bg-gray-800 relative lg:h-64 md:h-64 h-52 flex flex-col justify-center items-center rounded-lg'>
          <Skeleton className='h-[146px] w-[235px]' />
        </div>
      </CardHeader>
      <div className='flex flex-col gap-y-0 items-center justify-center w-full'>
        <CardContent className='flex flex-col flex-1 w-full lg:p-3 md:p-3 p-1.5 pt-0'>
          <div className='flex items-center justify-between mb-2'>
            <Skeleton className='h-4 w-20' />
          </div>

          <div className='flex flex-col space-y-1 mb-2 lg:h-20 md:h-20 h-14'>
            <Skeleton className='h-6 w-full' />
            <Skeleton className='h-4 w-4/5 lg:flex md:flex hidden' />
          </div>

          <div className='flex items-center gap-2 mb-2 flex-wrap'>
            <Skeleton className='h-7 w-24' />
            <Skeleton className='h-5 w-16' />
          </div>
        </CardContent>

        <CardFooter className='p-3 pt-0 w-full'>
          <div className='flex items-center justify-between w-full'>
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-1 w-1 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>
        </CardFooter>
      </div>
    </Card>
  )
}
