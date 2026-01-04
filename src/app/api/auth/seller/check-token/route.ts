import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

/**
 * Check if seller token exists (fast check)
 * GET /api/auth/seller/check-token
 */
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('seller_token')

    if (!token?.value) {
      return NextResponse.json({ exists: false }, { status: 200 })
    }

    return NextResponse.json({ exists: true })
  } catch (error) {
    return NextResponse.json({ exists: false }, { status: 200 })
  }
}
