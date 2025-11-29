import { Router } from 'express'
import { db, rowToBook } from '../db/database.js'
import { validateBookInput } from '../middleware/validation.js'
import type { BookStatus } from '../types/book.js'

export const booksRouter = Router()

/**
 * GET /api/books
 * Get all books with optional filters
 */
booksRouter.get('/', (req, res) => {
  try {
    let query = 'SELECT * FROM books WHERE 1=1'
    const params: unknown[] = []

    // Filter by status
    if (req.query.status) {
      query += ' AND status = ?'
      params.push(req.query.status)
    }

    // Filter by author
    if (req.query.author) {
      query += ' AND author LIKE ?'
      params.push(`%${req.query.author}%`)
    }

    // Search in title or author
    if (req.query.search) {
      query += ' AND (title LIKE ? OR author LIKE ?)'
      const searchTerm = `%${req.query.search}%`
      params.push(searchTerm, searchTerm)
    }

    query += ' ORDER BY created_at DESC'

    const stmt = db.prepare(query)
    const rows = stmt.all(...params) as Array<{
      id: number
      title: string
      author: string
      status: BookStatus
      rating: number | null
      notes: string | null
      created_at: string
      updated_at: string
    }>

    const books = rows.map(rowToBook)

    res.json({ data: books })
  } catch (error) {
    console.error('Error fetching books:', error)
    res.status(500).json({ error: 'Failed to fetch books' })
  }
})

/**
 * GET /api/books/:id
 * Get a single book by ID
 */
booksRouter.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' })
    }

    const stmt = db.prepare('SELECT * FROM books WHERE id = ?')
    const row = stmt.get(id) as
      | {
          id: number
          title: string
          author: string
          status: BookStatus
          rating: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
      | undefined

    if (!row) {
      return res.status(404).json({ error: 'Book not found' })
    }

    res.json({ data: rowToBook(row) })
  } catch (error) {
    console.error('Error fetching book:', error)
    res.status(500).json({ error: 'Failed to fetch book' })
  }
})

/**
 * POST /api/books
 * Create a new book
 */
booksRouter.post('/', validateBookInput, (req, res) => {
  try {
    const { title, author, status, rating, notes } = req.body

    const stmt = db.prepare(`
      INSERT INTO books (title, author, status, rating, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `)

    const result = stmt.run(
      title.trim(),
      author.trim(),
      status,
      rating ?? null,
      notes?.trim() ?? null
    )

    // Fetch the created book
    const getStmt = db.prepare('SELECT * FROM books WHERE id = ?')
    const row = getStmt.get(result.lastInsertRowid) as {
      id: number
      title: string
      author: string
      status: BookStatus
      rating: number | null
      notes: string | null
      created_at: string
      updated_at: string
    }

    res.status(201).json({ data: rowToBook(row) })
  } catch (error) {
    console.error('Error creating book:', error)
    res.status(500).json({ error: 'Failed to create book' })
  }
})

/**
 * PUT /api/books/:id
 * Update an existing book
 */
booksRouter.put('/:id', validateBookInput, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' })
    }

    // Check if book exists
    const checkStmt = db.prepare('SELECT id FROM books WHERE id = ?')
    const existing = checkStmt.get(id)
    if (!existing) {
      return res.status(404).json({ error: 'Book not found' })
    }

    const { title, author, status, rating, notes } = req.body

    const stmt = db.prepare(`
      UPDATE books
      SET title = ?, author = ?, status = ?, rating = ?, notes = ?, updated_at = datetime('now')
      WHERE id = ?
    `)

    stmt.run(
      title.trim(),
      author.trim(),
      status,
      rating ?? null,
      notes?.trim() ?? null,
      id
    )

    // Fetch the updated book
    const getStmt = db.prepare('SELECT * FROM books WHERE id = ?')
    const row = getStmt.get(id) as {
      id: number
      title: string
      author: string
      status: BookStatus
      rating: number | null
      notes: string | null
      created_at: string
      updated_at: string
    }

    res.json({ data: rowToBook(row) })
  } catch (error) {
    console.error('Error updating book:', error)
    res.status(500).json({ error: 'Failed to update book' })
  }
})

/**
 * DELETE /api/books/:id
 * Delete a book
 */
booksRouter.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid book ID' })
    }

    const stmt = db.prepare('DELETE FROM books WHERE id = ?')
    const result = stmt.run(id)

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Book not found' })
    }

    res.status(204).send()
  } catch (error) {
    console.error('Error deleting book:', error)
    res.status(500).json({ error: 'Failed to delete book' })
  }
})

