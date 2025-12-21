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
import { RegisterFormSection } from './components/organisms/register-form-section'

const RegisterView = () => {
  return (
    <AuthLayout imgSrc="/images/auth/welcome.svg">
      <AuthHeader>
        <AuthTitle>Register</AuthTitle>
        <AuthDescription>Create your account to get started</AuthDescription>
      </AuthHeader>
      <AuthForm>
        <RegisterFormSection />
      </AuthForm>
      <AuthFooter>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Login
          </Link>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          <Link
            href="/"
            className="underline underline-offset-4 hover:text-primary"
          >
            Back to home
          </Link>
        </div>
      </AuthFooter>
    </AuthLayout>
  )
}

export { RegisterView }
