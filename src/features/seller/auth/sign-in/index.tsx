'use client'

import { useEffect, useState } from 'react'
import { env } from '@/config/environment'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { hasSellerToken } from '@/utils/secure-token'
import { SellerAuthLayout } from '@/components/layouts/seller-auth-layout'
import AnimationContainer from '@/components/atoms/animation-container'
import { AuthLoadingState } from '@/components/atoms/auth-loading-state'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import { SellerSignInFormSection } from './components/organisms/seller-sign-in-form-section'

const SellerSignInView = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const hasToken = await hasSellerToken()
      if (hasToken) {
        window.location.href = env.seller.dashboardUrl
        return
      }

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
          </div>
        </AnimationContainer>

        <AnimationContainer animation='fadeUp' delay={0.8}>
          <div className='text-xs'>
            <span className=''>Don&apos;t have a seller account? </span>
            <Link
              href='/seller/auth/sign-up'
              className='text-chart-1 font-bold hover:underline'
            >
              Sign Up
            </Link>
          </div>
        </AnimationContainer>
      </div>
    </SellerAuthLayout>
  )
}

export { SellerSignInView }
