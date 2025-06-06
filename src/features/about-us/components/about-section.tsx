'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/shadcn/button'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import SectionBadge from '@/components/ui/section-badge'

const AboutSection: React.FC = () => {
  return (
    <>
      <Wrapper className='py-20 lg:py-32'>
        <div className='lg:grid lg:grid-cols-2 max-md:flex max-md:flex-col-reverse'>
          <div className='flex flex-col'>
            <div className='flex flex-col items-start justify-center mb-8 gap-y-4'>
              <AnimationContainer
                animation='fadeLeft'
                delay={0.2}
                className='w-fit mb-4'
              >
                <SectionBadge title='About' />
              </AnimationContainer>
              <AnimationContainer
                animation='fadeLeft'
                delay={0.4}
              >
                <div className='flex flex-col items-center justify-center'>
                  <TypingAnimation
                    duration={50}
                    className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
                  >
                    Over 12 years leading and deeps in interiors industrial
                  </TypingAnimation>
                </div>
              </AnimationContainer>
              <AnimationContainer animation='fadeLeft' delay={0.6}>
                <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
                  We know that good design means good business
                </p>
              </AnimationContainer>
            </div>
            <AnimationContainer animation='fadeLeft' delay={0.8}>
              <p className='text-foreground text-sm leading-loose mb-20 lg:max-w-sm'>
                And produce say the ten moments parties. Simple innate summer
                fat appear basket his desire joy. Outward clothes promise at
                gravity do excited. Sufficient particular impossible by
                reasonable oh expression is. Yet preference connection
                unpleasant yet melancholy but end appearance. And excellence
                partiality estimating terminated day everything.
              </p>
            </AnimationContainer>
            <AnimationContainer animation='fadeLeft' delay={1}>
              <Button
                asChild
                variant='default'
                size='lg'
                className='bg-emerald-500 hover:bg-emerald-600 h-16 text-lg uppercase text-white'
              >
                <Link href='/about'>More About Us</Link>
              </Button>
            </AnimationContainer>
          </div>
          <div className='flex justify-end'>
            <Image
              src='/images/about-us/about.jpg'
              alt='Service Image'
              width={390}
              height={760}
              quality={70}
              className='object-cover z-10'
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
        className='absolute right-96 top-52 z-0'
      />
    </>
  )
}

export { AboutSection }
