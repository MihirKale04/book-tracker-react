import type { Request, Response, NextFunction } from 'express'
import type { BookInput, BookStatus } from '../types/book.js'

/**
 * Validates book input data
 */
export function validateBookInput(
  req: Request<{}, {}, BookInput>,
  res: Response,
  next: NextFunction
) {
  const { title, author, status } = req.body

  const errors: Record<string, string> = {}

  // Validate title
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.title = 'Title is required'
  } else if (title.length > 500) {
    errors.title = 'Title must be 500 characters or less'
  }

  // Validate author
  if (!author || typeof author !== 'string' || author.trim().length === 0) {
    errors.author = 'Author is required'
  } else if (author.length > 200) {
    errors.author = 'Author must be 200 characters or less'
  }

  // Validate status
  const validStatuses: BookStatus[] = ['to-read', 'reading', 'completed']
  if (!status || !validStatuses.includes(status)) {
    errors.status = `Status must be one of: ${validStatuses.join(', ')}`
  }

  // Validate rating (optional)
  if (req.body.rating !== undefined) {
    const rating = req.body.rating
    if (typeof rating !== 'number' || rating < 1 || rating > 10) {
      errors.rating = 'Rating must be a number between 1 and 10'
    }
  }

  // Validate notes (optional)
  if (req.body.notes !== undefined) {
    const notes = req.body.notes
    if (typeof notes !== 'string') {
      errors.notes = 'Notes must be a string'
    } else if (notes.length > 5000) {
      errors.notes = 'Notes must be 5000 characters or less'
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      fields: errors,
    })
  }

  next()
}

