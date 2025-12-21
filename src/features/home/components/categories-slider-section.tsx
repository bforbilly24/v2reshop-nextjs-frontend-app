'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { cn } from '@/lib/cn'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import AnimationContainer from '@/components/atoms/animation-container'
import Wrapper from '@/components/atoms/wrapper'
import SectionBadge from '@/components/atoms/section-badge'
import { HOME_CATEGORIES, HomeCategoryItem } from '@/constant'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/atoms/carousel'

type CategoryItemProps = {
  category: HomeCategoryItem
}

const CategoryItem = React.memo(({ category }: CategoryItemProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  
  const handleMouseDown = () => {
    setIsDragging(false)
  }
  
  const handleMouseMove = () => {
    setIsDragging(true)
  }
  
  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className='max-w-lg w-full'>
      <div className='group relative transition-all duration-500'>
        <Link 
          href={`/categories/${category.slug}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <div
            className={cn(
              'relative overflow-hidden h-[36rem] rounded-md shadow-xl mx-auto border border-transparent dark:border-neutral-800',
              'before:absolute before:bg-black before:opacity-20 before:w-full before:h-full before:z-[1]',
              'after:pointer-events-none after:absolute after:left-0 after:top-0 after:z-[1] after:h-full after:w-0 after:bg-emerald-500 after:transition-all after:duration-500 group-hover:after:w-full'
            )}
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className='object-cover rounded-md z-0 group-hover:scale-105 transition-transform duration-500'
              quality={60}
              priority
              draggable={false}
            />
            <div className='absolute bottom-10 left-4 z-10'>
              <span className='block text-sm uppercase leading-6 text-white mb-4 transition-colors duration-500 group-hover:text-black'>
                Product
              </span>
              <h3 className='text-[36px] leading-[43px] font-bold text-white transition-colors duration-500 group-hover:text-black'>
                {category.title}
              </h3>
              <p className='font-normal text-base text-gray-50 mt-4 transition-colors duration-500 group-hover:text-slate-800'>
                {category.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
})

CategoryItem.displayName = 'CategoryItem'

type CategoriesSliderProps = {
  categories: HomeCategoryItem[]
}

const CategorySlider: React.FC<CategoriesSliderProps> = React.memo(({ categories }) => {
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: true, 
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  )

  return (
    <div className="w-full touch-pan-y">
      <Carousel
        opts={{
          align: 'center',
          loop: true,
          dragFree: true,
          containScroll: 'trimSnaps',
          slidesToScroll: 1,
          skipSnaps: false,
          inViewThreshold: 0.7,
          watchDrag: true,
          watchResize: true,
          duration: 25,
          dragThreshold: 10,
        }}
        plugins={[plugin.current]}
        className="w-full cursor-grab active:cursor-grabbing"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
      >
        <CarouselContent className="-ml-4" style={{ touchAction: 'pan-y pinch-zoom' }}>
          {categories.map((category) => (
            <CarouselItem 
              key={category.id}
              className="pl-4 basis-full md:basis-1/2 lg:basis-1/3 select-none"
            >
              <CategoryItem category={category} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
})

CategorySlider.displayName = 'CategorySlider'

type CategoriesSliderSectionProps = {
  categories?: HomeCategoryItem[]
  className?: string
}

const CategoriesSliderSection: React.FC<CategoriesSliderSectionProps> = React.memo(({
  categories: providedCategories,
}) => {
  const categoriesToShow = React.useMemo(
    () => providedCategories || HOME_CATEGORIES,
    [providedCategories]
  )

  return (
    <>
      <Wrapper>
        <div className='flex flex-col lg:flex-row justify-between items-center lg:items-center mb-6 sm:mb-8 gap-4 lg:gap-8'>
          <div className='flex flex-col items-center w-full lg:items-start justify-center gap-y-3 sm:gap-y-4'>
            <AnimationContainer animation='fadeLeft' delay={0.2}>
              <SectionBadge title='Our Categories Product' />
            </AnimationContainer>
            <AnimationContainer animation='fadeLeft' delay={0.4}>
              <div className='space-y-1'>
                <TypingAnimation
                  duration={50}
                  className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400 text-center lg:text-left'
                >
                  Best solutions for your dream.
                </TypingAnimation>
              </div>
            </AnimationContainer>
          </div>
          <AnimationContainer animation='fadeRight' delay={0.8}>
            <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 text-center lg:text-right'>
              Explore our diverse range of categories, each designed to provide
              the best solutions for your needs. From electronics to fashion,
              we&apos;ve got you covered with top-quality products.
            </p>
          </AnimationContainer>
        </div>
      </Wrapper>
      <AnimationContainer animation='fadeDown' delay={1}>
        <CategorySlider categories={categoriesToShow} />
      </AnimationContainer>
    </>
  )
})

CategoriesSliderSection.displayName = 'CategoriesSliderSection'

export { CategoriesSliderSection }
