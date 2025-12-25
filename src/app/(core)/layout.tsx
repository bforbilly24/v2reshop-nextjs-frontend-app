import { ReactNode } from 'react'
import { Footer } from '@/components/layouts/user/footer'
import { NavbarLandingPage as Navbar } from '@/components/layouts/user/navbar-landingpage'
import { ScrollProgressToTop } from '@/components/molecules/scroll-progress-to-top'
import { CartProvider } from '@/features/shopping-cart/context/cart-context'
import { CartFeedbackProvider } from '@/features/shopping-cart/context/cart-feedback-context'

interface CoreLayoutProps {
  children: ReactNode
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <CartProvider>
      <CartFeedbackProvider>
        <div className='min-h-screen flex flex-col'>
          <Navbar />
          <main className='flex-1'>{children}</main>
          <Footer />

          <ScrollProgressToTop
            showOffset={300}
            size='md'
            variant='default'
            showTopProgress={true}
          />
        </div>
      </CartFeedbackProvider>
    </CartProvider>
  )
}
