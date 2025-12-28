import { env } from '@/config/environment'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Secure SSO redirect endpoint
 * POST /api/auth/seller/sso-redirect
 *
 * This endpoint returns a one-time SSO token for secure dashboard access
 * Prevents token exposure in URL (Burp Suite protection)
 */
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sellerToken = cookieStore.get('seller_token')

    if (!sellerToken?.value) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const ssoToken = sellerToken.value

    return NextResponse.json({
      dashboardUrl: env.seller.dashboardUrl,
      ssoToken: ssoToken,
    })
  } catch (error) {
    console.error('SSO redirect failed:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
