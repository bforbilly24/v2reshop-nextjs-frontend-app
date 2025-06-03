'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/shadcn/button'
import AnimationContainer from '@/components/global/animation-container'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Icon } from '@/components/ui/icon'
import SectionBadge from '@/components/ui/section-badge'
import { TypingAnimation } from '../ui/magicui/typing-animation'
import { Particles } from '../ui/particles'
import RetroGrid from '../ui/retro-grid'
import Wrapper from './wrapper'

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

const Banner: React.FC = () => {
  const router = useRouter()

  const handleClick = (): void => {
    router.push('/recommunity')
  }

  return (
    <div className='py-20 lg:py-32 relative'>
      <div className='flex flex-col items-center text-center relative gap-4 py-12 overflow-hidden z-0 rounded-xl'>
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

        <div className='flex flex-col lg:flex-row items-center justify-center w-full z-10 gap-4 xl:gap-8'>
          <AnimationContainer
            animation='fadeUp'
            delay={0.3}
            className='hidden lg:flex'
          >
            <Image
              alt='vector-community'
              src='/images/banner/community.svg'
              width={381}
              height={230}
              className='h-[230px] w-[381px]'
            />
          </AnimationContainer>

          <div className='flex flex-col items-center justify-center gap-4'>
            <AnimationContainer animation='fadeUp' delay={0.2}>
              <SectionBadge title='Community' />
            </AnimationContainer>
            <div className='flex flex-col items-center justify-center'>
              <AnimationContainer animation='fadeUp' delay={0.4}>
                <TypingAnimation
                  duration={50}
                  className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
                >
                  Join Our Community
                </TypingAnimation>
              </AnimationContainer>

              <AnimationContainer animation='fadeUp' delay={0.5}>
                <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mt-4'>
                  &quot;Create and join in to create a comfortable environment
                  and maintain it together.&quot;
                </p>
              </AnimationContainer>

              <AnimationContainer animation='fadeUp' delay={0.7}>
                <div className='flex items-center mt-4'>
                  <div className='rounded-full px-4 py-2.5 bg-neutral-200/50 flex flex-wrap md:flex-row items-center justify-center gap-4'>
                    {HIGHLIGHTS.map((item, index) => (
                      <AnimationContainer
                        key={index}
                        animation='fadeRight'
                        delay={0.8 + index * 0.1}
                      >
                        <div className='flex items-center gap-2 last:hidden md:last:flex'>
                          <Icon
                            icon={item.icon}
                            className='size-5 text-primary'
                            aria-label={item.label}
                          />
                          <span className='text-sm text-foreground'>
                            {item.label}
                          </span>
                        </div>
                      </AnimationContainer>
                    ))}
                  </div>
                </div>
              </AnimationContainer>

              <AnimationContainer animation='fadeUp' delay={0.6}>
                <div className='flex flex-row items-center justify-center gap-4 mt-6'>
                  <Button
                    asChild
                    onClick={handleClick}
                    size='lg'
                    variant='default'
                    className='px-8 w-full max-w-lg bg-emerald-500 hover:bg-emerald-400'
                  >
                    <Link href=''>Register now</Link>
                  </Button>

                  <Button
                    asChild
                    size='lg'
                    variant='secondary'
                    className='px-8 w-full max-w-lg'
                  >
                    <Link href=''>Learn More</Link>
                  </Button>
                </div>
              </AnimationContainer>
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

export { Banner }
