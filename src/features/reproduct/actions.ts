'use server'

import { env } from '@/config/environment'
import type {
  GetProductsRequest,
  GetProductsResponse,
  GetProductCategoriesResponse,
  GetProductVariantsResponse,
} from './types'

export const getProducts = async (
  params?: GetProductsRequest
): Promise<GetProductsResponse> => {
  const url = new URL(`${env.api.baseUrl}/products`)

  if (params) {
    if (params.search) url.searchParams.append('search', params.search)
    if (params.category_id)
      url.searchParams.append('category_id', params.category_id.toString())
    if (params.customized !== undefined)
      url.searchParams.append('customized', params.customized ? '1' : '0')
    if (params.price_min)
      url.searchParams.append('price_min', params.price_min.toString())
    if (params.price_max)
      url.searchParams.append('price_max', params.price_max.toString())
    if (params.rating_min)
      url.searchParams.append('rating_min', params.rating_min.toString())
    if (params.sort) url.searchParams.append('sort', params.sort)
    if (params.order) url.searchParams.append('order', params.order)
    if (params.page) url.searchParams.append('page', params.page.toString())
  }

  const res = await fetch(url.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`Failed to fetch products: ${res.status} ${errorBody}`)
  }

  return res.json()
}

export const getProductCategories =
  async (): Promise<GetProductCategoriesResponse> => {
    const res = await fetch(`${env.api.baseUrl}/product-categories`, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch product categories')
    }

    return res.json()
  }

export const getProductVariants =
  async (): Promise<GetProductVariantsResponse> => {
    const res = await fetch(`${env.api.baseUrl}/product-variants`, {
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      throw new Error('Failed to fetch product variants')
    }

    return res.json()
  }
