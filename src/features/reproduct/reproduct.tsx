'use client'

import { useState, useMemo } from 'react'
import { products } from '@/components/layouts/product/data/product'
import { ProductBox } from '@/components/layouts/product/product-box'
import { ProductList } from '@/components/layouts/product/product-list'
import { ProductPagination } from '@/components/layouts/product/product-pagination'
import { ProductWrapper } from '@/components/layouts/product/product-wrapper'

const ITEMS_PER_PAGE = 15

const ReProduct = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => Number(b.rating) - Number(a.rating))
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
    <section id='reproduct' className='w-full pt-36'>
      <div className='container mx-auto'>
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
      </div>
    </section>
  )
}

export { ReProduct }
