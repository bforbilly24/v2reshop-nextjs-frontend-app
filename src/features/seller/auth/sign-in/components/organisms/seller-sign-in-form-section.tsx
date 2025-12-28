'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeClosed } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { setSellerToken } from '@/utils/secure-token'
import { Alert, AlertDescription } from '@/components/atoms/alert'
import { Button } from '@/components/atoms/button'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import { loginSeller } from '@/features/auth/actions'
import {
  sellerLoginSchema,
  type SellerLoginInput,
} from '@/features/auth/validations/schema'

interface SellerSignInFormSectionProps {
  onSuccess?: () => void
}

const SellerSignInFormSection: React.FC<SellerSignInFormSectionProps> = ({
  onSuccess,
}) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerLoginInput>({
    resolver: zodResolver(sellerLoginSchema),
  })

  const onSubmit = async (data: SellerLoginInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await loginSeller({
        email: data.email,
        password: data.password,
      })

      if (response.status && response.redirect_url) {
        await setSellerToken(response.token)

        toast.success('Sign In Successful', {
          description: 'Welcome back! You can now explore products.',
        })

        if (onSuccess) {
          onSuccess()
        }

        router.push('/reproduct')
      } else {
        setError('Invalid email or password')
        toast.error('Sign In Failed', {
          description: 'Invalid email or password. Please try again.',
        })
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Something went wrong'
      setError(errorMessage)
      toast.error('Sign In Failed', {
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      {error && (
        <Alert variant='destructive'>
          <Icon icon='ph:warning-circle' className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Input
          id='email'
          type='email'
          placeholder='Email Address'
          className='!bg-background/20 h-10 placeholder:opacity-40'
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className='relative'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='!bg-background/20 h-10 pe-10 placeholder:opacity-40'
            {...register('password')}
            disabled={isLoading}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transition-colors'
          >
            {showPassword ? (
              <EyeClosed className='h-5 w-5' />
            ) : (
              <Eye className='h-5 w-5' />
            )}
          </button>
        </div>
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>{errors.password.message}</p>
        )}
      </div>

      <Button
        type='submit'
        variant='secondary'
        className='bg-secondary/20 hover:bg-secondary/30 text-chart-1 mt-1 h-10 w-full text-base'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icon
              icon='ph:circle-notch'
              className='mr-2 h-4 w-4 animate-spin'
            />
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </Button>
    </form>
  )
}

export { SellerSignInFormSection }
