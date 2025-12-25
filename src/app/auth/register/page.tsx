import { Metadata } from 'next'
import { RegisterView } from '@/features/auth/register'

export const metadata: Metadata = {
  title: 'Sign Up | ReShop',
  description: 'Create a new ReShop account',
}

export default function RegisterPage() {
  return <RegisterView />
}
