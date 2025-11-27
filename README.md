# Book Tracker

A React SPA for tracking your reading progress, rebuilt from a server-rendered Express + EJS application.

## Tech Stack

### Frontend

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server (with SWC for fast compilation)
- **React Router** - Client-side routing

### Backend (To be implemented)

- **Express** - REST API server
- **better-sqlite3** - SQLite database
- **JSON API** - RESTful endpoints at `/api/books`

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
├── server/              # Express backend (to be created)
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

Start the Vite dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or the next available port).

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

### 🚧 In Progress

- Express backend API setup
- Database schema and initialization
- Vite proxy configuration for `/api/*` routes

### 📋 Planned

- Book filtering UI (status, author, search)
- Book creation/editing forms
- Book detail page
- Better UI/styling
- Client-side validation (mirroring server validation)

## API Endpoints (Planned)

All endpoints will be prefixed with `/api/books`:

- `GET /api/books` - List all books (with optional query params: `status`, `author`, `search`)
- `GET /api/books/:id` - Get a single book
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Development Notes

- **Validation**: Server-side validation is authoritative; client-side validation mirrors it for UX
- **CORS**: In development, Vite proxy handles `/api/*` routes to avoid CORS issues
- **Type Safety**: Shared types between frontend and backend ensure consistency
- **No Authentication**: Currently no auth system (to be added later)

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

Private project
