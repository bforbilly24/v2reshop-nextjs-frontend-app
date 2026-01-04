'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/atoms/alert'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import {
  loginSchema,
  type LoginInput,
} from '@/features/auth/validations/schema'

interface SignInFormSectionProps {
  onSuccess?: () => void
}

const SignInFormSection: React.FC<SignInFormSectionProps> = ({ onSuccess }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
        toast.error('Sign In Failed', {
          description: 'Invalid email or password. Please try again.',
        })
      } else if (result?.ok) {
        toast.success('Sign In Successful', {
          description: 'Welcome back! Start exploring products.',
        })
        if (onSuccess) {
          onSuccess()
        } else {
          const callbackUrl = searchParams.get('callbackUrl') || '/reproduct'
          router.push(callbackUrl)
          router.refresh()
        }
      }
    } catch {
      setError('Something went wrong')
      toast.error('Error', {
        description: 'Something went wrong. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-8'>
      {error && (
        <Alert variant='destructive'>
          <Icon icon='ph:warning-circle' className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label>Email</Label>
        <div className='relative mt-4'>
          <Icon
            icon='ph:envelope-simple'
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 z-10 pointer-events-none'
          />
          <Input
            id='email'
            type='email'
            placeholder='name@example.com'
            className='border-none focus:ring-gray-300 pl-10'
            {...register('email')}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label>Password</Label>
        <div className='relative mt-4'>
          <Icon
            icon='ph:lock-simple'
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400 z-10 pointer-events-none'
          />
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            className='border-none focus:ring-gray-300 pl-10 pr-10'
            {...register('password')}
            disabled={isLoading}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            <Icon
              icon={showPassword ? 'ph:eye-slash' : 'ph:eye'}
              className='h-5 w-5'
            />
          </button>
        </div>
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>{errors.password.message}</p>
        )}
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? (
          <>
            <Icon
              icon='ph:circle-notch'
              className='mr-2 h-4 w-4 animate-spin'
            />
            Signing in...
          </>
        ) : (
          <>
            <Icon icon='ph:sign-in' className='mr-2 h-4 w-4' />
            Sign in
          </>
        )}
      </Button>
    </form>
  )
}

export { SignInFormSection }
