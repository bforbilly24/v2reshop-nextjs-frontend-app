'use client'

import { FAQABOUT } from '@/constant'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/atoms/accordion'
import AnimationContainer from '@/components/atoms/animation-container'
import SectionBadge from '@/components/atoms/section-badge'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'

const FaqSection: React.FC = () => {
  return (
    <Wrapper className='py-20 lg:py-32 relative'>
      <div className='flex flex-col items-center justify-center gap-y-5'>
        <div className='flex flex-col items-center justify-center text-center mb-8 gap-y-4'>
          <AnimationContainer animation='fadeUp' delay={0.2}>
            <SectionBadge title='FAQ' />
          </AnimationContainer>
          <AnimationContainer animation='fadeUp' delay={0.3}>
            <TypingAnimation
              duration={50}
              className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
            >
              Still have questions?
            </TypingAnimation>
          </AnimationContainer>
          <AnimationContainer animation='fadeUp' delay={0.3}>
            <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
              Here are some of the most frequently asked questions we receive.
              If you have a question that isn&apos;t answered here, please
              don&apos;t hesitate to contact us.
            </p>
          </AnimationContainer>
        </div>
        <div className='w-full max-w-4xl'>
          <Accordion type='single' collapsible className='w-full space-y-4'>
            {FAQABOUT.map((faq, index) => (
              <AnimationContainer
                key={index}
                animation='fadeUp'
                delay={0.5 + index * 0.1}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className='border-none bg-slate-100 dark:bg-slate-900 rounded-2xl px-6'
                >
                  <AccordionTrigger className='hover:no-underline py-6 text-lg text-left font-normal'>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className='text-muted-foreground text-lg text-left'>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimationContainer>
            ))}
          </Accordion>
        </div>
      </div>
    </Wrapper>
  )
}

export { FaqSection }
