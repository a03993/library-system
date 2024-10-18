import React, { useState, useEffect } from "react";
import BookCard from "./BookCard";
import BookService from "../services/bookService";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BookService.getBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  return (
    <div>
      <div>
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
