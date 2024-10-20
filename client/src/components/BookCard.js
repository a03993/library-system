import React from "react";
import { Link } from "react-router-dom";
import BookService from "../services/bookService";

const BookCard = ({ book, currentUser }) => {
  const handleClick = async () => {
    if (!currentUser) {
      window.alert("Please log in");
    }
    try {
      const response = await BookService.borrowBook(
        currentUser.user._id,
        book._id
      );

      if (response.status === 201) {
        window.alert("Book borrowed successfully!");
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      window.alert("Failed to borrow book. Please try again.");
    }
  };

  return (
    <div>
      <Link to={`/books/${book._id}`}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      </Link>

      <h3>{book.title}</h3>
      <p>{book.authors.join(", ")}</p>
      <button>Add to WishList</button>
      <button onClick={handleClick}>Borrow</button>
    </div>
  );
};

export default BookCard;
