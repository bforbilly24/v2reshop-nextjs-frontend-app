'use client'

import Link from 'next/link'
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
import { LoginFormSection } from './components/organisms/login-form-section'

const LoginView = () => {
  return (
    <AuthLayout imgSrc='/images/auth/welcome.svg'>
      <AuthHeader>
        <AuthTitle>Sign In</AuthTitle>
        <AuthDescription>Sign in to your account to continue</AuthDescription>
      </AuthHeader>
      <AuthForm>
        <LoginFormSection />
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
        <Button variant='outline' className='w-full' asChild>
          <Link
            href='https://reshop.circleit.dev/seller/login'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Icon icon='ph:storefront' className='w-5 h-5' />
            Login as Seller
          </Link>
        </Button>
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link
            href='/auth/register'
            className='underline underline-offset-4 hover:text-primary'
          >
            Register
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

export { LoginView }
