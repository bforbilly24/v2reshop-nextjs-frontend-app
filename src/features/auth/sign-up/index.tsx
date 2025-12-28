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
import { SignUpFormSection } from './components/organisms/sign-up-form-section'

const SignUpView = () => {
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
        <AuthTitle>Create an account</AuthTitle>
        <AuthDescription className='mt-4'>
          Join ReShop today and discover amazing deals on quality products
        </AuthDescription>
      </AuthHeader>
      <AuthForm>
        <SignUpFormSection />
      </AuthForm>
      <AuthFooter>
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link
            href='/auth/sign-in'
            className='font-semibold underline underline-offset-4 hover:text-primary'
          >
            Sign In
          </Link>
        </div>
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

export { SignUpView }
