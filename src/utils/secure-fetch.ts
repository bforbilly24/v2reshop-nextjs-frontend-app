/**
 * Secure API Fetcher
 * Prevents token exposure by using server-side session
 * All API calls should go through this utility
 */

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: Record<string, unknown> | FormData
  headers?: Record<string, string>
}

/**
 * Secure fetch that uses server-side session token
 * Frontend never has direct access to the access token
 */
export async function secureFetch(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const { method = 'GET', body, headers = {} } = options

  const response = await fetch('/api/proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
    body: JSON.stringify({
      endpoint,
      method,
      body,
    }),
  })

  return response
}

/**
 * Helper for GET requests
 */
export async function secureGet(endpoint: string): Promise<Response> {
  return secureFetch(endpoint, { method: 'GET' })
}

/**
 * Helper for POST requests
 */
export async function securePost(
  endpoint: string,
  body: Record<string, unknown>
): Promise<Response> {
  return secureFetch(endpoint, { method: 'POST', body })
}

/**
 * Helper for PUT requests
 */
export async function securePut(
  endpoint: string,
  body: Record<string, unknown>
): Promise<Response> {
  return secureFetch(endpoint, { method: 'PUT', body })
}

/**
 * Helper for DELETE requests
 */
export async function secureDelete(endpoint: string): Promise<Response> {
  return secureFetch(endpoint, { method: 'DELETE' })
}
