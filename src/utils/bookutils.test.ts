import { describe, expect, it } from "vitest";
import type { Book } from "@/types/book";
import { filterBooksByGenre, searchBooksByTitle, sortBooks } from "./bookUtils";

const books = [
  {
    id: 1,
    title: "Dune",
    price: 25.99,
    genres: ["Science Fiction", "Space Opera"]
  },
  {
    id: 2,
    title: "The Hobbit",
    price: 15.99,
    genres: ["Fantasy", "Classic"]
  },
  {
    id: 3,
    title: "Neuromancer",
    price: 19.99,
    genres: ["Science Fiction", "Cyberpunk"]
  },
  {
    id: 4,
    title: "A Game of Thrones",
    price: 29.99,
    genres: ["Fantasy", "Epic Fantasy"]
  }
] as Book[];

describe("filterBooksByGenre", () => {
  it("should return all books when the selected genre does not exist", () => {
    const result = filterBooksByGenre(books, "All");

    expect(result).toHaveLength(4);
    expect(result).toEqual(books);
  });

  it("should return books matching the selected genre", () => {
    const result = filterBooksByGenre(books, "Science Fiction");
    expect(result).toHaveLength(2);
    expect(
      result.every((book) => book.genres.includes("Science Fiction"))
    ).toBe(true);
  });
});

describe("searchBooksByTitle", () => {
  it("should return all books when the search value is empty", () => {
    const result = searchBooksByTitle(books, "");
    expect(result).toEqual(books);
  });

  it("should support partial title searches", () => {
    const result = searchBooksByTitle(books, "game");

    expect(result).toHaveLength(1);
    expect(
      result.every((book) => book.title.toLowerCase().includes("game"))
    ).toBe(true);
  });

  it("should ignore case and surrounding whitespace", () => {
    const result = searchBooksByTitle(books, "  nEuRoMaNcEr  ");

    expect(result).toHaveLength(1);
    expect(
      result.every((book) => book.title.toLowerCase().includes("neuromancer"))
    ).toBe(true);
  });
});

describe("sortBooks", () => {
  it("should preserve the original order when no sort option is selected", () => {
    const result = sortBooks(books, "");
    expect(result).toEqual(books);
  });

  it("should sort titles from A to Z", () => {
    const result = sortBooks(books, "title-asc");
    expect(result.map((book) => book.title)).toEqual([
      "A Game of Thrones",
      "Dune",
      "Neuromancer",
      "The Hobbit"
    ]);
  });

  it("should sort titles from Z to A", () => {
    const result = sortBooks(books, "title-desc");
    expect(result.map((book) => book.title)).toEqual([
      "The Hobbit",
      "Neuromancer",
      "Dune",
      "A Game of Thrones"
    ]);
  });

  it("should sort prices from lowest to highest", () => {
    const result = sortBooks(books, "price-asc");

    expect(result.map((book) => book.price)).toEqual([
      15.99, 19.99, 25.99, 29.99
    ]);
  });

  it("should sort prices from highest to lowest", () => {
    const result = sortBooks(books, "price-desc");

    expect(result.map((book) => book.price)).toEqual([
      29.99, 25.99, 19.99, 15.99
    ]);
  });
});
