import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import BookService from "../services/bookService";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");

  useEffect(() => {
    BookService.getBooks()
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredBooks(books);
    } else {
      setFilteredValue(searchTerm);
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = books.filter((book) => {
        const title = book.title ? book.title.toLowerCase() : "";
        return title.includes(lowercasedTerm);
      });
      setFilteredBooks(filtered);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {!filteredBooks.length && (
        <div>Can not find the books by {filteredValue}</div>
      )}
      <div>
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
