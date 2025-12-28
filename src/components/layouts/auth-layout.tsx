'use client'

import type { ComponentProps } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { AuthIllustration } from '@/features/auth/components/atoms/auth-illustration'

interface AuthLayoutProps extends ComponentProps<'div'> {
  imgSrc?: string
  imgClassName?: string
  useIllustration?: boolean
}

export function AuthLayout({
  className,
  children,
  imgSrc,
  imgClassName,
  useIllustration = true,
  ...props
}: AuthLayoutProps) {
  return (
    <section
      className={cn(
        'bg-background min-h-screen w-full py-10 md:py-20',
        className
      )}
      {...props}
    >
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:gap-40'>
          <div>
            <Link
              href='/'
              className='inline-block mb-4'
            >
              <Image
                src='/images/brand/brand-name.png'
                alt='ReShop'
                height={40}
                width={134}
              />
            </Link>
            {children}
          </div>
          {useIllustration ? (
            <div className='hidden md:block'>
              <AuthIllustration />
            </div>
          ) : (
            imgSrc && <AuthImage imgSrc={imgSrc} className={cn('', imgClassName)} />
          )}
        </div>
      </div>
    </section>
  )
}

interface AuthImageProps extends ComponentProps<'div'> {
  imgSrc: string
}

export function AuthImage({ className, imgSrc, ...props }: AuthImageProps) {
  return (
    <div
      className={cn(
        'relative hidden min-h-[500px] md:block rounded-lg overflow-hidden',
        className
      )}
      {...props}
    >
      <Image
        src={imgSrc}
        alt='Welcome'
        fill
        sizes='(max-width: 1200px) 50vw, 600px'
        priority
        className='object-cover'
      />
    </div>
  )
}

export function AuthHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('space-y-2 text-left', className)} {...props} />
}

export function AuthTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      className={cn(
        'text-2xl lg:text-4xl font-semibold leading-tight tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export function AuthDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p className={cn('text-sm text-muted-foreground max-w-xl', className)} {...props} />
  )
}

export function AuthForm({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6 flex flex-col gap-8', className)} {...props} />
}

export function AuthFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6 flex flex-col gap-4', className)} {...props} />
}
