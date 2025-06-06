'use client'

import { useState, useMemo } from 'react'
import { ProductBox } from '@/components/global/product/product-box'
import { ProductList } from '@/components/global/product/product-list'
import { ProductPagination } from '@/components/global/product/product-pagination'
import { ProductWrapper } from '@/components/global/product/product-wrapper'
import { PRODUCTS } from '@/constant'
import Wrapper from '@/components/global/wrapper'

const ITEMS_PER_PAGE = 15

const ReProductSection = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const sortedProducts = useMemo(() => {
    return [...PRODUCTS].sort((a, b) => Number(b.rating) - Number(a.rating))
  }, [])

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  const updatedGetEcommerceNav = () => {
    return [
      {
        label: 'grid view',
        icon: 'heroicons:view-columns',
        active: viewMode === 'grid',
        onClick: () => setViewMode('grid'),
      },
      {
        label: 'list view',
        icon: 'heroicons:list-bullet',
        active: viewMode === 'list',
        onClick: () => setViewMode('list'),
      },
    ]
  }

  return (
      <Wrapper className='py-20 lg:py-32'>
        <ProductWrapper getEcommerceNav={updatedGetEcommerceNav}>
          {viewMode === 'grid' ? (
            <div className='grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
              {paginatedProducts.map((product) => (
                <ProductBox key={`grid_key_${product.id}`} product={product} />
              ))}
            </div>
          ) : (
            <div className='space-y-3 grid-cols-1 gap-5 h-max'>
              {paginatedProducts.map((product) => (
                <div key={`list_key_${product.id}`}>
                  <ProductList product={product} />
                </div>
              ))}
            </div>
          )}
          <ProductPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </ProductWrapper>
      </Wrapper>
  )
}

export { ReProductSection }
