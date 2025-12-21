import { LoginView } from '@/features/auth/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | ReShop',
  description: 'Sign in to your ReShop account',
}

export default function LoginPage() {
  return <LoginView />
}
