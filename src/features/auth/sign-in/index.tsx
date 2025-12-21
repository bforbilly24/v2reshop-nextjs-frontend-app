import Link from 'next/link'
import { Icon } from '@/components/atoms/icon'
import { SignInForm } from '../components/sign-in-form'
import { AuthLayout } from '@/components/layouts/auth/auth-layout'

const SignIn: React.FC = () => {
  return (
    <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-zinc-900' />
        <div className='relative z-20 flex flex-col items-center justify-center h-full'>
          <div className='flex space-x-1 items-center justify-start w-full'>
            <Icon
              icon='fluent:building-shop-20-filled'
              className='size-6 text-white'
            />
            <p className='text-lg font-medium'>ReShop</p>
          </div>
          <div className='w-full h-full flex items-center justify-center'>
            <Icon
              icon='fluent:building-shop-20-filled'
              className='size-52 text-white'
            />
          </div>
        </div>

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              &ldquo;A sustainable e-commerce platform for quality second-hand
              products with integrated community and charity features.&rdquo;
            </p>
            <footer className='text-sm'>Re-Shop Team</footer>
          </blockquote>
        </div>
      </div>
          <AuthLayout>

      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password below to log in to your account.
            </p>
          </div>
          <SignInForm />
          <p className='px-8 text-center text-sm text-muted-foreground'>
            By clicking login, you agree{' '}
            <Link
              href='/terms'
              className='underline underline-offset-4 hover:text-primary'
            >
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link
              href='/privacy'
              className='underline underline-offset-4 hover:text-primary'
            >
              Privacy Policy{' '}
            </Link>
            .
          </p>
        </div>
      </div>
      </AuthLayout>
    </div>
  )
}
export { SignIn }
