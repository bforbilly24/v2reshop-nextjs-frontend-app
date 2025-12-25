'use client'

import { PERKS } from '@/constant'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import AnimationContainer from '@/components/atoms/animation-container'
import { Icon } from '@/components/atoms/icon'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'

const PerksSection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32 relative'>
      <div className='flex flex-col items-center justify-center text-center mb-8 gap-y-4'>
        <AnimationContainer animation='fadeDown' delay={0.2}>
          <SectionBadge title='Perks' />
        </AnimationContainer>

        <AnimationContainer animation='fadeDown' delay={0.4}>
          <TypingAnimation
            duration={50}
            className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
          >
            Join the ReShop Community
          </TypingAnimation>
          <TypingAnimation
            duration={80}
            className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
          >
            and unlock real impact
          </TypingAnimation>
        </AnimationContainer>

        <AnimationContainer animation='fadeDown' delay={0.6}>
          <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
            Connect with an eco-conscious community, access quality reuse
            materials, and be part of a circular economy movement that has real
            impact. All in one platform.
          </p>
        </AnimationContainer>
      </div>

      <div className='relative pt-10'>
        <div className='hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-10'>
          <AnimationContainer animation='scaleUp' delay={0.8}>
            <Image
              src='/images/patterns/pattern-3.svg'
              alt='pattern'
              width={32}
              height={32}
              className='size-full'
            />
          </AnimationContainer>
        </div>

        <div className='grid grid-cols-2 relative z-10'>
          {PERKS.map((perk, index) => (
            <div
              key={index}
              className={cn(
                'flex p-2 md:p-16 w-full',
                index % 2 === 0 ? 'justify-end' : 'justify-start'
              )}
            >
              <AnimationContainer
                className='w-full'
                animation={index % 2 === 0 ? 'fadeRight' : 'fadeLeft'}
                delay={0.2 * (index + 1)}
              >
                <div className='flex flex-col items-center text-center gap-4'>
                  <div className='size-12 lg:size-16 rounded-lg lg:rounded-2xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center'>
                    <div className='bg-emerald-100 p-1 rounded-lg'>
                      <Icon
                        icon={perk.icon}
                        className='size-4 lg:size-8 text-emerald-500 '
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <h3 className='text-lg md:text-xl font-medium'>
                      {perk.title}
                    </h3>
                    <p className='text-xs md:text-sm text-muted-foreground max-w-[250px]'>
                      {perk.description}
                    </p>
                  </div>
                </div>
              </AnimationContainer>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  )
}

export { PerksSection }
