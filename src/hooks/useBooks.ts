import { useState, useEffect } from 'react'
import { fetchBooks, createBook, updateBook, deleteBook } from '../utils/api'
import type { Book, BookInput, BookFilters } from '../types/book'

interface UseBooksResult {
  books: Book[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
  addBook: (book: BookInput) => Promise<void>
  editBook: (id: number, book: Partial<BookInput>) => Promise<void>
  removeBook: (id: number) => Promise<void>
}

/**
 * Custom hook for managing books with loading and error states
 */
export function useBooks(filters?: BookFilters): UseBooksResult {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBooks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchBooks(filters)
      setBooks(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load books')
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBooks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.status, filters?.author, filters?.search])

  const addBook = async (book: BookInput) => {
    try {
      setError(null)
      const newBook = await createBook(book)
      setBooks((prev) => [...prev, newBook])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create book')
      throw err
    }
  }

  const editBook = async (id: number, book: Partial<BookInput>) => {
    try {
      setError(null)
      const updatedBook = await updateBook(id, book)
      setBooks((prev) =>
        prev.map((b) => (b.id === id ? updatedBook : b))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book')
      throw err
    }
  }

  const removeBook = async (id: number) => {
    try {
      setError(null)
      await deleteBook(id)
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book')
      throw err
    }
  }

  return {
    books,
    loading,
    error,
    refetch: loadBooks,
    addBook,
    editBook,
    removeBook,
  }
}

