import type { Book, BookInput, BookFilters } from '../types/book'
import type { ApiResponse, ApiError } from '../types/api'
import { isApiError } from '../types/api'

const API_BASE = '/api/books'

/**
 * Builds a URLSearchParams string from filter options
 */
function buildQueryString(filters?: BookFilters): string {
  if (!filters) return ''
  
  const params = new URLSearchParams()
  if (filters.status) params.append('status', filters.status)
  if (filters.author) params.append('author', filters.author)
  if (filters.search) params.append('search', filters.search)
  
  const queryString = params.toString()
  return queryString ? `?${queryString}` : ''
}

/**
 * Handles API errors and throws with a helpful message
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }))
    
    if (isApiError(errorData)) {
      throw new Error(errorData.error)
    }
    throw new Error(`Request failed: ${response.statusText}`)
  }
  
  const data: ApiResponse<T> = await response.json()
  return data.data
}

/**
 * Fetches all books, optionally filtered
 */
export async function fetchBooks(filters?: BookFilters): Promise<Book[]> {
  const queryString = buildQueryString(filters)
  const response = await fetch(`${API_BASE}${queryString}`)
  return handleResponse<Book[]>(response)
}

/**
 * Fetches a single book by ID
 */
export async function fetchBook(id: number): Promise<Book> {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse<Book>(response)
}

/**
 * Creates a new book
 */
export async function createBook(book: BookInput): Promise<Book> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  return handleResponse<Book>(response)
}

/**
 * Updates an existing book
 */
export async function updateBook(id: number, book: Partial<BookInput>): Promise<Book> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  })
  return handleResponse<Book>(response)
}

/**
 * Deletes a book by ID
 */
export async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  })
  
  if (!response.ok) {
    const errorData: ApiError = await response.json().catch(() => ({
      error: `HTTP ${response.status}: ${response.statusText}`,
    }))
    throw new Error(isApiError(errorData) ? errorData.error : 'Failed to delete book')
  }
}

