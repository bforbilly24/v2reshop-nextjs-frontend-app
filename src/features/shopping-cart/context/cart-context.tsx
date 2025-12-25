'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { getCart, updateCartQuantity, removeFromCart } from '../actions'
import type { CartItem } from '../types'

// ============================================
// TYPES & INTERFACES
// ============================================

interface CartContextType {
  cartItems: CartItem[]
  subtotal: number
  itemCount: number

  isLoading: boolean
  initialLoading: boolean

  updateQuantity: (id: number, quantity: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  refreshCart: () => Promise<void>
}

interface CartProviderProps {
  children: React.ReactNode
}

// ============================================
// CONTEXT CREATION
// ============================================

const CartContext = createContext<CartContextType | undefined>(undefined)

// ============================================
// PROVIDER COMPONENT
// ============================================

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const { data: session, status } = useSession()

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  /**
   * Fetches cart data from the API
   * Handles initial loading and session states
   */
  const refreshCart = useCallback(async () => {
    if (status === 'loading') return

    if (status === 'authenticated' && session?.accessToken) {
      setIsLoading(true)

      try {
        const response = await getCart()

        if (response.status && response.data) {
          setCartItems(response.data.items)
          setSubtotal(response.data.subtotal)
        } else {
          throw new Error(response.message || 'Failed to load cart')
        }
      } catch (error) {
        console.error('[CartContext] Failed to fetch cart:', error)
        setCartItems([])
        setSubtotal(0)

        if (!initialLoading) {
          toast.error('Failed to load cart')
        }
      } finally {
        setIsLoading(false)
        setInitialLoading(false)
      }
    } else {
      setCartItems([])
      setSubtotal(0)
      setInitialLoading(false)
    }
  }, [session, status, initialLoading])

  /**
   * Updates item quantity with optimistic update
   */
  const updateQuantity = useCallback(
    async (id: number, quantity: number) => {
      if (quantity < 1) {
        toast.error('Quantity must be at least 1')
        return
      }

      const previousItems = [...cartItems]
      const itemToUpdate = cartItems.find((item) => item.id === id)

      if (!itemToUpdate) return

      setCartItems((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
                total_price: (item.total_price / item.quantity) * quantity,
              }
            : item
        )
      )

      try {
        await updateCartQuantity(id, { quantity })

        await refreshCart()
      } catch (error) {
        console.error('[CartContext] Failed to update quantity:', error)

        setCartItems(previousItems)
        toast.error('Failed to update quantity')
        throw error
      }
    },
    [cartItems, refreshCart]
  )

  /**
   * Removes item from cart with optimistic update
   */
  const removeItem = useCallback(
    async (id: number) => {
      const previousItems = [...cartItems]
      const itemToRemove = cartItems.find((item) => item.id === id)

      if (!itemToRemove) return

      setCartItems((items) => items.filter((item) => item.id !== id))

      try {
        await removeFromCart(id)

        await refreshCart()

        toast.success(`${itemToRemove.product.name} removed from cart`)
      } catch (error) {
        console.error('[CartContext] Failed to remove item:', error)

        setCartItems(previousItems)
        toast.error('Failed to remove item')
        throw error
      }
    },
    [cartItems, refreshCart]
  )

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      subtotal,
      itemCount,
      isLoading,
      initialLoading,
      updateQuantity,
      removeItem,
      refreshCart,
    }),
    [
      cartItems,
      subtotal,
      itemCount,
      isLoading,
      initialLoading,
      updateQuantity,
      removeItem,
      refreshCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// ============================================
// CUSTOM HOOK
// ============================================

/**
 * Hook to access cart context
 * @throws {Error} If used outside of CartProvider
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
