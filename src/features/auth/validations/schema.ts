import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be valid and contain @'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'Full name is required')
    .regex(/^[A-Za-z\s]+$/, 'Full name cannot contain numbers'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Email must be valid and contain @'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]+$/, 'Phone number must contain only numbers'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, 'Password must contain at least one special character (@, #, $, etc.)'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
