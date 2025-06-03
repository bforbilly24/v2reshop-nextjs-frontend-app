import { TESTIMONIALS } from '@/constant'
import { StarIcon, UserIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Marquee } from '@/components/ui/magicui/marquee'
import AnimationContainer from '@/components/global/animation-container'
import SectionBadge from '@/components/ui/section-badge'

const firstRow = TESTIMONIALS.slice(0, TESTIMONIALS.length / 2)
const secondRow = TESTIMONIALS.slice(TESTIMONIALS.length / 2)

const TestimonialsSection = () => {
  return (
    <div className='py-20 lg:py-32'>
      <div className='flex flex-col items-center text-center gap-4 mb-16'>
        <AnimationContainer animation='fadeUp' delay={0.2}>
          <SectionBadge title='Testimonials' />
        </AnimationContainer>

        <AnimationContainer animation='fadeUp' delay={0.3}>
          <h2 className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'>
            Loved by real estate
            <br />
            professionals
          </h2>
        </AnimationContainer>

        <AnimationContainer animation='fadeUp' delay={0.4}>
          <p className='text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto'>
            See what our users have to say about their experience with our
            platform
          </p>
        </AnimationContainer>
      </div>

      <AnimationContainer animation='fadeUp' delay={0.5}>
        <div className='relative w-full'>
          <div className='absolute -left-1 top-0 w-20 h-full bg-gradient-to-r from-background dark:from-foreground to-transparent z-10' />
          <div className='absolute -right-1 top-0 w-20 h-full bg-gradient-to-l from-background dark:from-foreground to-transparent z-10' />

          <div className='relative flex h-full w-full flex-col items-center justify-center overflow-hidden'>
            <Marquee pauseOnHover className='[--duration:20s] select-none'>
              {firstRow.map((review, index) => (
                <figure
                  key={review.name}
                  className={cn(
                    'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 h-full flex flex-col justify-between',
                    'border-zinc-50/[.1] bg-background hover:bg-zinc-50/[.15]'
                  )}
                >
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2 justify-start'>
                      <UserIcon className='w-6 h-6' />
                      <div className='flex flex-col'>
                        <figcaption className='text-sm font-medium'>
                          {review.name}
                        </figcaption>
                        <p className='text-xs font-medium text-muted-foreground'>
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className='mt-2 text-sm'>
                      {review.content}
                    </blockquote>
                  </div>

                  <AnimationContainer
                    animation='fadeUp'
                    delay={0.9 + index * 0.1}
                    className='mt-2'
                  >
                    <div className='flex gap-1'>
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className='w-5 h-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                  </AnimationContainer>
                </figure>
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className='[--duration:20s] select-none'
            >
              {secondRow.map((review, index) => (
                <figure
                  key={review.name}
                  className={cn(
                    'relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 h-full flex flex-col justify-between items-start',
                    'border-zinc-50/[.1] bg-background hover:bg-zinc-50/[.15]'
                  )}
                >
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-row items-center gap-2 justify-start'>
                      <UserIcon className='w-6 h-6' />
                      <div className='flex flex-col'>
                        <figcaption className='text-sm font-medium'>
                          {review.name}
                        </figcaption>
                        <p className='text-xs font-medium text-muted-foreground'>
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className='mt-2 text-sm'>
                      {review.content}
                    </blockquote>
                  </div>

                  <AnimationContainer
                    animation='fadeUp'
                    delay={0.9 + index * 0.1}
                    className='mt-2'
                  >
                    <div className='flex gap-1'>
                      {[...Array(review.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className='w-5 h-5 fill-yellow-400 text-yellow-400'
                        />
                      ))}
                    </div>
                  </AnimationContainer>
                </figure>
              ))}
            </Marquee>
            <div className='pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-foreground'></div>
            <div className='pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-foreground'></div>
          </div>
        </div>
      </AnimationContainer>
    </div>
  )
}

export { TestimonialsSection }
