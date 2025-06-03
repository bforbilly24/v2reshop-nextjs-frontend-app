'use client'

import { CATEGORIES, type CategoryItem } from '@/constant'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import SectionBadge from '@/components/ui/section-badge'

type CategoryItemProps = {
  category: CategoryItem
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className='max-w-lg w-full'>
      <div className='group relative transition-all duration-500'>
        <Link href={`/categories/${category.slug}`}>
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
}

type CategoriesSliderProps = {
  categories: CategoryItem[]
}

const CategorySlider: React.FC<CategoriesSliderProps> = ({ categories }) => {
  return (
    <Splide
      options={{
        perPage: 3,
        gap: '1rem',
        drag: 'free',
        type: 'loop',
        focus: 'center',
        autoplay: true,
        interval: 3000,
        pauseOnHover: true,
        resetProgress: false,
        pagination: false,
        arrows: false,
        breakpoints: {
          1200: { perPage: 3 },
          992: { perPage: 2 },
          576: { perPage: 1 },
        },
      }}
    >
      {categories.map((category) => (
        <SplideSlide key={category.id}>
          <CategoryItem category={category} />
        </SplideSlide>
      ))}
    </Splide>
  )
}

type CategoriesSliderSectionProps = {
  categories?: CategoryItem[]
  className?: string
}

const CategoriesSliderSection: React.FC<CategoriesSliderSectionProps> = ({
  categories: providedCategories,
}) => {
  const categoriesToShow = providedCategories || CATEGORIES

  return (
    <>
      <Wrapper>
        <div className='flex justify-between items-center mb-8 max-md:flex-col max-md:gap-4'>
          <AnimationContainer animation='fadeLeft' delay={0.2}>
            <SectionBadge title='Our Products' />
          </AnimationContainer>
          <div className='flex flex-col items-center justify-center'>
            <AnimationContainer animation='fadeRight' delay={0.3}>
              <TypingAnimation
                duration={50}
                className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
              >
                Best solutions for
              </TypingAnimation>
              <TypingAnimation
                duration={50}
                className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
              >
                your dream.
              </TypingAnimation>
            </AnimationContainer>
          </div>
        </div>
      </Wrapper>
      <AnimationContainer animation='fadeDown' delay={0.8}>
        <CategorySlider categories={categoriesToShow} />
      </AnimationContainer>
    </>
  )
}

export { CategoriesSliderSection }
