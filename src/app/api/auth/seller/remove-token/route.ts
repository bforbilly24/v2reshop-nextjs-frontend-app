import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * Remove seller token (logout)
 * POST /api/auth/seller/remove-token
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('seller_token')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to remove seller token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
