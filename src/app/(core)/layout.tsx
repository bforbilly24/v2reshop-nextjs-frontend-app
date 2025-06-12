import { ReactNode } from 'react'
import { Toaster } from 'sonner'
import { Footer } from '@/components/layouts/user/footer'
import { Navbar } from '@/components/layouts/user/navbar'
import { ScrollProgressToTop } from '@/components/global/scroll-progress-to-top'
import { CartProvider } from '@/features/shopping-cart/context/cart-context'
import { CartFeedbackProvider } from '@/features/shopping-cart/context/cart-feedback-context'

interface CoreLayoutProps {
  children: ReactNode
}

export default function CoreLayout({ children }: CoreLayoutProps) {
  return (
    <CartProvider>
      <CartFeedbackProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          
          <ScrollProgressToTop 
            showOffset={300}
            size="md"
            variant="default"
            showTopProgress={true}
          />
          
        <Toaster richColors position="top-right" expand={true} duration={2000}  />
        </div>
      </CartFeedbackProvider>
    </CartProvider>
  )
}