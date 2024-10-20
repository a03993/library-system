import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import BookService from "../services/bookService";

const BookList = ({ currentUser }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [filteredValue, setFilteredValue] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = (searchTerm = "") => {
    BookService.getBooks(searchTerm)
      .then((response) => {
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  };

  const handleSearch = (searchTerm) => {
    setFilteredValue(searchTerm);
    fetchBooks(searchTerm);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {!filteredBooks.length && (
        <div>Can not find any books by "{filteredValue}"</div>
      )}
      <div>
        {filteredBooks.map((book) => (
          <BookCard key={book._id} book={book} currentUser={currentUser} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
