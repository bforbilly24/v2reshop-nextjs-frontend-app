'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SellerAuthLayout } from '@/components/layouts/seller-auth-layout'
import { SellerSignUpFormSection } from './components/organisms/seller-sign-up-form-section'
import AnimationContainer from '@/components/atoms/animation-container'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import { env } from '@/config/environment'

const SellerSignUpView = () => {
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
              Create Seller Account
            </TypingAnimation>
          </AnimationContainer>
          <AnimationContainer animation='fadeUp' delay={0.4}>
            <p className='text-xs'>Sign up to start selling on ReShop</p>
          </AnimationContainer>
        </div>

        <AnimationContainer animation='fadeDown' delay={0.6}>
          <div className='space-y-6'>
            <SellerSignUpFormSection />
          </div>
        </AnimationContainer>
        
        <AnimationContainer animation='fadeUp' delay={0.8}>
          <div className='text-xs'>
            <span className=''>Already have a seller account? </span>
            <Link href='/seller/auth/sign-in' className='text-chart-1 font-bold hover:underline'>
              Sign In
            </Link>
          </div>
        </AnimationContainer>
      </div>
    </SellerAuthLayout>
  )
}

export { SellerSignUpView }
