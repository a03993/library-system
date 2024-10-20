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
    <div className="container mt-5">
      <SearchBar onSearch={handleSearch} />

      {!filteredBooks.length && (
        <div className="alert alert-warning text-center mt-3">
          Cannot find any books by "<strong>{filteredValue}</strong>"
        </div>
      )}

      <div className="row mt-4">
        {filteredBooks.map((book) => (
          <div className="col-md-4 mb-4" key={book._id}>
            <BookCard book={book} currentUser={currentUser} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
