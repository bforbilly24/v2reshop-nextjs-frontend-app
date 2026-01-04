'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SellerAuthLayout } from '@/components/layouts/seller-auth-layout'
import AnimationContainer from '@/components/atoms/animation-container'
import { AuthLoadingState } from '@/components/atoms/auth-loading-state'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import { SellerSignInFormSection } from './components/organisms/seller-sign-in-form-section'

const SellerSignInView = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (status === 'authenticated' && session) {
        router.push('/')
        return
      }

      if (status !== 'loading') {
        setIsChecking(false)
      }
    }

    checkAuth()
  }, [session, status, router])

  if (isChecking) {
    return <AuthLoadingState message='Checking authentication...' />
  }

  return (
    <SellerAuthLayout>
      <div className='mx-auto w-full max-w-md space-y-6'>
        <div className='space-y-1'>
          <AnimationContainer animation='fadeLeft' delay={0.2}>
            <TypingAnimation
              duration={50}
              className='text-card-foreground text-xl font-semibold'
            >
              Welcome back, Seller
            </TypingAnimation>
          </AnimationContainer>
          <AnimationContainer animation='fadeUp' delay={0.4}>
            <p className='text-xs'>
              Sign in to your seller account to manage your store
            </p>
          </AnimationContainer>
        </div>

        <AnimationContainer animation='fadeDown' delay={0.6}>
          <div className='space-y-6'>
            <SellerSignInFormSection />
            <div className='text-xs text-center'>
              <span className=''>Don&apos;t have a seller account? </span>
              <Link
                href='/seller/auth/sign-up'
                className='text-chart-1 font-bold hover:underline'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </AnimationContainer>

        <AnimationContainer animation='fadeUp' delay={0.8}>
          <div className='space-y-3'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-card px-2 text-muted-foreground'>Or</span>
              </div>
            </div>
            <Button
              className='w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
              asChild
            >
              <Link href='/auth/sign-in'>
                <Icon icon='ph:shopping-bag' className='w-5 h-5' />
                Sign In as Buyer
              </Link>
            </Button>

            <div className='text-center text-sm text-muted-foreground'>
              <Link
                href='/'
                className='underline underline-offset-4 hover:text-primary'
              >
                Back to home
              </Link>
            </div>
          </div>
        </AnimationContainer>
      </div>
    </SellerAuthLayout>
  )
}

export { SellerSignInView }
