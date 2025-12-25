import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

/**
 * PUT /api/cart/[id]
 * Update cart item quantity
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { id: cartItemId } = await context.params

    const res = await fetch(`${env.api.baseUrl}${env.api.version}${env.api.endpoints.cart.put(cartItemId)}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const error = await res.text()
      return NextResponse.json(
        { message: error || 'Failed to update cart item' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[PUT /api/cart/[id]] Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/cart/[id]
 * Remove item from cart
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const { id: cartItemId } = await context.params

    const res = await fetch(`${env.api.baseUrl}${env.api.endpoints.cart.delete(cartItemId)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    if (!res.ok) {
      const error = await res.text()
      return NextResponse.json(
        { message: error || 'Failed to remove cart item' },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('[DELETE /api/cart/[id]] Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
