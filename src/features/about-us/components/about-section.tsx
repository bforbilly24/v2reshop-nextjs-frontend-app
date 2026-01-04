'use client'

import Image from 'next/image'
import Link from 'next/link'
import AnimationContainer from '@/components/atoms/animation-container'
import { Button } from '@/components/atoms/button'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'

const AboutSection: React.FC = () => {
  return (
    <section className='relative w-full overflow-hidden'>
      <Wrapper className='py-12 lg:py-32'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center'>
          <div className='flex flex-col order-2 lg:order-1 items-center lg:items-start text-center lg:text-left'>
            <div className='flex flex-col items-center w-full lg:items-start justify-center mb-8 gap-y-3 sm:gap-y-4'>
              <AnimationContainer animation='fadeLeft' delay={0.2}>
                <SectionBadge title='About' />
              </AnimationContainer>
              <AnimationContainer animation='fadeLeft' delay={0.4}>
                <div className='space-y-1'>
                  <TypingAnimation
                    duration={50}
                    className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400 text-center lg:text-left'
                  >
                    Over 12 years leading and deeps in interiors industrial
                  </TypingAnimation>
                </div>
              </AnimationContainer>
              <AnimationContainer animation='fadeLeft' delay={0.6}>
                <p className='text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0'>
                  We know that good design means good business
                </p>
              </AnimationContainer>
            </div>
            <AnimationContainer animation='fadeLeft' delay={0.8}>
              <p className='text-foreground text-sm leading-loose mb-10 lg:mb-20 lg:max-w-sm text-justify'>
                And produce say the ten moments parties. Simple innate summer
                fat appear basket his desire joy. Outward clothes promise at
                gravity do excited. Sufficient particular impossible by
                reasonable oh expression is. Yet preference connection
                unpleasant yet melancholy but end appearance. And excellence
                partiality estimating terminated day everything.
              </p>
            </AnimationContainer>
          </div>
          <div className='flex justify-center lg:justify-end order-1 lg:order-2 relative'>
            <Image
              src='/images/about-us/about.jpg'
              alt='Service Image'
              width={390}
              height={760}
              quality={70}
              className='object-cover z-10 w-full max-w-[390px] h-[400px] lg:h-auto rounded-lg shadow-lg'
              priority
            />
          </div>
        </div>
      </Wrapper>
      <Image
        src={'/images/patterns/pattern-1.png'}
        alt='pattern'
        width={336}
        height={336}
        className='absolute -right-20 top-20 lg:right-96 lg:top-52 z-0 opacity-20 lg:opacity-100 pointer-events-none'
      />
    </section>
  )
}

export { AboutSection }
