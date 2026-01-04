'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AuthLayout,
  AuthHeader,
  AuthTitle,
  AuthDescription,
  AuthForm,
  AuthFooter,
} from '@/components/layouts/auth-layout'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { AuthLoadingState } from '@/components/atoms/auth-loading-state'
import { SignUpFormSection } from './components/organisms/sign-up-form-section'

const SignUpView = () => {
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
    <AuthLayout useIllustration={true}>
      <AuthHeader>
        <AuthTitle>Create an account</AuthTitle>
        <AuthDescription className='mt-4'>
          Join ReShop today and discover amazing deals on quality products
        </AuthDescription>
      </AuthHeader>
      <AuthForm>
        <SignUpFormSection />
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link
            href='/auth/sign-in'
            className='font-semibold underline underline-offset-4 hover:text-primary'
          >
            Sign In
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
        
            <Button className='w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white' asChild>
          <Link href='/seller/auth/sign-up'>
            <Icon icon='ph:storefront' className='w-5 h-5' />
            Sign Up as Seller
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

export { SignUpView }
