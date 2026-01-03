'use client'

import { useState, useMemo, useEffect } from 'react'
import AnimationContainer from '@/components/atoms/animation-container'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/atoms/carousel'
import { Progress } from '@/components/atoms/progress'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'
import { getProducts } from '@/features/reproduct/actions'
import ProductBoxSection from '@/features/reproduct/components/organisms/product-box-section'
import { Product } from '@/features/reproduct/types'

const ITEMS_PER_PAGE = 8

const LatestProductsSection = () => {
  const [currentPage] = useState(1)
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
        <div className='hidden sm:block'>
          <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 h-max'>
            {paginatedProducts.map((product: Product) => (
              <ProductBoxSection
                key={`grid_key_${product.id}`}
                product={product}
              />
            ))}
          </div>
        </div>

        <div className='block sm:hidden'>
          <div className='px-4'>
            <Carousel
              setApi={setApi}
              className='w-full'
              opts={{
                align: 'start',
                loop: true,
              }}
            >
              <CarouselContent className='-ml-2 md:-ml-4'>
                {paginatedProducts.map((product: Product) => (
                  <CarouselItem
                    key={`mobile_carousel_${product.id}`}
                    className='pl-2 md:pl-4 basis-full'
                  >
                    <div className='max-w-sm mx-auto'>
                      <ProductBoxSection product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className='hidden' />
              <CarouselNext className='hidden' />
            </Carousel>

            <div className='flex justify-between items-center mt-6 px-2'>
              <div className='flex items-center gap-2'>
                <button
                  onClick={() => api?.scrollPrev()}
                  disabled={!api?.canScrollPrev()}
                  className='flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M15 18l-6-6 6-6' />
                  </svg>
                </button>

                <button
                  onClick={() => api?.scrollNext()}
                  disabled={!api?.canScrollNext()}
                  className='flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M9 18l6-6-6-6' />
                  </svg>
                </button>
              </div>

              <div className='flex flex-col items-center'>
                <Progress value={progress} className='h-1 w-24' />
                <div className='mt-2 text-xs text-muted-foreground'>
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
