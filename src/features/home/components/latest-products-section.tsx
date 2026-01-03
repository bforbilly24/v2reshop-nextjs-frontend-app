'use client'

import { useState, useMemo, useEffect } from 'react'
import AnimationContainer from '@/components/atoms/animation-container'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'
import { getProducts } from '@/features/reproduct/actions'
import ProductBoxSection from '@/features/reproduct/components/organisms/product-box-section'
import { Product } from '@/features/reproduct/types'

const ITEMS_PER_PAGE = 8

const LatestProductsSection = () => {
  const [currentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({
          sort: 'rating',
          order: 'desc',
          page: 1,
        })
        if (res.status && res.data) {
          setProducts(res.data.data.slice(0, 8))
        }
      } catch (error) {
        console.error('Failed to fetch products', error)
      }
    }
    fetchProducts()
  }, [])

  const sortedProducts = useMemo(() => {
    return products
      .slice()
      .sort(
        (a: Product, b: Product) =>
          (b.rating_count || 0) - (a.rating_count || 0)
      )
      .slice(0, 8)
  }, [products])

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <Wrapper>
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
        <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-3 h-max'>
          {paginatedProducts.map((product: Product) => (
            <ProductBoxSection
              key={`grid_key_${product.id}`}
              product={product}
            />
          ))}
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}

export { LatestProductsSection }
