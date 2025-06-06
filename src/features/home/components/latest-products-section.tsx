'use client'

import { useState, useMemo } from 'react'
import { PRODUCTS } from '@/constant'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import { ProductBox } from '@/components/global/product/product-box'
import { ProductList } from '@/components/global/product/product-list'
// import { ProductPagination } from '@/components/global/product/product-pagination'
import { ProductWrapper } from '@/components/global/product/product-wrapper'
import Wrapper from '@/components/global/wrapper'
import SectionBadge from '@/components/ui/section-badge'

const ITEMS_PER_PAGE = 8

const LatestProductsSection = () => {
  const [currentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const sortedProducts = useMemo(() => {
    return PRODUCTS.slice()
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice(0, 8)
  }, [])

  //   const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)
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
      <div className='flex flex-col items-start justify-center mb-8 gap-y-4'>
        <AnimationContainer animation='fadeLeft' delay={0.2}>
          <SectionBadge title='Latest Products' />
        </AnimationContainer>
        <AnimationContainer animation='fadeLeft' delay={0.4}>
          <TypingAnimation
            duration={50}
            className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
          >
            Top product most bought.
          </TypingAnimation>
        </AnimationContainer>
        <AnimationContainer animation='fadeLeft' delay={0.6}>
          <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
            Discover our latest products, handpicked for their quality and
            popularity. These items are not only top-rated but also loved by our
            customers for their exceptional value and performance.
          </p>
        </AnimationContainer>
      </div>
      <AnimationContainer animation='fadeDown' delay={1}>
        <ProductWrapper getEcommerceNav={updatedGetEcommerceNav}>
          {viewMode === 'grid' ? (
            <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
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
          {/* <ProductPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        /> */}
        </ProductWrapper>
      </AnimationContainer>
    </Wrapper>
  )
}

export { LatestProductsSection }
