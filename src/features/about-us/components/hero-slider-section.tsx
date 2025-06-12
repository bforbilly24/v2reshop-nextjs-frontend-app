'use client'

import { useRef, useState } from 'react'
import { HEROSLIDERABOUT, SlideItem } from '@/constant'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import Image from 'next/image'
import Link from 'next/link'
import { handleSmoothScroll } from '@/utils/smooth-scroll'
import { Button } from '@/components/ui/shadcn/button'
import { BoxReveal } from '@/components/ui/magicui/box-reveal'
import { InteractiveHoverButton } from '@/components/ui/magicui/interactive-hover-button'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'
import SectionBadge from '@/components/ui/section-badge'

const heroImage = `relative w-full h-[60vh] md:h-[80vh] lg:h-screen before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black before:opacity-30 before:z-[1] before:pointer-events-none overflow-hidden`
const heroContent = `absolute w-full max-w-7xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] h-full flex items-center justify-center`

interface HeroSliderSectionProps {
  heroItems?: SlideItem[]
}

interface SplideRef {
  splide: {
    go: (direction: string) => void
  }
}

const HeroSliderSection: React.FC<HeroSliderSectionProps> = ({
  heroItems = HEROSLIDERABOUT,
}) => {
  const splideRef = useRef<SplideRef | null>(null)
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  const handleMoved = (_splide: unknown, newIndex: number) => {
    setCurrentSlide(newIndex)
  }

  const prevSlide = () => {
    splideRef.current?.splide.go('<')
  }

  const nextSlide = () => {
    splideRef.current?.splide.go('>')
  }

  return (
    <div className='relative flex justify-center items-center w-full'>
      <div className='flex justify-center items-center w-full flex-1'>
        <div className='relative w-full'>
          <Splide
            ref={splideRef}
            options={{
              direction: 'ttb',
              height: '100vh',
              type: 'loop',
              autoplay: true,
              interval: 5000,
              pauseOnHover: true,
              arrows: false,
              pagination: false,
              width: '100%',
              breakpoints: {
                1280: {
                  height: '980px',
                  width: '100%',
                },
              },
            }}
            onMoved={handleMoved}
            aria-label='About us hero slider'
            className='hero-area'
          >
            {heroItems.map((slide: SlideItem) => (
              <SplideSlide key={slide.id} className='w-full'>
                <div className={heroImage}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className='object-cover'
                    quality={70}
                    priority
                  />
                  <div className={heroContent}>
                    <Wrapper className='flex flex-col items-center justify-center'>
                      <div className='grid grid-cols-12 gap-4 mx-auto w-full'>
                        <div className='col-span-2 text-white hidden xl:flex flex-col justify-between h-full'>
                          <span>{slide.heroYear}</span>
                          <ul className='space-y-4'>
                            <li>
                              <Link
                                href='https://twitter.com'
                                target='_blank'
                                aria-label='Twitter'
                              >
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='fill-background hover:fill-foreground'
                                >
                                  <Icon
                                    icon={slide.twitterIcon}
                                    className='size-5'
                                  />
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href='https://facebook.com'
                                target='_blank'
                                aria-label='Facebook'
                              >
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='fill-background hover:fill-foreground'
                                >
                                  <Icon
                                    icon={slide.facebookIcon}
                                    className='size-5'
                                  />
                                </Button>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href='https://plus.google.com'
                                target='_blank'
                                aria-label='Google'
                              >
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  className='fill-background hover:fill-foreground'
                                >
                                  <Icon
                                    icon={slide.googleIcon}
                                    className='size-5'
                                  />
                                </Button>
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className='col-span-8 xl:col-span-9'>
                          <AnimationContainer
                            animation='fadeLeft'
                            delay={0.2}
                            className='w-fit'
                          >
                            <SectionBadge title={slide.heroCategory} />
                          </AnimationContainer>
                          <AnimationContainer
                            animation='fadeLeft'
                            delay={0.8}
                            className='w-fit mt-8'
                          >
                            <BoxReveal boxColor='#10b981' duration={1}>
                              <h2
                                className='text-[50px] leading-[1.2] text-white mb-[30px] xl:text-[100px] xl:leading-[100px]'
                                dangerouslySetInnerHTML={{
                                  __html: slide.heroTitle,
                                }}
                              />
                            </BoxReveal>
                          </AnimationContainer>
                          <AnimationContainer
                            animation='fadeLeft'
                            delay={1}
                            className='w-fit'
                          >
                            <Link href='/contact-us'>
                              <InteractiveHoverButton
                                icon='lucide:phone'
                                className='bg-emerald-500 group-hover:text-emerald-500 rounded-md border-none hover h-16 text-lg uppercase text-white mt-12 px-8 py-2'
                              >
                                Contact Us
                              </InteractiveHoverButton>
                            </Link>
                          </AnimationContainer>
                        </div>

                        <div className='col-span-1 flex flex-col justify-between items-center h-full'>
                          <div className='flex flex-col items-center gap-y-2'>
                            <Icon
                              icon='mdi:chevron-up'
                              className='mb-4 size-8 cursor-pointer text-white hover:text-gray-400 transition-colors'
                              onClick={prevSlide}
                              aria-label='Previous slide'
                            />
                            <Icon
                              icon='mdi:chevron-down'
                              className='mt-4 size-8 cursor-pointer text-white hover:text-gray-400 transition-colors'
                              onClick={nextSlide}
                              aria-label='Next slide'
                            />
                          </div>

                          <div className='flex flex-col items-center gap-y-2'>
                            <div className='text-base text-white'>
                              {(currentSlide + 1).toString().padStart(2, '0')}
                            </div>
                            <div className='h-16 w-0 border border-white' />
                            <div className='text-base text-white'>
                              {heroItems.length.toString().padStart(2, '0')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='text-sm uppercase absolute bottom-4 right-4 lg:right-20'>
                        <Button asChild variant='ghost' className='text-white'>
                          <Link href='tel:contact@reshopid.com'>
                            contact@reshopid.com
                          </Link>
                        </Button>
                      </div>
                    </Wrapper>
                  </div>

                  <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-[2]'>
                    <Link href='#about' onClick={handleSmoothScroll}>
                      <div className='flex flex-col items-center gap-0.5 group cursor-pointer'>
                        <Icon
                          icon='mdi:chevron-down'
                          className='size-8 text-background animate-bounce'
                          style={{
                            animationDelay: '0s',
                            animationDuration: '2s',
                          }}
                          aria-label='Scroll to categories'
                        />
                        <Icon
                          icon='mdi:chevron-down'
                          className='size-8 text-background animate-bounce'
                          style={{
                            animationDelay: '0.3s',
                            animationDuration: '2s',
                          }}
                          aria-label='Scroll to categories'
                        />
                        <Icon
                          icon='mdi:chevron-down'
                          className='size-8 text-background animate-bounce'
                          style={{
                            animationDelay: '0.6s',
                            animationDuration: '2s',
                          }}
                          aria-label='Scroll to categories'
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </div>
      </div>
    </div>
  )
}

export { HeroSliderSection }
