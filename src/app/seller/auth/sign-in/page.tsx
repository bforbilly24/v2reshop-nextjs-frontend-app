import { Metadata } from 'next'
import { SellerSignInView } from '@/features/seller/auth/sign-in'

export const metadata: Metadata = {
  title: 'Seller Sign In | ReShop',
  description: 'Sign in to your ReShop seller account to manage your store',
}

export default function SellerLoginPage() {
  return <SellerSignInView />
}
