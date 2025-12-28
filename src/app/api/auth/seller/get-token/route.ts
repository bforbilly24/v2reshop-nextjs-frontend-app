import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * Get seller token from httpOnly cookie
 * GET /api/auth/seller/get-token
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('seller_token')

    if (!token?.value) {
      return NextResponse.json({ token: null }, { status: 401 })
    }

    return NextResponse.json({ token: token.value })
  } catch (error) {
    console.error('Failed to get seller token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
