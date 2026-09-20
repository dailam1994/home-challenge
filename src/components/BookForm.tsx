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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
        >
          {book ? "Update Book" : "Add Book"}
        </Button>
      </Box>
    </Box>
  );
}
