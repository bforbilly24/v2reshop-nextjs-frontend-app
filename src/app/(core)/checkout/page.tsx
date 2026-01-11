import { Checkout } from '@/features/checkout'
import { getCart } from '@/features/shopping-cart/actions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Checkout | Re-shop',
}

export default async function CheckoutPage() {
  try {
    const response = await getCart()
    if (!response.status || !response.data?.items?.length) {
      redirect('/')
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthenticated') {
      redirect('/auth/sign-in')
    }
    if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
      throw error
    }
    redirect('/')
  }

  return <Checkout />
}
