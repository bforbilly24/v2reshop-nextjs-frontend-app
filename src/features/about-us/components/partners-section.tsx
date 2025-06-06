'use client'

import { PartnerItem, PARTNERS } from '@/constant'
import Image from 'next/image'
import { Marquee } from '@/components/ui/magicui/marquee'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import SectionBadge from '@/components/ui/section-badge'

const PartnersSection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='flex flex-col items-center justify-center gap-y-4'>
        <div className='flex flex-col items-center text-center justify-center mb-8 gap-y-4'>
          <AnimationContainer animation='fadeDown' delay={0.2}>
            <SectionBadge title='Our Partners' />
          </AnimationContainer>
          <AnimationContainer animation='fadeDown' delay={0.4}>
            <TypingAnimation
              duration={50}
              className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
            >
              Companies that trust us
            </TypingAnimation>
          </AnimationContainer>
          <AnimationContainer animation='fadeDown' delay={0.6}>
            <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
              We know that good design means good business
            </p>
          </AnimationContainer>
        </div>
        <div className='relative flex w-full flex-col items-center justify-center min-h-[200px] overflow-hidden'>
          <div className='pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white/80 to-transparent dark:from-background z-10' />
          <div className='pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white/80 to-transparent dark:from-background z-10' />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-b from-transparent to-white/80 dark:to-background z-10' />
          <Marquee pauseOnHover={true} vertical={false} repeat={4}>
            {PARTNERS.map((partner: PartnerItem) => (
              <Image
                key={partner.id}
                alt={partner.alt}
                src={partner.image}
                width={112}
                height={112}
                className='size-28 mx-2 grayscale hover:grayscale-0 transition-all duration-300'
              />
            ))}
          </Marquee>
        </div>
      </div>
    </Wrapper>
  )
}

export { PartnersSection }
