import { ProductBoxSkeleton } from '@/components/atoms/product-box-skeleton'
import Wrapper from '@/components/atoms/wrapper'

export default function Loading() {
  return (
    <section id='reproduct' className='w-full relative'>
      <Wrapper className='py-20 lg:py-32'>
        <div className='grid grid-cols-12 gap-5'>
          {/* Sidebar Skeleton */}
          <div className='lg:col-span-3 col-span-12 hidden lg:block'>
            <div className='sticky top-24 border rounded-lg p-6 space-y-4'>
              <div className='h-10 bg-gray-200 rounded animate-pulse' />
              <div className='space-y-3'>
                <div className='h-4 bg-gray-200 rounded w-20 animate-pulse' />
                <div className='space-y-2'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='h-8 bg-gray-100 rounded animate-pulse' />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className='lg:col-span-9 col-span-12'>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
              {Array.from({ length: 9 }).map((_, index) => (
                <ProductBoxSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </Wrapper>
    </section>
  )
}
