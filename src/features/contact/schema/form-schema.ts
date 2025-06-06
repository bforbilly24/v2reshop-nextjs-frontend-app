import { z } from 'zod'

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' })
    .max(50, { message: 'First name must not exceed 50 characters.' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' })
    .max(50, { message: 'Last name must not exceed 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must not exceed 1000 characters.' }),
  acceptTerms: z.boolean().refine((value) => value === true, {
    message: 'You must accept the terms and conditions.',
  }),
})

export { contactFormSchema }
