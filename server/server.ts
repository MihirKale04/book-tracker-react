import express from 'express'
import { initDatabase } from './db/database.js'
import { booksRouter } from './routes/books.js'

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Initialize database
initDatabase()

// Routes
app.use('/api/books', booksRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

