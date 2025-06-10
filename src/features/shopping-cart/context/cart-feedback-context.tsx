'use client'

import { createContext, useContext, useCallback, ReactNode } from 'react'
import { toast } from 'sonner'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  deliveryDate: string
  description: string
  color?: string
  size?: string
}

interface CartFeedbackContextType {
  showSuccess: (message: string | CartItem) => void
  showCartUpdate: (message: string) => void
  showAddToCart: (cartItem: CartItem) => void
  showError: (error: string) => void
}

const CartFeedbackContext = createContext<CartFeedbackContextType | undefined>(
  undefined
)

interface CartFeedbackProviderProps {
  children: ReactNode
}

export const CartFeedbackProvider: React.FC<CartFeedbackProviderProps> = ({
  children,
}) => {
  const showSuccess = useCallback((message: string | CartItem) => {
    if (typeof message === 'string') {
      toast.success('Cart Updated', {
        description: message,
        duration: 3000,
      })
    } else {
      toast.success('Added to Cart', {
        description: `${message.quantity} x ${message.name} (${message.color}, ${message.size}) added to your cart.`,
        duration: 3000,
      })
    }
  }, [])

  const showCartUpdate = useCallback((message: string) => {
    toast.success('Cart Updated', {
      description: message,
      duration: 3000,
    })
  }, [])

  const showAddToCart = useCallback((cartItem: CartItem) => {
    toast.success('Added to Cart', {
      description: `${cartItem.quantity} x ${cartItem.name} (${cartItem.color}, ${cartItem.size}) added to your cart.`,
      duration: 3000,
    })
  }, [])

  const showError = useCallback((error: string) => {
    toast.error('Failed to Add to Cart', {
      description: error,
      duration: 3000,
    })
  }, [])

  return (
    <CartFeedbackContext.Provider
      value={{ showSuccess, showCartUpdate, showAddToCart, showError }}
    >
      {children}
    </CartFeedbackContext.Provider>
  )
}

export const useCartFeedback = (): CartFeedbackContextType => {
  const context = useContext(CartFeedbackContext)
  if (!context) {
    throw new Error(
      'useCartFeedback must be used within a CartFeedbackProvider'
    )
  }
  return context
}
