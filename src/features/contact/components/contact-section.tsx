'use client'

import { CONTACT } from '@/constant'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import SectionBadge from '@/components/ui/section-badge'

const ContactSection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center mb-8 gap-y-4'>
          <AnimationContainer animation='fadeDown' delay={0.2}>
            <SectionBadge title='Contact' />
          </AnimationContainer>
          <AnimationContainer animation='fadeDown' delay={0.4}>
            <TypingAnimation
              duration={50}
              className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
            >
                We&apos;d love to hear from you!
            </TypingAnimation>
          </AnimationContainer>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-3 w-full'>
          {CONTACT.map(
            (
              { icon: Icon, title, description, linkText, href, target },
              index
            ) => (
              <div
                key={title}
                className={cn(
                  'flex flex-col lg:border-r transform-gpu py-10 relative group/contact border-emerald-800',
                  index === 0 && 'lg:border-l',
                  index < 2 && 'lg:border-b'
                )}
              >
                <AnimationContainer animation='fadeLeft' delay={0.8}>
                  {index < 2 && (
                    <div className='opacity-0 group-hover/contact:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-emerald-500/25 to-transparent pointer-events-none' />
                  )}
                  {index >= 2 && (
                    <div className='opacity-0 group-hover/contact:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-emerald-500/25 to-transparent pointer-events-none' />
                  )}
                  <div className='group-hover/contact:-translate-y-1 transform-gpu transition-all duration-300 flex flex-col w-full'>
                    <div className='mb-4 relative z-10 px-6'>
                      <Icon className='size-10 text-foreground transition-all duration-300 ease-in-out group-hover/contact:scale-75 group-hover/contact:text-emerald-500' />
                    </div>
                    <div className='text-lg font-medium font-heading mb-2 relative z-10 px-6'>
                      <div className='absolute left-0 -inset-y-0 h-6 group-hover/contact:h-8 w-1 rounded-tr-full rounded-br-full bg-emerald-700 group-hover/contact:bg-emerald-500 transition-all duration-500 origin-center' />
                      <span className='group-hover/contact:-translate-y-1 group-hover/contact:text-foreground transition duration-500 inline-block'>
                        {title}
                      </span>
                    </div>
                    <p className='text-sm text-muted-foreground max-w-xs relative z-10 px-6'>
                      {description}
                    </p>
                    <Link
                      className='font-medium text-foreground hover:underline relative z-10 px-6 mt-2'
                      href={href}
                      target={target}
                    >
                      {linkText}
                    </Link>
                  </div>
                </AnimationContainer>
              </div>
            )
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export { ContactSection }
