import Link from 'next/link'
import { AuthLayout } from '@/components/layouts/auth/auth-layout'
import { Card } from '@/components/ui/shadcn/card'
import { SignUpForm } from '../components/sign-up-form'

const SignUp: React.FC = () => {
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='mb-2 flex flex-col space-y-2 text-left'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password to create an account.
          </p>
        </div>
        <SignUpForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By creating an account, you agree to our{' '}
          <Link
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </Link>
          .
        </p>
      </Card>
    </AuthLayout>
  )
}
export { SignUp }
