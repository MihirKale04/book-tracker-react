import Database from 'better-sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import type { BookRow } from '../types/book.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Database file path
const dbPath = path.join(__dirname, '../../data/books.db')

// Create data directory if it doesn't exist
import { mkdirSync } from 'fs'
const dataDir = path.dirname(dbPath)
try {
  mkdirSync(dataDir, { recursive: true })
} catch (err) {
  // Directory might already exist, ignore
}

// Initialize database
export const db = new Database(dbPath)

// Enable foreign keys
db.pragma('foreign_keys = ON')

/**
 * Initialize the database schema
 */
export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('to-read', 'reading', 'completed')),
      rating INTEGER CHECK(rating >= 1 AND rating <= 10),
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `)
}

/**
 * Convert database row to Book interface
 */
export function rowToBook(row: BookRow) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    status: row.status,
    rating: row.rating ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

