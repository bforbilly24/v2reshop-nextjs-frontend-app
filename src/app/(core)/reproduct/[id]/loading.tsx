import { ProductDetailSkeleton } from '@/components/atoms/product-detail-skeleton'
import Wrapper from '@/components/atoms/wrapper'

export default function Loading() {
  return (
    <section className='w-full relative'>
      <Wrapper className='py-8 lg:py-28'>
        <ProductDetailSkeleton />
      </Wrapper>
    </section>
  )
}
