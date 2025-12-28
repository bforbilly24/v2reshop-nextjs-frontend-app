import { Metadata } from 'next'
import { SignUpView } from '@/features/auth/sign-up'

export const metadata: Metadata = {
  title: 'Sign Up | ReShop',
  description: 'Create your ReShop account and start shopping',
}

export default function RegisterPage() {
  return <SignUpView />
}
