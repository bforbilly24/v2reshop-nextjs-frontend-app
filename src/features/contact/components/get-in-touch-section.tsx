'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import AnimationContainer from '@/components/atoms/animation-container'
import { Button } from '@/components/atoms/button'
import { Card, CardContent } from '@/components/atoms/card'
import { Checkbox } from '@/components/atoms/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/atoms/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/atoms/form'
import { Icon } from '@/components/atoms/icon'
import { Input } from '@/components/atoms/input'
import SectionBadge from '@/components/atoms/section-badge'
import { Textarea } from '@/components/atoms/textarea'
import { TypingAnimation } from '@/components/atoms/typing-animation'
import Wrapper from '@/components/atoms/wrapper'
import { contactFormSchema } from '../schema/form-schema'

type ContactFormValues = z.infer<typeof contactFormSchema>

const GetInTouchSection: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  
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

  const onSubmit = (data: ContactFormValues) => {
    const whatsappNumber = '6281338144576'
    const message = `*New Contact Form Submission*\n\n*Name:* ${data.firstName} ${data.lastName}\n*Email:* ${data.email}\n*Message:*\n${data.message}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
    form.reset()
  }

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
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                            <Dialog
                              open={isDialogOpen}
                              onOpenChange={setIsDialogOpen}
                            >
                              <DialogTrigger asChild>
                                <button
                                  type='button'
                                  className='underline text-emerald-600 hover:text-emerald-700'
                                >
                                  terms and conditions
                                </button>
                              </DialogTrigger>
                              <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
                                <DialogHeader>
                                  <DialogTitle className='text-2xl font-bold'>
                                    Terms and Conditions
                                  </DialogTitle>
                                  <DialogDescription className='text-base'>
                                    Please read these terms carefully before
                                    using our services.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className='space-y-4 text-sm text-muted-foreground'>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      1. Acceptance of Terms
                                    </h3>
                                    <p>
                                      By accessing and using ReShop&apos;s
                                      services, you accept and agree to be
                                      bound by these terms and conditions.
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      2. Use of Services
                                    </h3>
                                    <p>
                                      Our reconditioned products are sold with
                                      quality guarantees. You agree to use our
                                      services only for lawful purposes and in
                                      accordance with these terms.
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      3. Product Information
                                    </h3>
                                    <p>
                                      We strive to provide accurate product
                                      descriptions and images. However, we do
                                      not warrant that product descriptions or
                                      other content is error-free, complete, or
                                      current.
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      4. Privacy Policy
                                    </h3>
                                    <p>
                                      Your privacy is important to us. We
                                      collect and use your personal information
                                      in accordance with our Privacy Policy to
                                      provide better service and communication.
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      5. Warranty and Returns
                                    </h3>
                                    <p>
                                      All reconditioned products come with a
                                      warranty period. Return policies apply as
                                      per our return guidelines available on our
                                      website.
                                    </p>
                                  </div>
                                  <div>
                                    <h3 className='font-semibold text-foreground mb-2'>
                                      6. Contact Information
                                    </h3>
                                    <p>
                                      For any questions about these terms,
                                      please contact us via WhatsApp at
                                      +62813-3814-4576 or email us through the
                                      contact form.
                                    </p>
                                  </div>
                                </div>
                                <div className='flex justify-end gap-3 mt-6'>
                                  <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => setIsDialogOpen(false)}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    type='button'
                                    onClick={() => {
                                      form.setValue('acceptTerms', true)
                                      setIsDialogOpen(false)
                                    }}
                                  >
                                    I Agree
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
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
