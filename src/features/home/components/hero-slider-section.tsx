'use client'

import React, { useState, useCallback } from 'react'
import { HEROSLIDERHOME } from '@/constant'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/atoms/carousel'
import { HeroLeftCard } from './cards/hero-left-card'
import { HeroRightCard } from './cards/hero-right-card'

const HeroSliderSection: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)

  const handlePrevClick = useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const handleNextClick = useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handlePaginationClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  React.useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  return (
    <section id='hero-slider' className='w-full relative md:pt-0 pt-'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-y-8'>
        <div className='hidden md:flex flex-row w-full items-center justify-center'>
          <div className='flex w-full items-center justify-end gap-x-2'>
            {HEROSLIDERHOME.map((_, index) => (
              <Button
                key={index}
                variant='ghost'
                size='icon'
                className='relative size-8 rounded-full'
                onClick={() => handlePaginationClick(index)}
              >
                <div
                  className={`absolute left-0 top-0 rounded-full border border-emerald-400 opacity-70 size-7 ${
                    currentSlide === index ? '' : 'hidden'
                  }`}
                />
                <div
                  className={`absolute left-2 top-2 size-3 rounded-full border ${
                    currentSlide === index
                      ? 'bg-emerald-400 border-emerald-400'
                      : 'bg-zinc-300 border-zinc-300'
                  }`}
                />
              </Button>
            ))}
          </div>
          <div className='flex w-full items-center justify-center gap-x-2'>
            <Button
              variant='default'
              size='icon'
              className='h-12 w-12 rounded-full bg-emerald-300 hover:bg-emerald-400'
              onClick={handlePrevClick}
            >
              <ChevronLeftIcon className='size-6 text-white' />
            </Button>
            <Button
              variant='default'
              size='icon'
              className='h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-400'
              onClick={handleNextClick}
            >
              <ChevronRightIcon className='size-6 text-white' />
            </Button>
          </div>
        </div>

        <Carousel
          setApi={setApi}
          className='w-full cursor-pointer'
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          opts={{
            align: 'center',
            loop: true,
            skipSnaps: false,
            dragFree: false,
          }}
        >
          <CarouselContent className='ml-0 md:-ml-4'>
            {HEROSLIDERHOME.map((slide, index) => (
              <CarouselItem
                key={slide.id}
                className='pl-0 md:pl-4 basis-full md:basis-auto'
              >
                <Card className='border-0 shadow-none'>
                  <CardContent className='p-0 px-4 md:px-0'>
                    <div className='relative h-[50vh] md:h-[80vh] w-full md:w-[70rem] mx-auto'>
                      <Image
                        alt={slide.alt}
                        src={slide.image}
                        fill
                        className='object-cover rounded-lg md:rounded-lg'
                        sizes='(max-width: 768px) calc(100vw - 2rem), (max-width: 1280px) 100vw, 934px'
                        priority={index === 0}
                      />
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className='hidden' />
          <CarouselNext className='hidden' />
        </Carousel>

        <div className='hidden md:hidden flex-row w-full items-center justify-center gap-x-4 px-4'>
          <Button
            variant='default'
            size='icon'
            className='h-10 w-10 rounded-full bg-emerald-300 hover:bg-emerald-400'
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon className='size-5 text-white' />
          </Button>

          <div className='flex items-center gap-x-2'>
            {HEROSLIDERHOME.map((_, index) => (
              <Button
                key={index}
                variant='ghost'
                size='icon'
                className='relative size-6 rounded-full p-0'
                onClick={() => handlePaginationClick(index)}
              >
                <div
                  className={`size-2 rounded-full border transition-all duration-200 ${
                    currentSlide === index
                      ? 'bg-emerald-400 border-emerald-400 scale-125'
                      : 'bg-zinc-300 border-zinc-300'
                  }`}
                />
              </Button>
            ))}
          </div>

          <Button
            variant='default'
            size='icon'
            className='h-10 w-10 rounded-full bg-emerald-500 hover:bg-emerald-400'
            onClick={handleNextClick}
          >
            <ChevronRightIcon className='size-5 text-white' />
          </Button>
        </div>
      </div>

      <div className='hidden md:block'>
        <HeroLeftCard />
        <HeroRightCard />
      </div>

      <div className='md:hidden w-full px-4 space-y-4 mt-6'>
        <HeroLeftCard />
        <HeroRightCard />
      </div>
    </section>
  )
}

export { HeroSliderSection }
