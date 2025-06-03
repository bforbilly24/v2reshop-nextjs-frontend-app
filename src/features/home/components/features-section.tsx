'use client'

import { FeatureItem, FEATURES } from '@/constant'
import Image from 'next/image'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { GlowingEffect } from '@/components/ui/aceternity/glowing-effect'
import SectionBadge from '@/components/ui/section-badge'

const FeaturesSection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='lg:grid lg:grid-cols-12 gap-6 justify-content-between'>
        <div className='lg:col-span-6 max-md:pt-10'>
          <div className='w-full xl:w-[30rem]'>
            <div className='flex flex-col items-start justify-center mb-8 gap-y-4'>
              <AnimationContainer animation='fadeLeft' delay={0.2}>
                <SectionBadge title='Our Feature' />
              </AnimationContainer>
              <AnimationContainer animation='fadeLeft' delay={0.3}>
                <TypingAnimation
                  duration={50}
                  className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
                >
                  Best solutions for your dream.
                </TypingAnimation>
              </AnimationContainer>
            </div>
            <AnimationContainer animation='fadeDown' delay={2}>
              <div className='grid grid-cols-1 md:grid-cols-1 gap-6'>
                {FEATURES.map((service: FeatureItem, index: number) => (
                  <div
                    key={service.id}
                    className='relative flex items-start justify-between gap-x-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 group'
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <GlowingEffect
                      disabled={false}
                      proximity={40}
                      blur={1}
                      spread={15}
                      variant='default'
                      glow={false}
                      movementDuration={1.5}
                      borderWidth={2}
                      inactiveZone={0.3}
                    />
                    <div className='flex h-full items-center justify-center'>
                      <service.icon className='size-10 text-primary group-hover:text-emerald-500 transition-colors duration-300' />
                    </div>
                    <div className='flex w-full flex-col items-start justify-between h-fit gap-y-0.5'>
                      <h3 className='font-semibold text-neutral-700 text-lg group-hover:text-gray-800 transition-colors duration-300'>
                        {service.title}
                      </h3>
                      <p className='font-medium text-zinc-500 text-base group-hover:text-gray-600 transition-colors duration-300'>
                        {service.subtitle}
                      </p>
                    </div>
                    <div className='absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-green-400 to-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                ))}
              </div>
            </AnimationContainer>
          </div>
        </div>
        <div className='lg:col-span-6'>
          <div className='relative w-full h-[679px] lg:h-full'>
            <AnimationContainer animation='fadeRight' delay={0.2}>
              <Image
                src='/images/feature/feature-1.jpg'
                alt='Service Image'
                fill
                quality={70}
                className='object-cover rounded-lg'
                priority
              />
            </AnimationContainer>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export { FeaturesSection }
