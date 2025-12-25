'use server'

import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import type {
  GetProductDetailResponse,
  GetProductReviewsResponse,
  CreateReviewRequest,
  CreateReviewResponse,
  DeleteReviewResponse,
} from './types'

/**
 * Get product detail by slug
 * Public endpoint - no auth required
 */
export const getProductBySlug = async (
  slug: string
): Promise<GetProductDetailResponse> => {
  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.products.detail(slug)}`, {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(
      `Failed to fetch product detail: ${res.status} ${errorBody}`
    )
  }

  return res.json()
}

/**
 * Get product reviews
 * Public endpoint - no auth required
 * API returns paginated response, we extract the data array
 */
export const getProductReviews = async (
  productId: number
): Promise<GetProductReviewsResponse> => {
  const res = await fetch(
    `${env.api.baseUrl}${env.api.version}${env.api.endpoints.reviews.list}?product_id=${productId}`,
    {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Failed to fetch reviews: ${res.status} ${errorBody}`)
  }

  const response = await res.json()

  return {
    status: response.status,
    message: response.message,
    data: response.data?.data || [],
  }
}

/**
 * Create product review
 * Requires authentication - must be logged in
 */
export const createProductReview = async (
  payload: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return {
      status: false,
      message: 'Please login to write a review',
      data: null,
    }
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.reviews.create}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    if (res.status === 401) {
      return {
        status: false,
        message: 'Please login again',
        data: null,
      }
    }
    return {
      status: false,
      message: data.message || 'Failed to create review',
      data: null,
    }
  }

  return data
}

/**
 * Delete product review
 * Requires authentication - must be logged in and owner of review
 */
export const deleteProductReview = async (
  reviewId: number
): Promise<DeleteReviewResponse> => {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    throw new Error('Unauthorized: Please login to delete review')
  }

  const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.reviews.delete(reviewId)}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
  })

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized: Please login again')
    }
    if (res.status === 403) {
      throw new Error('Forbidden: You can only delete your own reviews')
    }
    if (res.status === 404) {
      throw new Error('Review not found')
    }
    const errorBody = await res.text()
    throw new Error(`Failed to delete review: ${res.status} ${errorBody}`)
  }

  return res.json()
}
