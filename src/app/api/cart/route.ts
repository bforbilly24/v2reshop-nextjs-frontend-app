import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

/**
 * GET /api/cart
 * Get user's cart items
 */
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.get}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      return NextResponse.json(
        { message: error || 'Failed to fetch cart' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[GET /api/cart] Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/cart
 * Add item to cart
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json(
        {
          status: false,
          message: 'Please login to add items to cart',
          data: null,
        },
        { status: 401 }
      )
    }

    const body = await request.json()

    const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.post}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json(
        {
          status: false,
          message: data.message || 'Failed to add to cart',
          data: null,
        },
        { status: res.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('[POST /api/cart] Error:', error)
    return NextResponse.json(
      { status: false, message: 'Internal server error', data: null },
      { status: 500 }
    )
  }
}
