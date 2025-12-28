import { env } from '@/config/environment'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'

/**
 * Secure API Proxy
 * Prevents token exposure to frontend by handling authentication server-side
 * Frontend sends requests to /api/proxy, server injects Bearer token
 *
 * Security Benefits:
 * 1. Access token never exposed to client-side JavaScript
 * 2. Protected from XSS attacks
 * 3. Burp Suite cannot intercept token from browser
 * 4. Centralized authentication handling
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.accessToken) {
      return NextResponse.json(
        { status: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { endpoint, method = 'GET', body } = await request.json()

    if (!endpoint) {
      return NextResponse.json(
        { status: false, message: 'Endpoint is required' },
        { status: 400 }
      )
    }

    const apiUrl = `${env.api.baseUrl}${env.api.version}${endpoint}`

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    }

    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      fetchOptions.body = JSON.stringify(body)
    }

    const response = await fetch(apiUrl, fetchOptions)

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('[API Proxy] Error:', error)
    return NextResponse.json(
      { status: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
