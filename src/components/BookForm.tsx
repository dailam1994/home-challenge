"use client";

import { Box, Button, TextField } from "@mui/material";
import type { FormEvent } from "react";
import { useState } from "react";
import type { Book } from "@/types/book";

interface BookFormProps {
  book?: Book;
  onSubmit: (book: Partial<Book>) => void;
  onCancel: () => void;
}

export default function BookForm({ book, onSubmit, onCancel }: BookFormProps) {
  const [formData, setFormData] = useState<Partial<Book>>(
    book ?? {
      title: "",
      author: "",
      price: 0,
      currency: "AUD",
      isbn: "",
      publicationDate: "",
      genres: [],
      publisher: "",
      description: "",
      coverImage: "",
      pages: 0,
      stock: 0,
      rating: 0
    }
  );

  const [errors, setErrors] = useState<Partial<Record<keyof Book, string>>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleBlur = (field: keyof Book, value: string | number): void => {
    let error = "";

    if (
      (typeof value === "string" && !value.trim()) ||
      (field === "price" && value === 0)
    ) {
      switch (field) {
        case "title":
          error = "Title is required";
          break;
        case "author":
          error = "Author is required";
          break;
        case "price":
          error = "Price is required and can not be 0";
          break;
        case "currency":
          error = "Currency is required";
          break;
        case "isbn":
          error = "ISBN is required";
          break;
        case "coverImage":
          error = "Cover image is required";
          break;
        case "description":
          error = "Description is required";
          break;
        default:
          error = "Invalid";
          break;
      }
    }

    setErrors((prev) => ({
      ...prev,
      [field]: error
    }));
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        pt: 1
      }}
    >
      <TextField
        id="title"
        label="Title"
        value={formData.title}
        onChange={(event) =>
          setFormData({
            ...formData,
            title: event.target.value
          })
        }
        onBlur={(e) => handleBlur("title", e.target.value)}
        error={Boolean(errors.title)}
        helperText={errors.title}
        required
        fullWidth
      />

      <TextField
        id="author"
        label="Author"
        value={formData.author}
        onChange={(event) =>
          setFormData({
            ...formData,
            author: event.target.value
          })
        }
        onBlur={(e) => handleBlur("author", e.target.value)}
        error={Boolean(errors.author)}
        helperText={errors.author}
        required
        fullWidth
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr"
          },
          gap: 2
        }}
      >
        <TextField
          id="price"
          label="Price"
          type="number"
          value={formData.price}
          onChange={(event) =>
            setFormData({
              ...formData,
              price: parseFloat(event.target.value)
            })
          }
          onBlur={(e) => handleBlur("price", Number(e.target.value))}
          error={Boolean(errors.price)}
          helperText={errors.price}
          required
          fullWidth
          slotProps={{ htmlInput: { step: "0.01", min: 0 } }}
        />

        <TextField
          id="currency"
          label="Currency"
          value={formData.currency}
          onChange={(event) =>
            setFormData({
              ...formData,
              currency: event.target.value
            })
          }
          onBlur={(e) => handleBlur("currency", e.target.value)}
          error={Boolean(errors.currency)}
          helperText={errors.currency}
          required
          fullWidth
        />
      </Box>

      <TextField
        id="isbn"
        label="ISBN"
        value={formData.isbn}
        onChange={(event) =>
          setFormData({
            ...formData,
            isbn: event.target.value
          })
        }
        onBlur={(e) => handleBlur("isbn", e.target.value)}
        error={Boolean(errors.isbn)}
        helperText={errors.isbn}
        required
        fullWidth
      />

      <TextField
        id="coverImage"
        label="Cover Image URL"
        value={formData.coverImage}
        onChange={(event) =>
          setFormData({
            ...formData,
            coverImage: event.target.value
          })
        }
        onBlur={(e) => handleBlur("coverImage", e.target.value)}
        error={Boolean(errors.coverImage)}
        helperText={errors.coverImage}
        required
        fullWidth
      />

      <TextField
        id="description"
        label="Description"
        value={formData.description}
        onChange={(event) =>
          setFormData({
            ...formData,
            description: event.target.value
          })
        }
        onBlur={(e) => handleBlur("description", e.target.value)}
        error={Boolean(errors.description)}
        helperText={errors.description}
        required
        multiline
        rows={3}
        fullWidth
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1.5,
          pt: 1
        }}
      >
        <Button
          type="button"
          variant="outlined"
          onClick={onCancel}
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          color={book ? "primary" : "success"}
          sx={{ textTransform: "none" }}
          disabled={Object.values(errors).some(Boolean)}
        >
          {book ? "Update Book" : "Add Book"}
        </Button>
      </Box>
    </Box>
  );
}
