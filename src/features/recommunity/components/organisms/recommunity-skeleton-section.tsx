import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

const ReCommunitySkeletonSection = () => {
  return (
    <div className='space-y-6'>
      {/* Community Header Skeleton */}
      <Card>
        <CardHeader>
          <div className='flex items-start justify-between'>
            <div className='space-y-3 flex-1'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-12 w-12 rounded-full' />
                <div className='space-y-2'>
                  <Skeleton className='h-6 w-48' />
                  <Skeleton className='h-4 w-32' />
                </div>
              </div>
              <Skeleton className='h-4 w-full max-w-md' />
            </div>
            <Skeleton className='h-10 w-32' />
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-32' />
            <Skeleton className='h-6 w-28' />
          </div>
        </CardContent>
      </Card>

    </div>
  )
}

export { ReCommunitySkeletonSection }
