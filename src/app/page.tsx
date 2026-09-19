"use client";

import { useState } from "react";
import data from "../../public/data.json";
import BookCard from "@/components/BookCard";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";
import { Book } from "@/types/book";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1,
    };
    setBooks([...books, book]);
    setIsModalOpen(false);
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setBooks(
      books.map((book) =>
        book.id === selectedBook?.id ? { ...updatedBook, ...book } : book
      )
    );
    setIsModalOpen(false);
    setSelectedBook(undefined);
  };

  const handleDeleteBook = (id: number) => {
    if (confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const handleEdit = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Book Gallery</h1>
        <button
          onClick={() => {
            setSelectedBook(undefined);
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Add New Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onEdit={handleEdit}
            onDelete={handleDeleteBook}
          />
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(undefined);
        }}
        title={selectedBook ? "Edit Book" : "Add New Book"}
      >
        <BookForm
          book={selectedBook}
          onSubmit={selectedBook ? handleUpdateBook : handleAddBook}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedBook(undefined);
          }}
        />
      </Modal>
    </main>
  );
}
