import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { Footer } from '@/components/layouts/user/footer'
import { NavBar } from '@/components/layouts/user/navbar'
import { CartProvider } from '@/features/shopping-cart/context/cart-context'
import { CartFeedbackProvider } from '@/features/shopping-cart/context/cart-feedback-context'

interface CoreLayoutProps {
  children: ReactNode
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <CartProvider>
      <CartFeedbackProvider>
        <NavBar />
        <main>{children}</main>
        <Footer />
        <Toaster richColors position="top-right" expand={true}  />
      </CartFeedbackProvider>
    </CartProvider>
  )
}
