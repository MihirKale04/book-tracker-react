/**
 * Standard API response wrapper for successful requests
 */
export interface ApiResponse<T> {
  data: T
}

/**
 * API error response
 */
export interface ApiError {
  error: string
  fields?: Record<string, string> // Field-specific validation errors
}

/**
 * Type guard to check if response is an error
 */
export function isApiError(response: unknown): response is ApiError {
  return (
    typeof response === 'object' &&
    response !== null &&
    'error' in response &&
    typeof (response as ApiError).error === 'string'
  )
}

