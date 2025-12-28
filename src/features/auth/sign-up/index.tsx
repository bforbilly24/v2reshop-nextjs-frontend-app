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
import { SignUpFormSection } from './components/organisms/sign-up-form-section'

const SignUpView = () => {
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
