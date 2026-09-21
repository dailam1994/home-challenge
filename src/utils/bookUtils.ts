import type { Book } from "@/types/book";

export const filterBooksByGenre = (
  books: Book[],
  selectedGenre: string
): Book[] => {
  const genreExists: boolean = books.some((book) =>
    book.genres.includes(selectedGenre)
  );

  return genreExists
    ? books.filter((book) => book.genres.includes(selectedGenre))
    : books;
};

export const searchBooksByTitle = (books: Book[], search: string): Book[] => {
  return books.filter((book) =>
    book.title.toLowerCase().includes(search.trim().toLowerCase())
  );
};

export const sortBooks = (books: Book[], sortBy: string): Book[] => {
  return [...books].sort((a, b) => {
    switch (sortBy) {
      case "title-asc":
        return a.title.localeCompare(b.title);

      case "title-desc":
        return b.title.localeCompare(a.title);

      case "price-asc":
        return a.price - b.price;

      case "price-desc":
        return b.price - a.price;

      default:
        return 0;
    }
  });
};
