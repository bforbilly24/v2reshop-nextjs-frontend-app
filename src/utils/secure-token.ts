/**
 * Secure Token Management Utilities
 * Uses httpOnly cookies instead of localStorage for better security
 * Protects against XSS attacks and Burp Suite interception
 */

/**
 * Set seller token in httpOnly cookie via API route
 * This is more secure than localStorage as it can't be accessed by JavaScript
 */
export const setSellerToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/seller/set-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
      credentials: 'include',
    })

    return response.ok
  } catch (error) {
    console.error('Failed to set seller token:', error)
    return false
  }
}

/**
 * Get seller token from httpOnly cookie via API route
 * Returns null if not authenticated
 */
export const getSellerToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/auth/seller/get-token', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) return null

    const data = await response.json()
    return data.token || null
  } catch (error) {
    console.error('Failed to get seller token:', error)
    return null
  }
}

/**
 * Check if seller token exists (fast check without returning token value)
 */
export const hasSellerToken = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/seller/check-token', {
      method: 'GET',
      credentials: 'include',
    })

    return response.ok
  } catch (error) {
    return false
  }
}

/**
 * Remove seller token (logout)
 */
export const removeSellerToken = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/seller/remove-token', {
      method: 'POST',
      credentials: 'include',
    })

    return response.ok
  } catch (error) {
    console.error('Failed to remove seller token:', error)
    return false
  }
}

/**
 * Secure SSO redirect using POST method with token in body
 * This prevents token exposure in URL and Burp Suite interception
 */
export const secureSellerDashboardRedirect = async (): Promise<void> => {
  try {
    const response = await fetch('/api/auth/seller/sso-redirect', {
      method: 'POST',
      credentials: 'include',
    })

    if (response.ok) {
      const data = await response.json()

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = data.dashboardUrl
      form.style.display = 'none'

      const tokenField = document.createElement('input')
      tokenField.type = 'hidden'
      tokenField.name = 'sso_token'
      tokenField.value = data.ssoToken

      form.appendChild(tokenField)
      document.body.appendChild(form)
      form.submit()
    } else {
      window.location.href = '/seller/auth/sign-in'
    }
  } catch (error) {
    console.error('SSO redirect failed:', error)
    window.location.href = '/seller/auth/sign-in'
  }
}
