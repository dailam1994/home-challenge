export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  currency: string;
  isbn: string;
  publicationDate: string;
  genres: string[];
  publisher: string;
  description: string;
  coverImage: string;
  pages: number;
  stock: number;
  rating: number;
}
