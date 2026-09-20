import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import type { Book } from "@/types/book";

interface GenreNavigationProps {
  books: Book[];
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

export default function GenreNavigation({
  books,
  selectedGenre,
  onGenreChange
}: GenreNavigationProps) {
  const primaryGenres = ["All", "Science Fiction", "Fantasy"];
  const genres = [...new Set(books.flatMap((book) => book.genres))].sort();

  const moreGenres = genres.filter((genre) => !primaryGenres.includes(genre));
  const isMoreGenreSelected = moreGenres.includes(selectedGenre);
  const [moreGenresOpen, setMoreGenresOpen] = useState(false);

  useEffect(() => {
    if (isMoreGenreSelected) {
      setMoreGenresOpen(true);
    }
  }, [isMoreGenreSelected]);

  const getGenreCount = (genre: string) =>
    genre === "All"
      ? books.length
      : books.filter((book) => book.genres.includes(genre)).length;

  return (
    <Stack spacing={1}>
      {primaryGenres.map((genre) => {
        const isSelected = selectedGenre === genre;

        return (
          <Button
            key={genre}
            fullWidth
            onClick={() => onGenreChange(genre)}
            sx={{
              justifyContent: "flex-start",
              px: 2,
              py: 1.25,
              textTransform: "none",
              fontWeight: 600,
              color: isSelected ? "primary.main" : "text.secondary",
              bgcolor: isSelected ? "action.selected" : "transparent",
              borderLeft: (theme) =>
                `5px solid ${isSelected ? theme.palette.primary.main : "transparent"}`,
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.25)
              }
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%"
              }}
            >
              {genre}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 600 }}
              >
                {getGenreCount(genre)}
              </Typography>
            </Box>
          </Button>
        );
      })}

      <Button
        fullWidth
        onClick={() => setMoreGenresOpen((open) => !open)}
        endIcon={
          <KeyboardArrowDown
            sx={{
              transform: moreGenresOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s"
            }}
          />
        }
        sx={{
          justifyContent: "flex-start",
          px: 2,
          py: 1.25,
          textTransform: "none",
          fontWeight: 600,
          color: isMoreGenreSelected ? "primary.main" : "text.secondary",
          bgcolor: isMoreGenreSelected
            ? (theme) => alpha(theme.palette.primary.main, 0.12)
            : "transparent",
          borderLeft: (theme) =>
            `5px solid ${isMoreGenreSelected ? theme.palette.primary.main : "transparent"}`,
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.25)
          },
          "& .MuiButton-endIcon": { marginLeft: "auto" }
        }}
      >
        More Genres
      </Button>

      <Collapse in={moreGenresOpen}>
        <Stack
          sx={{
            overflowY: "auto",
            maxHeight: { xs: "300px", sm: "calc(100vh - 320px)" },
            scrollbarWidth: "thin",
            mt: 0.5,
            pr: 0.5,
            pl: 2
          }}
        >
          {moreGenres.map((genre) => {
            const isSelected = selectedGenre === genre;

            return (
              <Button
                key={genre}
                fullWidth
                onClick={() => onGenreChange(genre)}
                sx={{
                  justifyContent: "flex-start",
                  px: 2,
                  py: 0.75,
                  textTransform: "none",
                  fontSize: "0.875rem",
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? "primary.main" : "text.secondary",
                  bgcolor: isSelected
                    ? (theme) => alpha(theme.palette.primary.main, 0.12)
                    : "transparent",
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08)
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%"
                  }}
                >
                  {genre}

                  <Typography variant="caption" color="text.secondary">
                    {getGenreCount(genre)}
                  </Typography>
                </Box>
              </Button>
            );
          })}
        </Stack>
      </Collapse>
    </Stack>
  );
}
