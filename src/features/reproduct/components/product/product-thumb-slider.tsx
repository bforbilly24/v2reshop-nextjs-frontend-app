'use client'

import { useEffect, useRef } from 'react'
import { ProductItem } from '@/constant'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/css'
import Image from 'next/image'
import { Button } from '@/components/ui/shadcn/button'
import { Icon } from '@/components/ui/icon'

interface ProductThumbSliderProps {
  product: ProductItem
}

interface SplideRef {
  splide: {
    sync: (target: SplideRef['splide']) => void
    go: (index: number | string) => void
  }
}
const ProductThumbSlider: React.FC<ProductThumbSliderProps> = ({ product }) => {
  const mainRef = useRef<SplideRef | null>(null)
  const thumbsRef = useRef<SplideRef | null>(null)

  useEffect(() => {
    if (mainRef.current?.splide && thumbsRef.current?.splide) {
      mainRef.current.splide.sync(thumbsRef.current.splide)
    }
  }, [])

  const images =
    product.images && product.images.length > 0 ? product.images : [product.img]

  const mainOptions = {
    type: 'fade' as const,
    wheel: true,
    height: '25rem',
    pagination: false,
    arrows: false,
    lazyLoad: 'nearby',
    cover: false,
  }

  const thumbOptions = {
    type: 'slide' as const,
    rewind: true,
    perPage: 4,
    gap: 12,
    isNavigation: true,
    pagination: false,
    arrows: false,
    cover: true,
    dragMinThreshold: {
      mouse: 4,
      touch: 10,
    },
    breakpoints: {
      640: {
        perPage: 3,
        gap: 8,
      },
    },
  }

  const handlePrev = () => {
    if (mainRef.current?.splide) {
      mainRef.current.splide.go('<')
    }
  }

  const handleNext = () => {
    if (mainRef.current?.splide) {
      mainRef.current.splide.go('>')
    }
  }

  return (
    <div className='w-full space-y-4'>
      <div className='relative'>
        <Splide
          ref={mainRef}
          options={mainOptions}
          className='product-main-slider'
        >
          {images.map((image, index) => (
            <SplideSlide key={`main-${index}`}>
              <div className='relative w-full h-[25rem] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center p-8'>
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  width={500}
                  height={400}
                  className='h-[350px] w-full  object-contain  transition-all duration-300 group-hover:scale-105'
                  priority={index === 0}
                />
                <Button
                  onClick={handlePrev}
                  size={'icon'}
                  variant={'ghost'}
                  className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md w-10 h-10 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'
                >
                  <Icon
                    icon='heroicons:chevron-left-solid'
                    className='size-5 text-gray-600'
                  />
                </Button>
                <Button
                  onClick={handleNext}
                  size={'icon'}
                  variant={'ghost'}
                  className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 border border-gray-200 shadow-md w-10 h-10 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition-all duration-300'
                >
                  <Icon
                    icon='heroicons:chevron-right-solid'
                    className='size-5 text-gray-600'
                  />
                </Button>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {images.length > 1 && (
        <div className='relative'>
          <Splide
            ref={thumbsRef}
            options={thumbOptions}
            className='product-thumb-slider'
          >
            {images.map((image, index) => (
              <SplideSlide key={`thumb-${index}`}>
                <div className='aspect-square w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 p-2'>
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    width={100}
                    height={100}
                    className='w-full h-full object-contain'
                  />
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      )}

      <style jsx global>{`
        .product-main-slider .splide__slide {
          height: 25rem;
        }

        .splide__track--nav > .splide__list > .splide__slide.is-active {
          border: 2px solid rgb(16 185 129) !important;
        }

        .splide__track--nav > .splide__list > .splide__slide {
          border: 3px solid transparent !important;
        }

        .product-thumb-slider .splide__slide {
          transition: all 0.2s ease;
        }

        .product-thumb-slider .splide__slide:hover {
          transform: translateY(-2px);
        }

        .splide__track {
          border-radius: 0.5rem;
        }

        .splide__slide {
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}

export { ProductThumbSlider }
