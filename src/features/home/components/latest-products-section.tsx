'use client'

import { useState, useMemo, useEffect } from 'react'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import AnimationContainer from '@/components/atoms/animation-container'
import Wrapper from '@/components/atoms/wrapper'
import SectionBadge from '@/components/atoms/section-badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/atoms/carousel'
import { Progress } from '@/components/atoms/progress'
import { ProductWrapperSection } from '@/features/reproduct/components/organisms/product-wrapper-section'
import ProductBoxSection from '@/features/reproduct/components/organisms/product-box-section'
import ProductListSection from '@/features/reproduct/components/organisms/product-list-section'
import { getProducts } from '@/features/reproduct/actions'
import { Product } from '@/features/reproduct/types'

const ITEMS_PER_PAGE = 8

const LatestProductsSection = () => {
  const [currentPage] = useState(1)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState<Product[]>([])

  const progress = count > 0 ? (current * 100) / count : 0

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts({ 
          sort: 'rating',
          order: 'desc',
          page: 1
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

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const sortedProducts = useMemo(() => {
    return products.slice()
      .sort((a: Product, b: Product) => (b.rating_count || 0) - (a.rating_count || 0))
      .slice(0, 8)
  }, [products])

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
        {/* Desktop and Tablet View */}
        <div className="hidden sm:block">
          <ProductWrapperSection
            getEcommerceNav={updatedGetEcommerceNav}
            showSidebar={false}
            showSort={false}
          >
            {viewMode === 'grid' ? (
              <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
                {paginatedProducts.map((product: Product) => (
                  <ProductBoxSection key={`grid_key_${product.id}`} product={product} />
                ))}
              </div>
            ) : (
              <div className='space-y-3 grid-cols-1 gap-5 h-max'>
                {paginatedProducts.map((product: Product) => (
                  <div key={`list_key_${product.id}`}>
                    <ProductListSection product={product} />
                  </div>
                ))}
              </div>
            )}
          </ProductWrapperSection>
        </div>

        {/* Mobile Carousel View */}
        <div className="block sm:hidden">
          <div className="flex justify-center mb-4">
            <div className="flex gap-2">
              {updatedGetEcommerceNav().map(({ active, icon, onClick }, index) => (
                <button
                  key={`mobile-view-button-${index}`}
                  className={`p-2 rounded-md border transition-colors ${
                    active
                      ? 'border-foreground text-foreground'
                      : 'border-gray-400 text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={onClick}
                >
                  <span className="sr-only">
                    {active ? 'Grid view' : 'List view'}
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    {icon === 'heroicons:view-columns' ? (
                      <path d="M3 3h7v18H3V3zm11 0h7v18h-7V3z" />
                    ) : (
                      <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                    )}
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <div className="px-4">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {paginatedProducts.map((product: Product) => (
                  <CarouselItem key={`mobile_carousel_${product.id}`} className="pl-2 md:pl-4 basis-full">
                    {viewMode === 'grid' ? (
                      <div className="max-w-sm mx-auto">
                        <ProductBoxSection product={product} />
                      </div>
                    ) : (
                      <div className="max-w-sm mx-auto">
                        <ProductListSection product={product} />
                      </div>
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden" />
              <CarouselNext className="hidden" />
            </Carousel>
            
            {/* Navigation and Progress indicator */}
            <div className="flex justify-between items-center mt-6 px-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => api?.scrollPrev()}
                  disabled={!api?.canScrollPrev()}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <button
                  onClick={() => api?.scrollNext()}
                  disabled={!api?.canScrollNext()}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
              
              <div className="flex flex-col items-center">
                <Progress value={progress} className="h-1 w-24" />
                <div className="mt-2 text-xs text-muted-foreground">
                  {current} of {count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimationContainer>
    </Wrapper>
  )
}

export { LatestProductsSection }
