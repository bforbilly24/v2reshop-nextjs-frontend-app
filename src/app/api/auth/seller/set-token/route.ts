import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Set seller token in httpOnly cookie
 * POST /api/auth/seller/set-token
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
    }

    const cookieStore = await cookies()
    cookieStore.set('seller_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to set seller token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
