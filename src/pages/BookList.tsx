import { useBooks } from "../hooks/useBooks";

function BookList() {
  const { books, loading, error } = useBooks();

  if (loading) {
    return (
      <div>
        <h1>Book List</h1>
        <p>Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Book List</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Book List</h1>
      {books.length === 0 ? (
        <p>No books found. Add your first book!</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <strong>{book.title}</strong> by {book.author} -{" "}
              <span>{book.status}</span>
              {book.rating && <span> ⭐ {book.rating}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
