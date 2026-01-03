'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/button'
import { FlickeringGrid } from '@/components/atoms/flickering-grid'
import { Icon } from '@/components/atoms/icon'
import SectionBadge from '@/components/atoms/section-badge'
import AnimationContainer from '../atoms/animation-container'
import { Particles } from '../atoms/particles'
import RetroGrid from '../atoms/retro-grid'
import { TypingAnimation } from '../atoms/typing-animation'

const HIGHLIGHTS = [
  {
    icon: 'mdi:shield-check',
    label: 'Secure Platform',
  },
  {
    icon: 'mdi:clock',
    label: 'Real-time Updates',
  },
  {
    icon: 'mdi:magic',
    label: 'Smart Features',
  },
]

const BannerSection: React.FC = () => {
  const router = useRouter()

  const handleClick = (): void => {
    router.push('/recommunity')
  }

  return (
    <div className='relative'>
      <div className='flex flex-col items-center text-center relative gap-4 py-8 sm:py-12 overflow-hidden z-0 rounded-xl max-w-full mx-auto'>
        <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-200/80 dark:from-foreground w-full h-1/2 z-10' />

        <AnimationContainer
          animation='scaleUp'
          delay={0.2}
          className='w-full mx-auto'
        >
          <div className='absolute -top-1/2 inset-x-0 mx-auto bg-emerald-600/30 rounded-full size-1/2 blur-[4rem] lg:blur-[10rem]' />
        </AnimationContainer>

        <AnimationContainer animation='scaleUp' delay={0.3}>
          <div className='absolute top-0 w-4/5 mx-auto inset-x-0 h-px bg-gradient-to-r from-emerald-600/0 dark:from-foreground/0 via-emerald-600/50 dark:via-foreground/50 to-emerald-600/0 dark:to-foreground/0' />
        </AnimationContainer>

        <AnimationContainer animation='scaleUp' delay={0.2}>
          <FlickeringGrid
            className='absolute inset-0 -z-10 h-full w-[120%]'
            squareSize={4}
            gridGap={6}
            color='#10b981'
            maxOpacity={0.2}
            flickerChance={0.1}
            height={800}
          />
        </AnimationContainer>

        <div className='flex flex-col lg:flex-row items-center justify-center w-full z-10 gap-4 lg:gap-6 xl:gap-8'>
          <AnimationContainer
            animation='fadeLeft'
            delay={0.2}
            className='hidden lg:flex lg:w-1/2 xl:w-auto'
          >
            <Image
              alt='vector-community'
              src='/images/banner/community.svg'
              width={381}
              height={230}
              className='h-[180px] w-[300px] lg:h-[200px] lg:w-[340px] xl:h-[230px] xl:w-[381px]'
            />
          </AnimationContainer>

          <div className='flex flex-col items-center justify-center mb-4 sm:mb-6 lg:mb-8 gap-y-3 sm:gap-y-4 lg:w-1/2 xl:w-auto'>
            <AnimationContainer animation='fadeDown' delay={0.2}>
              <SectionBadge title='Community' />
            </AnimationContainer>
            <div className='flex flex-col items-center justify-center'>
              <AnimationContainer animation='fadeDown' delay={0.4}>
                <TypingAnimation
                  duration={50}
                  className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
                >
                  Join Our Community
                </TypingAnimation>
              </AnimationContainer>

              <AnimationContainer animation='fadeDown' delay={0.6}>
                <p className='text-xs sm:text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl lg:max-w-2xl mx-auto px-2 sm:px-0'>
                  &quot;Create and join in to create a comfortable environment
                  and maintain it together.&quot;
                </p>
              </AnimationContainer>

              <AnimationContainer animation='fadeDown' delay={0.8}>
                <div className='flex items-center mt-3 sm:mt-4'>
                  <div className='rounded-full px-3 sm:px-4 py-2 sm:py-2.5 bg-neutral-200/50 flex flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-4'>
                    {HIGHLIGHTS.map((item, index) => (
                      <AnimationContainer
                        key={index}
                        animation='fadeRight'
                        delay={0.8 + index * 0.1}
                      >
                        <div className='flex items-center gap-1.5 sm:gap-2'>
                          <Icon
                            icon={item.icon}
                            className='size-4 sm:size-5 text-primary'
                            aria-label={item.label}
                          />
                          <span className='text-xs sm:text-sm text-foreground whitespace-nowrap'>
                            {item.label}
                          </span>
                        </div>
                      </AnimationContainer>
                    ))}
                  </div>
                </div>
              </AnimationContainer>

              <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 w-full px-4 sm:px-0'>
                <AnimationContainer
                  animation='fadeLeft'
                  delay={1}
                  className='sm:w-auto w-full'
                >
                  <Button
                    asChild
                    onClick={handleClick}
                    size='lg'
                    variant='default'
                    className='px-6 sm:px-8 w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400'
                  >
                    <Link href=''>Register now</Link>
                  </Button>
                </AnimationContainer>

                <AnimationContainer
                  animation='fadeRight'
                  delay={1}
                  className='sm:w-auto w-full'
                >
                  <Button
                    asChild
                    size='lg'
                    variant='secondary'
                    className='px-6 sm:px-8 w-full sm:w-auto'
                  >
                    <Link href=''>Learn More</Link>
                  </Button>
                </AnimationContainer>
              </div>
            </div>
          </div>
        </div>
        <RetroGrid />
        <Particles
          size={2}
          refresh
          ease={80}
          color='#10b981'
          quantity={100}
          className='size-full absolute inset-0'
        />
      </div>
    </div>
  )
}

export { BannerSection }
