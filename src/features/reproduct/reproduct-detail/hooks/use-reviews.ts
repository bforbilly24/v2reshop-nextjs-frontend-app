'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import {
  getProductReviews,
  createProductReview,
  deleteProductReview,
} from '../actions'
import type { CreateReviewRequest, Review } from '../types'

export const useProductReviews = (productId: number) => {
  const queryClient = useQueryClient()

  const {
    data: reviewsData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: async () => {
      const result = await getProductReviews(productId)
      if (!result.status) {
        throw new Error(result.message)
      }
      return result.data
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  })

  const createReviewMutation = useMutation({
    mutationFn: (payload: CreateReviewRequest) => createProductReview(payload),
    onMutate: async (newReview) => {
      await queryClient.cancelQueries({
        queryKey: ['product-reviews', productId],
      })

      const previousReviews = queryClient.getQueryData<Review[]>([
        'product-reviews',
        productId,
      ])

      return { previousReviews }
    },
    onSuccess: (result) => {
      if (result.status) {
        toast.success('Review Submitted', {
          description: 'Thank you for your review!',
        })

        queryClient.invalidateQueries({
          queryKey: ['product-reviews', productId],
        })
      } else {
        toast.error('Failed to Submit Review', {
          description: result.message,
        })
      }
    },
    onError: (error, _variables, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(
          ['product-reviews', productId],
          context.previousReviews
        )
      }
      toast.error('Failed to Submit Review', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    },
  })

  const deleteReviewMutation = useMutation({
    mutationFn: (reviewId: number) => deleteProductReview(reviewId),
    onMutate: async (reviewId) => {
      await queryClient.cancelQueries({
        queryKey: ['product-reviews', productId],
      })

      const previousReviews = queryClient.getQueryData<Review[]>([
        'product-reviews',
        productId,
      ])

      if (previousReviews) {
        queryClient.setQueryData<Review[]>(
          ['product-reviews', productId],
          previousReviews.filter((review) => review.id !== reviewId)
        )
      }

      return { previousReviews }
    },
    onSuccess: () => {
      toast.success('Review deleted successfully')

      queryClient.invalidateQueries({
        queryKey: ['product-reviews', productId],
      })
    },
    onError: (error, _variables, context) => {
      if (context?.previousReviews) {
        queryClient.setQueryData(
          ['product-reviews', productId],
          context.previousReviews
        )
      }
      toast.error('Failed to delete review', {
        description: error instanceof Error ? error.message : 'Unknown error',
      })
    },
  })

  return {
    reviews: reviewsData || [],
    isLoading,
    error,
    refetch,
    createReview: createReviewMutation.mutate,
    deleteReview: deleteReviewMutation.mutate,
    isCreating: createReviewMutation.isPending,
    isDeleting: deleteReviewMutation.isPending,
  }
}
