import { ShoppingCart } from '@/features/shopping-cart'
import { getCart } from '@/features/shopping-cart/actions'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Shopping Cart | Re-shop',
}

export default async function CartPage() {
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

  return <ShoppingCart />
}
