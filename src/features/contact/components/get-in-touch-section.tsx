'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Button } from '@/components/ui/shadcn/button'
import { Card, CardContent } from '@/components/ui/shadcn/card'
import { Checkbox } from '@/components/ui/shadcn/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/shadcn/form'
import { Input } from '@/components/ui/shadcn/input'
import { Textarea } from '@/components/ui/shadcn/textarea'
import { TypingAnimation } from '@/components/ui/magicui/typing-animation'
import AnimationContainer from '@/components/global/animation-container'
import Wrapper from '@/components/global/wrapper'
import { Icon } from '@/components/ui/icon'
import SectionBadge from '@/components/ui/section-badge'
import { contactFormSchema } from '../schema/form-schema'

type ContactFormValues = z.infer<typeof contactFormSchema>

const GetInTouchSection: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      message: '',
      acceptTerms: false,
    },
  })

  return (
    <Wrapper className='py-20 lg:py-32'>
      <div className='flex flex-col items-center justify-center mb-8 gap-y-4'>
        <AnimationContainer animation='fadeDown' delay={0.2}>
          <SectionBadge title='Get In Touch' />
        </AnimationContainer>
        <AnimationContainer animation='fadeDown' delay={0.4}>
          <TypingAnimation
            duration={50}
            className='text-2xl md:text-4xl lg:text-5xl font-medium !leading-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-neutral-400'
          >
            We&apos;d love to hear from you!
          </TypingAnimation>
        </AnimationContainer>
      </div>
      <Card className='bg-accent shadow-none p-0'>
        <CardContent className='p-4 lg:p-8'>
          <Form {...form}>
            <form className='space-y-6'>
              <div className='grid md:grid-cols-2 gap-5'>
                <div className='col-span-2 sm:col-span-1'>
                  <FormField
                    control={form.control}
                    name='firstName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='First name'
                            className='mt-1.5 bg-white h-11 shadow-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2 sm:col-span-1'>
                  <FormField
                    control={form.control}
                    name='lastName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Last name'
                            className='mt-1.5 bg-white h-11 shadow-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type='email'
                            placeholder='Email'
                            className='mt-1.5 bg-white h-11 shadow-none'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <FormField
                    control={form.control}
                    name='message'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Message'
                            className='mt-1.5 bg-white shadow-none'
                            rows={6}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='col-span-2'>
                  <FormField
                    control={form.control}
                    name='acceptTerms'
                    render={({ field }) => (
                      <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className='space-y-1 leading-none'>
                          <FormLabel>
                            You agree to our{' '}
                            <Link href='#' className='underline'>
                              terms and conditions
                            </Link>
                            .
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button
                type='submit'
                className='mt-6 w-full group'
                size='lg'
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
                <Icon
                  icon='mdi:send'
                  className='size-4 lg:size-6 ml-1 transition-transform duration-300 group-hover:-rotate-45'
                />
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Wrapper>
  )
}

export { GetInTouchSection }
