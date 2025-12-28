'use client'

import { useEffect } from 'react'
import { env } from '@/config/environment'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SellerAuthLayout } from '@/components/layouts/seller-auth-layout'
import AnimationContainer from '@/components/atoms/animation-container'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import { SellerSignInFormSection } from './components/organisms/seller-sign-in-form-section'

const SellerSignInView = () => {
  const router = useRouter()

  useEffect(() => {
    // Check if seller is already logged in
    const sellerToken = localStorage.getItem('seller_token')
    if (sellerToken) {
      // Redirect to dashboard or home
      window.location.href = env.seller.dashboardUrl
    }
  }, [])

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
