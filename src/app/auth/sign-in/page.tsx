import { Metadata } from 'next'
import { SignInView } from '@/features/auth/sign-in'

export const metadata: Metadata = {
  title: 'Sign In | ReShop',
  description: 'Sign in to your ReShop account to continue shopping',
}

export default function LoginPage() {
  return <SignInView />
}
