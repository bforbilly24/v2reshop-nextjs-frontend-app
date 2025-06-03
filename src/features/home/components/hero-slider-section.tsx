'use client'

import React, { useRef, useState } from 'react'
import { HEROSLIDERHOME } from '@/constant'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/splide/dist/css/splide.min.css'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/shadcn/button'
import { HeroLeftCard } from './cards/hero-left-card'
import { HeroRightCard } from './cards/hero-right-card'

interface SplideInstance {
  go: (control: string | number) => void
}

const HeroSliderSection: React.FC = () => {
  const splideRef = useRef<SplideInstance | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const handlePrevClick = () => {
    splideRef.current?.go('<')
  }

  const handleNextClick = () => {
    splideRef.current?.go('>')
  }

  const handleMove = (_splide: SplideInstance, newIndex: number) => {
    setCurrentSlide(newIndex)
  }

  const handlePaginationClick = (index: number) => {
    splideRef.current?.go(index)
  }

  return (
    <section id='hero-slider' className='w-full relative'>
      <div className='flex h-full w-full flex-col items-center justify-center gap-y-8'>
        <div className='flex flex-row w-full items-center justify-center'>
          <div className='flex w-full items-center justify-end gap-x-2'>
            {HEROSLIDERHOME.map((_, index) => (
              <Button
                key={index}
                variant='ghost'
                size='icon'
                className='relative h-[27px] w-[27px] rounded-full'
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
        <Splide
          ref={splideRef}
          onMove={handleMove}
          options={{
            autoWidth: true,
            gap: '1rem',
            focus: 'center',
            type: 'loop',
            // drag: 'free',
            lazyLoad: 'nearby',
            perPage: 1,
            autoplay: true,
            interval: 3000,
            arrows: false,
            pagination: false,
            breakpoints: {
              640: {
                padding: { left: '0rem', right: '0rem' },
                gap: '0.5rem',
              },
            },
          }}
          className='w-full cursor-pointer'
        >
          {HEROSLIDERHOME.map((slide, index) => (
            <SplideSlide key={slide.id}>
              {/* <div className='relative h-[553px] w-[934px]'> */}
              <div className='relative h-[40rem] w-[60rem]'>
                <Image
                  alt={slide.alt}
                  src={slide.image}
                  fill
                  className='object-cover'
                  sizes='(max-width: 1280px) 100vw, 934px'
                  priority={index === 0}
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <HeroLeftCard />
      <HeroRightCard />
    </section>
  )
}

export { HeroSliderSection }
