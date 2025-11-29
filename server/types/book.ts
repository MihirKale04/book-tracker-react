/**
 * Book status options
 */
export type BookStatus = 'to-read' | 'reading' | 'completed'

/**
 * Main Book interface (matches frontend)
 */
export interface Book {
  id: number
  title: string
  author: string
  status: BookStatus
  rating?: number
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
 * Database row structure (before conversion to Book)
 */
export interface BookRow {
  id: number
  title: string
  author: string
  status: BookStatus
  rating: number | null
  notes: string | null
  created_at: string
  updated_at: string
}

