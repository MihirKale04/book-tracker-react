# Book Tracker

A React SPA for tracking your reading progress, rebuilt from a server-rendered Express + EJS application.

## Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server (with SWC for fast compilation)
- **React Router** - Client-side routing

### Backend

- **Express** - REST API server
- **better-sqlite3** - SQLite database
- **JSON API** - RESTful endpoints at `/api/books`
- **TypeScript** - Type-safe server code

## Project Structure

```
book-tracker-react/
├── src/
│   ├── components/       # Reusable UI components
│   │   └── Layout.tsx
│   ├── pages/           # Route components
│   │   └── BookList.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useBooks.ts
│   ├── types/           # TypeScript type definitions
│   │   ├── book.ts
│   │   └── api.ts
│   ├── utils/           # Helper functions
│   │   └── api.ts       # API client functions
│   ├── App.tsx          # Router setup
│   └── main.tsx         # Entry point
├── server/              # Express backend
│   ├── db/             # Database setup
│   │   └── database.ts
│   ├── routes/         # API routes
│   │   └── books.ts
│   ├── middleware/     # Express middleware
│   │   └── validation.ts
│   ├── types/          # TypeScript types
│   │   └── book.ts
│   └── server.ts       # Express app entry point
├── data/               # SQLite database (gitignored)
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v20.19.0+ recommended)
- npm

### Installation

```bash
npm install
```

### Development

You need to run both the Express backend and Vite frontend servers:

**Terminal 1 - Start the Express backend:**

```bash
npm run server
```

The API will be available at `http://localhost:3000`

**Terminal 2 - Start the Vite dev server:**

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

The Vite dev server is configured to proxy `/api/*` requests to the Express server automatically.

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Current Status

### ✅ Implemented

- React Router setup with Layout component
- TypeScript type definitions for Book model and API responses
- API client functions (`fetchBooks`, `createBook`, `updateBook`, `deleteBook`)
- Custom `useBooks` hook for state management
- BookList page with loading and error states
- Basic book display (title, author, status, rating)
- Express backend API with all CRUD endpoints
- SQLite database with schema initialization
- Server-side validation middleware
- Vite proxy configuration for `/api/*` routes
- Type-safe backend code matching frontend types

### 📋 Planned

- Book filtering UI (status, author, search)
- Book creation/editing forms
- Book detail page
- Better UI/styling
- Client-side validation (mirroring server validation)

## API Endpoints

All endpoints are prefixed with `/api/books`:

- `GET /api/books` - List all books (with optional query params: `status`, `author`, `search`)
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book (requires: `title`, `author`, `status`)
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

**Health Check:**

- `GET /health` - Server health check endpoint

All endpoints return JSON responses. Error responses include an `error` field, and validation errors include a `fields` object with field-specific messages.

## Development Notes

- **Validation**: Server-side validation is authoritative; client-side validation mirrors it for UX
- **CORS**: In development, Vite proxy handles `/api/*` routes to avoid CORS issues
- **Type Safety**: Shared types between frontend and backend ensure consistency
- **No Authentication**: Currently no auth system (to be added later)

## Scripts

- `npm run dev` - Start Vite dev server (frontend)
- `npm run server` - Start Express server (backend)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

Private project
