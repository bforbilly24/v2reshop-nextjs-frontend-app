import { Metadata } from 'next'
import { SellerSignUpView } from '@/features/seller/auth/sign-up'

export const metadata: Metadata = {
  title: 'Seller Sign Up | ReShop',
  description: 'Create your ReShop seller account and start selling',
}

export default function SellerRegisterPage() {
  return <SellerSignUpView />
}
