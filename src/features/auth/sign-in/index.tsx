'use client'

import { useEffect, useState } from 'react'
import { env } from '@/config/environment'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { hasSellerToken } from '@/utils/secure-token'
import {
  AuthLayout,
  AuthHeader,
  AuthTitle,
  AuthDescription,
  AuthForm,
  AuthFooter,
} from '@/components/layouts/auth-layout'
import { AuthLoadingState } from '@/components/atoms/auth-loading-state'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { SignInFormSection } from './components/organisms/sign-in-form-section'

const SignInView = () => {
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
    <AuthLayout useIllustration={true}>
      <AuthHeader>
        <AuthTitle>Welcome back!</AuthTitle>
        <AuthDescription className='mt-4'>
          Sign in to your account to continue shopping and manage your orders
        </AuthDescription>
      </AuthHeader>
      <AuthForm>
        <SignInFormSection />
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            href='/auth/sign-up'
            className='font-semibold underline underline-offset-4 hover:text-primary'
          >
            Sign Up
          </Link>
        </div>
      </AuthForm>
      <AuthFooter>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>Or</span>
          </div>
        </div>
        <Button
          className='w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white'
          asChild
        >
          <Link href='/seller/auth/sign-in'>
            <Icon icon='ph:storefront' className='w-5 h-5' />
            Sign In as Seller
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
      </AuthFooter>
    </AuthLayout>
  )
}

export { SignInView }
