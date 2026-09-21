"use client";

import { Add, Menu, Search } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Collapse,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography
} from "@mui/material";
import Fade from "@mui/material/Fade";
import { alpha } from "@mui/material/styles";
import { useContext, useState } from "react";
import { AppThemeContext } from "@/components/AppThemeProvider";
import BookCard from "@/components/BookCard";
import BookForm from "@/components/BookForm";
import Dialog from "@/components/Dialog";
import GenreNavigation from "@/components/GenreNavigation";
import MaterialUISwitch from "@/components/MaterialUISwitch";
import type { Book } from "@/types/book";
import {
  filterBooksByGenre,
  searchBooksByTitle,
  sortBooks
} from "@/utils/bookUtils";
import data from "../../public/data.json";

export default function Page() {
  const { darkMode, handleDarkMode } = useContext(AppThemeContext);

  const [books, setBooks] = useState<Book[]>(data as Book[]);

  const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
  const [selectedGenre, setSelectedGenre] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isGenreDrawerOpen, setIsGenreDrawerOpen] = useState<boolean>(false);
  const [isMobileGenreOpen, setIsMobileGenreOpen] = useState<boolean>(false);

  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddBook = (newBook: Partial<Book>) => {
    setIsSubmitted(false);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const book: Book = {
        ...(newBook as Book),
        id: Math.max(...books.map((b) => b.id)) + 1
      };
      setBooks([...books, book]);
      setSuccessMessage("OK: Book added successfully.");
      setIsSubmitted(true);
    } catch (e) {
      setErrorMessage("Bad Request: Failed to add book.");
      console.error("Failed to add book:", e);
    }
  };

  const handleUpdateBook = (updatedBook: Partial<Book>) => {
    setIsSubmitted(false);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      setBooks(
        books.map((book) =>
          book.id === selectedBook?.id ? { ...updatedBook, ...book } : book
        )
      );
      setSuccessMessage("OK: Book updated successfully.");
      setIsSubmitted(true);
      setSelectedBook(undefined);
    } catch (e) {
      setErrorMessage("Bad Request: Failed to update book.");
      console.error("Failed to update book:", e);
    }
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

  const filteredBooks = (): Book[] => {
    const genreFiltered: Book[] = filterBooksByGenre(books, selectedGenre);
    const searchFiltered: Book[] = searchBooksByTitle(genreFiltered, search);
    return sortBooks(searchFiltered, sortBy);
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
            bgcolor: "background.default",
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
              onGenreChange={(genre) => {
                setSearch("");
                setSortBy("");
                setSelectedGenre(genre);
              }}
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
                {/* Mobile Menu */}
                <IconButton
                  onClick={() => setIsMobileGenreOpen((open) => !open)}
                  aria-label="Toggle mobile genre navigation"
                  sx={{ display: { xs: "inline-flex", sm: "none" } }}
                >
                  <Menu />
                </IconButton>

                {/* Tablet Menu */}
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2
                }}
              >
                {/* Desktop Search */}
                <TextField
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search title..."
                  size="small"
                  sx={{
                    display: { xs: "none", md: "block" },
                    width: 220,
                    bgcolor: "background.paper",
                    "& .MuiInputBase-root": { height: 40 }
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      )
                    }
                  }}
                />

                {/* Desktop Sort By */}
                <FormControl
                  size="small"
                  sx={{
                    display: { xs: "none", md: "inline-flex" },
                    minWidth: 190
                  }}
                >
                  <InputLabel id="sort-by-label">Sort by</InputLabel>

                  <Select
                    labelId="sort-by-label"
                    label="Sort by"
                    value={sortBy}
                    size="small"
                    onChange={(event) => setSortBy(event.target.value)}
                    sx={{
                      height: 40,
                      width: 200,
                      bgcolor: "background.paper",
                      fontSize: "0.875rem"
                    }}
                  >
                    <MenuItem value="title-asc">Title (A - Z)</MenuItem>
                    <MenuItem value="title-desc">Title (Z - A)</MenuItem>
                    <MenuItem value="price-asc">
                      Price (Lowest - Highest)
                    </MenuItem>
                    <MenuItem value="price-desc">
                      Price (Highest - Lowest)
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* Dark/Light Mode */}
                <FormControlLabel
                  label="Mode"
                  control={
                    <MaterialUISwitch
                      checked={darkMode}
                      onChange={handleDarkMode}
                      slotProps={{
                        input: { "aria-label": "Toggle dark/light mode" }
                      }}
                    />
                  }
                  sx={{
                    mr: { xs: -2, sm: -1 },
                    "& .MuiFormControlLabel-label": {
                      display: { xs: "none", sm: "block" },
                      fontWeight: 600
                    }
                  }}
                />

                {/* Mobile Add Book */}
                <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                  <IconButton
                    onClick={() => {
                      setSelectedBook(undefined);
                      setIsModalOpen(true);
                    }}
                    color="primary"
                    sx={{
                      display: { xs: "inline-flex", sm: "none" },
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

                {/* Tablet / Desktop Add Book */}
                <Button
                  onClick={() => {
                    setSelectedBook(undefined);
                    setIsModalOpen(true);
                  }}
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    display: { xs: "none", sm: "inline-flex" },
                    height: 40,
                    whiteSpace: "nowrap",
                    textTransform: "none"
                  }}
                >
                  Add New Book
                </Button>
              </Box>
            </Box>

            {/* Mobile Genre Navigation */}
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
                      setSearch("");
                      setSortBy("");
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
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 1,
              mb: 2
            }}
          >
            {/* Mobile / Tablet Search */}
            <TextField
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title..."
              size="small"
              fullWidth
              sx={{
                bgcolor: "background.paper",
                "& .MuiInputBase-root": {
                  height: 40
                }
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" />
                    </InputAdornment>
                  )
                }
              }}
            />

            {/* Mobile / Tablet Sort by */}
            <FormControl
              size="small"
              sx={{
                width: { xs: "100%", sm: 220 },
                flexShrink: 0
              }}
            >
              <InputLabel id="responsive-sort-by-label">Sort by</InputLabel>

              <Select
                labelId="responsive-sort-by-label"
                label="Sort by"
                value={sortBy}
                size="small"
                onChange={(event) => setSortBy(event.target.value)}
                sx={{
                  height: 40,
                  bgcolor: "background.paper",
                  fontSize: "0.875rem"
                }}
              >
                <MenuItem value="title-asc">Title (A - Z)</MenuItem>
                <MenuItem value="title-desc">Title (Z - A)</MenuItem>
                <MenuItem value="price-asc">Price (Lowest - Highest)</MenuItem>
                <MenuItem value="price-desc">Price (Highest - Lowest)</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Genre selection display */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
              mb: { xs: 1.5, sm: 2 }
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

          {/* Book list display */}
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

      {/* Tablet Drawer */}
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
              setSearch("");
              setSortBy("");
              setSelectedGenre(genre);
              setIsGenreDrawerOpen(false);
            }}
          />
        </Box>
      </Drawer>

      <Dialog
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsSubmitted(false);
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
          isSubmitted={isSubmitted}
        />
      </Dialog>

      <Snackbar
        open={!!successMessage}
        onClose={() => setSuccessMessage("")}
        autoHideDuration={5000}
        slots={{ transition: Fade }}
        slotProps={{
          transition: {
            timeout: { enter: 0, exit: 555 }
          }
        }}
      >
        <Alert
          onClose={() => setSuccessMessage("")}
          severity="success"
          variant="filled"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            borderRadius: 0,
            zIndex: 1400
          }}
        >
          {successMessage}
        </Alert>
      </Snackbar>

      {errorMessage && (
        <Alert
          onClose={() => setErrorMessage("")}
          severity="error"
          variant="filled"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            borderRadius: 0,
            zIndex: 1400
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </main>
  );
}
