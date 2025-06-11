'use client'

import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
// import { LoginRequest } from '@/constant'
import { toast } from 'sonner'
import { cn } from '@/lib/cn'
import { Button } from '@/components/ui/shadcn/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form'
import { Input } from '@/components/ui/shadcn/input'
import { SignInFormSchema } from '../schema'
import { PasswordInput } from './password-input'

type SignInFormProps = HTMLAttributes<HTMLDivElement>

const SignInForm: React.FC<SignInFormProps> = ({ className, ...props }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: { email: '', password: '' },
  })

  async function onSubmit(data: z.infer<typeof SignInFormSchema>) {
    setIsLoading(true)
    try {
      console.log('Login data:', data)

      toast.success('Login berhasil!')
      router.push('/reproduct')
    } catch (error) {
      toast.error('Login gagal', {
        description:
          error instanceof Error
            ? error.message
            : 'Email atau kata sandi salah',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='reshopid@mail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      href='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>
      </Form>

      <div className='px-8 text-center text-sm text-muted-foreground'>
        Don&apos;t have an account?{' '}
        <Link href='/auth/sign-up' className='underline underline-offset-4'>
          Sign up
        </Link>
      </div>
    </div>
  )
}

export { SignInForm }
