"use client";

import { Add, Menu } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useState } from "react";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import GenreNavigation from "@/components/GenreNavigation";
import Modal from "@/components/Modal";
import type { Book } from "@/types/book";
import data from "../../public/data.json";

export default function Page() {
  const [books, setBooks] = useState<Book[]>(data as Book[]);

  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState(false);
  const [isMobileGenreOpen, setIsMobileGenreOpen] = useState(false);

  const handleAddBook = (newBook: Partial<Book>) => {
    const book: Book = {
      ...(newBook as Book),
      id: Math.max(...books.map((b) => b.id)) + 1
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

  const filteredBooks = () => {
    const genreExists = books.some((book) =>
      book.genres.includes(selectedGenre)
    );

    return genreExists
      ? books.filter((book) => book.genres.includes(selectedGenre))
      : books;
  };

  return (
    <main className="main">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "100%", md: "20% 1fr" },
          gap: 3
        }}
      >
        <Box
          component="aside"
          sx={{
            display: { xs: "none", md: "block" },
            pt: 10,
            pr: 2,
            borderRight: 1,
            borderColor: "divider"
          }}
        >
          <Box
            sx={{
              position: "sticky",
              top: "80px"
            }}
          >
            <GenreNavigation
              books={books}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
          </Box>
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Box
            sx={{
              position: "sticky",
              top: 0,

              mx: -0.2,
              py: 2.5,
              backgroundColor: "background.default",
              zIndex: 1000
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                {/* Mobile */}
                <IconButton
                  onClick={() => setIsMobileGenreOpen((open) => !open)}
                  aria-label="Toggle mobile genre navigation"
                  sx={{ display: { xs: "inline-flex", sm: "none" } }}
                >
                  <Menu />
                </IconButton>

                {/* Tablet */}
                <IconButton
                  onClick={() => setIsGenreDrawerOpen(true)}
                  aria-label="Open tablet genre navigation"
                  sx={{
                    display: { xs: "none", sm: "inline-flex", md: "none" }
                  }}
                >
                  <Menu />
                </IconButton>

                <Typography variant="h4" sx={{ ml: 2, fontWeight: "bold" }}>
                  Book Gallery
                </Typography>
              </Box>

              <Box
                sx={{ justifyContent: { xs: "flex-end", sm: "space-between" } }}
              >
                {/* Mobile */}
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                  <IconButton
                    onClick={() => {
                      setSelectedBook(undefined);
                      setIsModalOpen(true);
                    }}
                    color="primary"
                    sx={{
                      mr: 1,
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.2),
                      border: "1px solid transparent",
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.2),
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.main}`
                      }
                    }}
                  >
                    <Add />
                  </IconButton>
                </Box>

                {/* Tablet/Desktop */}
                <Button
                  onClick={() => {
                    setSelectedBook(undefined);
                    setIsModalOpen(true);
                  }}
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    textTransform: "none"
                  }}
                >
                  Add New Book
                </Button>
              </Box>
            </Box>

            {/* Mobile */}
            <Box
              sx={{
                position: "relative",
                display: { xs: "block", sm: "none" },
                zIndex: 999
              }}
            >
              <Collapse
                in={isMobileGenreOpen}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  left: 0
                }}
              >
                <Box
                  sx={{
                    display: { xs: "block", sm: "none" },
                    mb: 2,
                    p: 2,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider"
                  }}
                >
                  <GenreNavigation
                    books={books}
                    selectedGenre={selectedGenre}
                    onGenreChange={(genre) => {
                      setSelectedGenre(genre);
                      setIsMobileGenreOpen(false);
                    }}
                  />
                </Box>
              </Collapse>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
              mb: 2
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: "primary.main",
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                borderRadius: 2
              }}
            >
              {selectedGenre}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ fontWeight: 600 }}
            >
              {filteredBooks().length}{" "}
              {filteredBooks().length === 1 ? "book" : "books"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)"
              },
              gap: 3
            }}
          >
            {filteredBooks().map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onEdit={handleEdit}
                onDelete={handleDeleteBook}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Tablet */}
      <Drawer
        anchor="left"
        open={isGenreDrawerOpen}
        onClose={() => setIsGenreDrawerOpen(false)}
      >
        <Box
          sx={{
            width: 280,
            p: 2
          }}
        >
          <GenreNavigation
            books={books}
            selectedGenre={selectedGenre}
            onGenreChange={(genre) => {
              setSelectedGenre(genre);
              setIsGenreDrawerOpen(false);
            }}
          />
        </Box>
      </Drawer>

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
