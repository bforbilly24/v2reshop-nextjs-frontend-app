'use client'

import { FeatureItem, FEATURES } from '@/constant'
import Image from 'next/image'
import AnimationContainer from '@/components/atoms/animation-container'
import { GlowingEffect } from '@/components/atoms/glowing-effect'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'

const FeaturesSection: React.FC = () => {
  return (
    <Wrapper>
      <div className='flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-12'>
        <div className='lg:col-span-6 order-2 lg:order-1 px-4 sm:px-0'>
          <div className='w-full xl:w-[30rem]'>
            <div className='flex flex-col items-start justify-center mb-6 sm:mb-8 gap-y-3 sm:gap-y-4'>
              <AnimationContainer animation='fadeLeft' delay={0.2}>
                <SectionBadge title='Our Feature' />
              </AnimationContainer>
              <AnimationContainer animation='fadeLeft' delay={0.4}>
                <TypingAnimation
                  duration={50}
                  className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
                >
                  Best solutions for your dream.
                </TypingAnimation>
              </AnimationContainer>
              <AnimationContainer animation='fadeUp' delay={0.6}>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl'>
                  Discover our unique features designed to enhance your
                  experience. From intuitive navigation to personalized content,
                  we&apos;ve crafted every detail to ensure you get the most out
                  of your journey with us.
                </p>
              </AnimationContainer>
            </div>
            <AnimationContainer animation='fadeDown' delay={1}>
              <div className='grid grid-cols-1 gap-4 sm:gap-6'>
                {FEATURES.map((service: FeatureItem, index: number) => (
                  <div
                    key={service.id}
                    className='relative flex items-start justify-between gap-x-3 sm:gap-x-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-md p-3 sm:p-4 transition-all duration-300 hover:shadow-lg hover:scale-105 group'
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
                    <div className='flex h-full items-center justify-center flex-shrink-0'>
                      <service.icon className='size-8 sm:size-10 text-primary group-hover:text-emerald-500 transition-colors duration-300' />
                    </div>
                    <div className='flex w-full flex-col items-start justify-between h-fit gap-y-0.5 sm:gap-y-1'>
                      <h3 className='font-semibold text-neutral-700 text-base sm:text-lg group-hover:text-gray-800 transition-colors duration-300'>
                        {service.title}
                      </h3>
                      <p className='font-medium text-zinc-500 text-sm sm:text-base group-hover:text-gray-600 transition-colors duration-300'>
                        {service.subtitle}
                      </p>
                    </div>
                    <div className='absolute top-2 right-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-green-400 to-lime-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                    <div className='absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  </div>
                ))}
              </div>
            </AnimationContainer>
          </div>
        </div>
        <div className='lg:col-span-6 order-1 lg:order-2'>
          <div className='relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[679px]'>
            <div className='absolute inset-0 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500'>
              Image
            </div>

            <AnimationContainer animation='fadeRight' delay={0.5}>
              <Image
                src='/images/feature/feature-1.jpg'
                alt='Service Image'
                fill
                quality={70}
                className='object-cover rounded-lg'
                priority
                onError={(e) => {
                  console.error('Image failed to load:', e)
                }}
                onLoad={() => {
                }}
              />
            </AnimationContainer>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export { FeaturesSection }
