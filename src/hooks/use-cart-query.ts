import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getCartItems,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
} from '@/api/cart'
import type {
  AddToCartRequest,
  UpdateCartQuantityRequest,
  GetCartResponse,
  CartItem,
} from '@/features/shopping-cart/types'

/**
 * Query key factory
 */
export const cartKeys = {
  all: ['cart'] as const,
  items: () => [...cartKeys.all, 'items'] as const,
}

/**
 * Hook to get cart items
 */
export function useCartQuery() {
  return useQuery({
    queryKey: cartKeys.items(),
    queryFn: getCartItems,
    staleTime: 0,
  })
}

/**
 * Hook to add item to cart
 */
export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: AddToCartRequest) => addToCartAPI(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      toast.success('Item added to cart')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })
}

/**
 * Hook to update cart item quantity
 */
export function useUpdateCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      cartItemId,
      payload,
    }: {
      cartItemId: number
      payload: UpdateCartQuantityRequest
    }) => updateCartItemAPI(cartItemId, payload),
    onMutate: async ({ cartItemId, payload }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: cartKeys.items() })

      // Snapshot previous value
      const previousCart = queryClient.getQueryData(cartKeys.items())

      // Optimistically update
      queryClient.setQueryData(cartKeys.items(), (old: GetCartResponse | undefined) => {
        if (!old?.data?.items) return old
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.map((item: CartItem) =>
              item.id === cartItemId
                ? { ...item, quantity: payload.quantity }
                : item
            ),
          },
        }
      })

      return { previousCart }
    },
    onError: (error: Error, variables, context) => {
      // Rollback on error
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.items(), context.previousCart)
      }
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
    },
  })
}

/**
 * Hook to remove item from cart
 */
export function useRemoveCartItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartItemId: number) => removeCartItemAPI(cartItemId),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: cartKeys.items() })

      const previousCart = queryClient.getQueryData(cartKeys.items())

      queryClient.setQueryData(cartKeys.items(), (old: GetCartResponse | undefined) => {
        if (!old?.data?.items) return old
        return {
          ...old,
          data: {
            ...old.data,
            items: old.data.items.filter((item: CartItem) => item.id !== cartItemId),
          },
        }
      })

      return { previousCart }
    },
    onError: (error: Error, variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(cartKeys.items(), context.previousCart)
      }
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cartKeys.items() })
      toast.success('Item removed from cart')
    },
  })
}
