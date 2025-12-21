import { Card, CardContent, CardHeader } from '@/components/atoms/card'
import { Skeleton } from '@/components/atoms/skeleton'

export const ProductDetailSkeleton = () => {
  return (
    <div className='w-full space-y-6'>
      {/* Breadcrumb Skeleton */}
      <div className='hidden lg:flex items-center gap-2'>
        <Skeleton className='h-4 w-12' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-24' />
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        {/* Image Gallery Skeleton */}
        <div className='space-y-4'>
          <Skeleton className='w-full h-[25rem] rounded-lg' />
          <div className='flex gap-3'>
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
            <Skeleton className='h-20 w-20 rounded-lg' />
          </div>
        </div>

        {/* Product Info Skeleton */}
        <div className='space-y-6'>
          {/* Category & Title */}
          <div className='space-y-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-8 w-3/4' />
          </div>

          {/* Rating */}
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-24' />
            <Skeleton className='h-4 w-16' />
            <Skeleton className='h-1 w-1 rounded-full' />
            <Skeleton className='h-4 w-16' />
          </div>

          {/* Price */}
          <div className='flex items-center gap-3'>
            <Skeleton className='h-8 w-32' />
            <Skeleton className='h-6 w-24' />
            <Skeleton className='h-6 w-20' />
          </div>

          {/* Description */}
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>

          {/* Color Section */}
          <div className='space-y-3'>
            <Skeleton className='h-5 w-20' />
            <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-8 w-8 rounded-full' />
              <Skeleton className='h-8 w-8 rounded-full' />
            </div>
          </div>

          {/* Size Section */}
          <div className='space-y-3'>
            <Skeleton className='h-5 w-16' />
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-16 rounded-md' />
              <Skeleton className='h-10 w-16 rounded-md' />
              <Skeleton className='h-10 w-16 rounded-md' />
              <Skeleton className='h-10 w-16 rounded-md' />
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className='flex flex-col sm:flex-row gap-4'>
            <Skeleton className='h-10 w-full sm:w-32' />
            <Skeleton className='h-10 flex-1' />
          </div>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <Skeleton className='h-6 w-32' />
            </CardHeader>
            <CardContent className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-40' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-36' />
              </div>
              <div className='flex items-center gap-2'>
                <Skeleton className='h-5 w-5' />
                <Skeleton className='h-4 w-44' />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Reviews Section */}
      <Card className='p-6'>
        <Skeleton className='h-6 w-48 mb-6' />
        <div className='space-y-6'>
          <div className='bg-accent p-6 rounded flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <Skeleton className='h-8 w-16' />
              <Skeleton className='h-5 w-32' />
            </div>
            <Skeleton className='h-10 w-32' />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className='flex gap-3'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <div className='flex-1 space-y-2'>
                <Skeleton className='h-5 w-32' />
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-40' />
                <Skeleton className='h-16 w-full' />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
