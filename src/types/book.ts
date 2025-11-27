/**
 * Book status options
 */
export type BookStatus = 'to-read' | 'reading' | 'completed'

/**
 * Main Book interface
 */
export interface Book {
  id: number
  title: string
  author: string
  status: BookStatus
  rating?: number // Optional, typically 1-5 or 1-10
  notes?: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
}

/**
 * Book creation/update payload (without id and timestamps)
 */
export interface BookInput {
  title: string
  author: string
  status: BookStatus
  rating?: number
  notes?: string
}

/**
 * Book filter options for querying
 */
export interface BookFilters {
  status?: BookStatus
  author?: string
  search?: string // Search in title or author
}

