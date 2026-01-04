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
import { registerSeller } from '@/features/auth/actions'
import {
  sellerRegisterSchema,
  type SellerRegisterInput,
} from '@/features/auth/validations/schema'

interface SellerSignUpFormSectionProps {
  onSuccess?: () => void
}

const SellerSignUpFormSection: React.FC<SellerSignUpFormSectionProps> = ({
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
  } = useForm<SellerRegisterInput>({
    resolver: zodResolver(sellerRegisterSchema),
  })

  const onSubmit = async (data: SellerRegisterInput) => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await registerSeller({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
        role: 'seller',
      })

      if (response.status && response.redirect_url) {
        await setSellerToken(response.token)

        toast.success('Sign Up Successful', {
          description: 'Redirecting to seller dashboard...',
        })

        if (onSuccess) {
          onSuccess()
        }

        // Redirect to seller dashboard with full page reload
        window.location.href = response.redirect_url
      } else {
        setError('Sign up failed. Please try again.')
        toast.error('Sign Up Failed', {
          description: 'Unable to create seller account. Please try again.',
        })
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
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      {error && (
        <Alert variant='destructive'>
          <Icon icon='ph:warning-circle' className='h-4 w-4' />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <div className='relative'>
          <Icon
            icon='ph:user'
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none'
          />
          <Input
            id='name'
            type='text'
            placeholder='Full Name'
            className='!bg-background/20 h-10 placeholder:opacity-40 pl-10'
            {...register('name')}
            disabled={isLoading}
          />
        </div>
        {errors.name && (
          <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <div className='relative'>
          <Icon
            icon='ph:envelope-simple'
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none'
          />
          <Input
            id='email'
            type='email'
            placeholder='Email Address'
            className='!bg-background/20 h-10 placeholder:opacity-40 pl-10'
            {...register('email')}
            disabled={isLoading}
          />
        </div>
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className='relative'>
          <Icon
            icon='ph:lock-simple'
            className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none'
          />
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            className='!bg-background/20 h-10 pl-10 pe-10 placeholder:opacity-40'
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
        variant='default'
        className='mt-1 h-10 w-full text-base'
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Icon
              icon='ph:circle-notch'
              className='mr-2 h-4 w-4 animate-spin'
            />
            Creating account...
          </>
        ) : (
          <>
            <Icon icon='ph:user-plus' className='mr-2 h-4 w-4' />
            Create account
          </>
        )}
      </Button>
    </form>
  )
}

export { SellerSignUpFormSection }
