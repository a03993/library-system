import React from "react";
import { Link } from "react-router-dom";
import BookService from "../services/bookService";
import UserService from "../services/userService";

const BookCard = ({ book, currentUser }) => {
  const handleAddToWishlist = async () => {
    if (!currentUser) {
      return window.alert("Please login first!");
    }

    try {
      const response = await UserService.addToWishlist(
        currentUser.user._id,
        book._id
      );
      window.alert(response.data.msg);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert("This book is already in your wishlist!");
      } else {
        console.error("Error adding to wishlist:", error);
        window.alert("Failed to add to wishlist. Please try again.");
      }
    }
  };

  const handleClickToBorrow = async () => {
    if (!currentUser) {
      window.alert("Please login first!");
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
      <button onClick={handleAddToWishlist}>Add to WishList</button>
      <button onClick={handleClickToBorrow}>Borrow</button>
    </div>
  );
};

export default BookCard;
