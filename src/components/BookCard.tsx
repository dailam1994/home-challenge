import { DeleteForever, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import Image from "next/image";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: number) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        boxShadow: 5
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: 300,
          width: "100%"
        }}
      >
        <Image
          src={book.coverImage}
          alt={`Cover of ${book.title}`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={book.id === 1}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{book.title}</Typography>
        <Typography>{book.author}</Typography>

        <Typography
          sx={{
            mb: 1,
            fontWeight: 600,
            color: "green"
          }}
        >
          {book.currency} {book.price.toFixed(2)}
        </Typography>

        <Typography variant="body2">{book.description}</Typography>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: {
            xs: "flex-end",
            sm: "space-between"
          }
        }}
      >
        {/* Mobile */}
        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            onClick={() => onEdit(book)}
            color="primary"
            aria-label={`Edit ${book.title}`}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              border: "1px solid transparent",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                border: (theme) => `1px solid ${theme.palette.primary.main}`
              }
            }}
          >
            <Edit />
          </IconButton>

          <IconButton
            onClick={() => onDelete(book.id)}
            color="error"
            aria-label={`Delete ${book.title}`}
            sx={{
              ml: 1,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
              border: "1px solid transparent",
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
                border: (theme) => `1px solid ${theme.palette.error.main}`
              }
            }}
          >
            <DeleteForever />
          </IconButton>
        </Box>

        {/* Tablet/Desktop */}
        <Button
          onClick={() => onEdit(book)}
          variant="outlined"
          startIcon={<Edit />}
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            textTransform: "none"
          }}
        >
          Edit
        </Button>

        <Button
          onClick={() => onDelete(book.id)}
          variant="contained"
          color="error"
          startIcon={<DeleteForever />}
          sx={{
            display: { xs: "none", sm: "inline-flex" },
            textTransform: "none"
          }}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
