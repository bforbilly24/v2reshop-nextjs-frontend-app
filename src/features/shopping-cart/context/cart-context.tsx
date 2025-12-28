'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import { useSession, signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { getCart, updateCartQuantity, removeFromCart } from '../actions'
import type { CartItem } from '../types'

interface CartContextType {
  cartItems: CartItem[]
  subtotal: number
  itemCount: number

  isLoading: boolean
  initialLoading: boolean
  updatingItemIds: Set<number>

  updateQuantity: (id: number, quantity: number) => Promise<void>
  removeItem: (id: number) => Promise<void>
  refreshCart: () => Promise<void>
}

interface CartProviderProps {
  children: React.ReactNode
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [subtotal, setSubtotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [updatingItemIds, setUpdatingItemIds] = useState<Set<number>>(new Set())

  const debounceTimers = React.useRef<Map<number, NodeJS.Timeout>>(new Map())
  const pendingQuantities = React.useRef<Map<number, number>>(new Map())

  const { data: session, status } = useSession()

  const itemCount = useMemo(() => cartItems.length, [cartItems])

  const refreshCart = useCallback(async () => {
    if (status === 'loading') {
      return
    }

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
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error'

        if (
          errorMessage.toLowerCase().includes('unauthenticated') ||
          errorMessage.toLowerCase().includes('not authenticated') ||
          errorMessage.toLowerCase().includes('session expired')
        ) {
          setCartItems([])
          setSubtotal(0)
          setInitialLoading(false)
          setIsLoading(false)

          toast.error('Session expired', {
            description: 'Please login again',
          })

          signOut({ redirect: false }).then(() => {
            window.location.href = '/auth/sign-in?error=SessionExpired'
          })
          return
        }

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

  const updateQuantity = useCallback(
    async (id: number, quantity: number) => {
      if (quantity < 1) {
        toast.error('Quantity must be at least 1')
        return
      }

      const item = cartItems.find((item) => item.id === id)
      if (!item) {
        return
      }

      const availableStock = item.variant
        ? item.variant.stock
        : (item.product.stock ?? 0)

      if (quantity > availableStock) {
        toast.error(
          `Only ${availableStock} ${availableStock === 1 ? 'item' : 'items'} available in stock`
        )
        return
      }

      setCartItems((items) => {
        const updatedItems = items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity,
                total_price: (item.total_price / item.quantity) * quantity,
              }
            : item
        )

        const newSubtotal = updatedItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        )
        setSubtotal(newSubtotal)

        return updatedItems
      })

      pendingQuantities.current.set(id, quantity)

      const existingTimer = debounceTimers.current.get(id)
      if (existingTimer) {
        clearTimeout(existingTimer)
      }

      const timer = setTimeout(async () => {
        const finalQuantity = pendingQuantities.current.get(id)
        if (!finalQuantity) return

        try {
          await updateCartQuantity(id, { quantity: finalQuantity })
          pendingQuantities.current.delete(id)
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : 'Unknown error'

          if (
            errorMessage.toLowerCase().includes('unauthenticated') ||
            errorMessage.toLowerCase().includes('not authenticated')
          ) {
            setCartItems([])
            setUpdatingItemIds(new Set())
            toast.error('Session expired', {
              description: 'Please login again',
            })
            signOut({ redirect: false }).then(() => {
              window.location.href = '/auth/sign-in?error=SessionExpired'
            })
            return
          }

          await refreshCart()
          toast.error('Failed to update quantity')
        } finally {
          debounceTimers.current.delete(id)
        }
      }, 500)

      debounceTimers.current.set(id, timer)
    },
    [refreshCart, cartItems]
  )

  const removeItem = useCallback(
    async (id: number) => {
      if (updatingItemIds.has(id)) {
        return
      }

      let itemToRemove: CartItem | undefined
      let previousItems: CartItem[] = []

      setCartItems((items) => {
        itemToRemove = items.find((item) => item.id === id)
        previousItems = [...items]
        if (!itemToRemove) return items

        const updatedItems = items.filter((item) => item.id !== id)

        const newSubtotal = updatedItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        )
        setSubtotal(newSubtotal)

        return updatedItems
      })

      if (!itemToRemove) {
        return
      }

      setUpdatingItemIds((prev) => new Set(prev).add(id))

      try {
        await removeFromCart(id)
        await refreshCart()

        toast.success(`${itemToRemove.product.name} removed from cart`)
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error'

        if (
          errorMessage.toLowerCase().includes('unauthenticated') ||
          errorMessage.toLowerCase().includes('not authenticated')
        ) {
          setCartItems([])
          setUpdatingItemIds(new Set())
          toast.error('Session expired', {
            description: 'Please login again',
          })
          signOut({ redirect: false }).then(() => {
            window.location.href = '/auth/sign-in?error=SessionExpired'
          })
          return
        }

        setCartItems(previousItems)
        toast.error('Failed to remove item')
        throw error
      } finally {
        setUpdatingItemIds((prev) => {
          const next = new Set(prev)
          next.delete(id)
          return next
        })
      }
    },
    [updatingItemIds, refreshCart]
  )

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  useEffect(() => {
    const timers = debounceTimers.current
    const pending = pendingQuantities.current

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
      pending.clear()
    }
  }, [])

  const value = useMemo<CartContextType>(
    () => ({
      cartItems,
      subtotal,
      itemCount,
      isLoading,
      initialLoading,
      updatingItemIds,
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
      updatingItemIds,
      updateQuantity,
      removeItem,
      refreshCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}
