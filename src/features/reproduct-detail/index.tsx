'use client'

import { ProductItem } from '@/constant'
import { ReProductDetailSection } from './components/reproduct-detail-section'

interface ReProductDetailProps {
  product: ProductItem
}

const ReProductDetail: React.FC<ReProductDetailProps> = ({ product }) => {
  return (
    <>
      <div className='w-full'>
        <ReProductDetailSection product={product} />
      </div>
    </>
  )
}

export { ReProductDetail }
