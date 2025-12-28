'use client'

import type { ComponentProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Card, CardContent } from '@/components/atoms/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'

interface SellerAuthLayoutProps {
  children: React.ReactNode
}

export function SellerAuthLayout({ children }: SellerAuthLayoutProps) {
  return (
    <section className='container mx-auto items-center flex flex-col min-h-screen justify-center'>
        <div className='max-w-3xl flex flex-col items-center justify-center'>
      <Card className='md:bg-sidebar/70 relative grid min-h-140 grid-cols-1 gap-0 overflow-hidden border-0 bg-transparent p-0 md:grid-cols-2'>
          <div className="relative isolate min-h-96 flex-1 overflow-hidden">
            <div className="via-sidebar/30 from-sidebar/70 to-sidebar/10 absolute inset-x-0 bottom-0 z-[-1] h-0 bg-gradient-to-t md:h-12" />
            <div className="bg-background absolute top-0 left-1/2 -z-1 h-200 w-300 -translate-x-1/2 translate-y-1/5 rounded-full blur-2xl will-change-transform md:hidden"></div>

            <div className="bg-background/10 absolute inset-0 -z-2 backdrop-blur-[85px] will-change-transform md:backdrop-blur-[92px]" />
            <Image
              src="/images/auth/noise.webp"
              alt="Noise texture"
              fill
              className="mask-b-from-40% mask-b-to-80% object-cover opacity-30 md:opacity-20"
            />
            <GradientSVG className="absolute top-0 right-0 -z-10 scale-250 opacity-80 md:scale-100 md:opacity-100" />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <Link href='/' className='inline-block'>
                <Image
                  src='/images/brand/brand-name.png'
                  alt='ReShop'
                  height={40}
                  width={134}
                />
              </Link>

              <div className='space-y-4'>
                <Quote className='fill-foreground text-foreground size-10 rotate-180 opacity-10 md:size-16' />
                <blockquote className='mt-0.5 text-lg font-medium'>
                  The best platform for sellers. ReShop makes managing and growing your business effortless!
                </blockquote>

                <figure className='flex items-center gap-4'>
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src='/images/brand/app-brand.svg' alt='ReShop' />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <figcaption>
                    <cite className='block text-xs font-bold not-italic'>
                      ReShop
                    </cite>
                    <p className='text-[0.625rem]'>Verified Platform</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <CardContent className='md:bg-sidebar/70 relative flex flex-1 flex-col justify-center px-4 py-8 md:px-10 md:py-15'>
            {children}
          </CardContent>
        </Card>

        <div className='text-muted-foreground mx-auto mt-8 max-w-md text-center text-xs'>
          By continuing, you agree to ReShop&apos;s Terms of Service and Privacy
          Policy, and to receive periodic emails with updates.
        </div>

        <div className='text-muted-foreground mx-auto mt-4 text-center text-sm'>
          Want to shop instead?{' '}
          <Link href='/auth/sign-in' className='text-emerald-600 hover:text-emerald-700 font-medium hover:underline'>
            Sign In as Buyer
          </Link>
        </div>
      </div>
    </section>
  )
}

export function SellerAuthHeader({
  className,
  ...props
}: ComponentProps<'div'>) {
  return <div className={cn('space-y-1', className)} {...props} />
}

export function SellerAuthTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('text-xl font-semibold text-card-foreground', className)}
      {...props}
    />
  )
}

export function SellerAuthDescription({
  className,
  ...props
}: ComponentProps<'p'>) {
  return <p className={cn('text-xs', className)} {...props} />
}

export function SellerAuthForm({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6', className)} {...props} />
}

export function SellerAuthFooter({
  className,
  ...props
}: ComponentProps<'div'>) {
  return <div className={cn('mt-6 text-xs', className)} {...props} />
}

const GradientSVG = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={327}
      height={303}
      fill='none'
      {...props}
    >
      <path
        fill='#D9D9D9'
        d='M-71.305 280.86-150.61 96.276-95.707-8.827 62.906 26.207l51.767 93.077L-71.305 280.86Z'
      />
      <path
        fill='url(#a)'
        d='M-71.305 280.86-150.61 96.276-95.707-8.827 62.906 26.207l51.767 93.077L-71.305 280.86Z'
      />
      <path
        stroke='url(#b)'
        strokeWidth={0.3}
        d='M-71.305 280.86-150.61 96.276-95.707-8.827 62.906 26.207l51.767 93.077L-71.305 280.86Z'
      />
      <path
        fill='url(#c)'
        d='m170.12 132.555 96.526-169.871c23.977-4.977-24 45.673 0 88.424 38.178 68.006 141.589 148.489 121.896 198.953-32.073 82.188-145.547 23.502-188.176 0-34.103-18.801-34.373-86.171-30.246-117.506Z'
      />
      <path
        fill='url(#d)'
        d='M-223.33 287.284 207.724-6.649l61.871-31.659-22.252 93.349-74.353 196.285c-13.207 23.76-52.934 57.023-106.194 0-46.786-50.092-221.56-1.886-290.126 35.958l-21.738 14.823c4.8-4.551 12.253-9.588 21.738-14.823Z'
      />
      <g filter='url(#e)'>
        <path
          fill='url(#f)'
          d='m173.621 215.759 78.174-268.327 2.211 154.951-80.385 113.376Z'
        />
      </g>
      <defs>
        <linearGradient
          id='a'
          x1={-17.969}
          x2={-17.766}
          y1={-8.827}
          y2={281.018}
          gradientUnits='userSpaceOnUse'
        >
          <stop offset={0} stopColor='#6ee7b7' />
          <stop offset={0.516} stopColor='#34d399' />
        </linearGradient>
        <linearGradient
          id='b'
          x1={-17.969}
          x2={-17.969}
          y1={-8.827}
          y2={280.86}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#10b981' />
          <stop offset={1} stopColor='#10b981' stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id='c'
          x1={168.309}
          x2={318.523}
          y1={206.201}
          y2={206.258}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#059669' />
          <stop offset={0.514} stopColor='#10b981' />
          <stop offset={1} stopColor='#34d399' />
        </linearGradient>
        <linearGradient
          id='d'
          x1={75.661}
          x2={75.842}
          y1={-38.308}
          y2={292.574}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#10b981' />
          <stop offset={1} stopColor='#059669' />
        </linearGradient>
        <linearGradient
          id='f'
          x1={238.974}
          x2={140.96}
          y1={29.317}
          y2={159.747}
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#34d399' />
          <stop offset={0.505} stopColor='#10b981' />
          <stop offset={1} stopColor='#059669' />
        </linearGradient>
        <filter
          id='e'
          width={108.658}
          height={296.6}
          x={159.484}
          y={-66.705}
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feBlend in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
          <feGaussianBlur
            result='effect1_foregroundBlur_434_3989'
            stdDeviation={7.068}
          />
        </filter>
      </defs>
    </svg>
  )
}
