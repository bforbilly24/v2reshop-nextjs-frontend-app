'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/atoms/alert'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { registerUser } from '@/features/auth/actions'
import {
  registerSchema,
  type RegisterInput,
} from '@/features/auth/validations/schema'

interface SignUpFormSectionProps {
  onSuccess?: () => void
}

const SignUpFormSection: React.FC<SignUpFormSectionProps> = ({ onSuccess }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        role: 'customer',
      })

      if (response.status) {
        toast.success('Sign Up Successful', {
          description: 'Your account has been created. Signing you in...',
        })

        const result = await signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        })

        if (result?.error) {
          setError(
            'Sign up successful but sign in failed. Please try signing in.'
          )
          toast.error('Auto-sign in Failed', {
            description: 'Please try signing in manually.',
          })
        } else if (result?.ok) {
          if (onSuccess) {
            onSuccess()
          } else {
            router.push('/reproduct')
            router.refresh()
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      toast.error('Sign Up Failed', {
        description: errorMessage,
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
        <Label>Full Name</Label>
        <Input
          id='name'
          type='text'
          placeholder='John Doe'
          className='mt-4 border-none focus:ring-gray-300'
          {...register('name')}
          disabled={isLoading}
        />
        {errors.name && (
          <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='name@example.com'
          className='mt-4 border-none focus:ring-gray-300'
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label>Phone Number</Label>
        <Input
          id='phone'
          type='tel'
          placeholder='081234567890'
          className='mt-4 border-none focus:ring-gray-300'
          {...register('phone')}
          disabled={isLoading}
        />
        {errors.phone && (
          <p className='text-sm text-red-500 mt-1'>{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label>Password</Label>
        <div className='relative mt-4'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='••••••••'
            className='border-none focus:ring-gray-300 pr-10'
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
            Creating account...
          </>
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}

export { SignUpFormSection }
