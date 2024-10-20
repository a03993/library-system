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
    <div className="container">
      <div className="row g-3">
        <div className="card">
          <img
            src={book.imageLinks.smallThumbnail}
            alt={book.title}
            className="mx-auto d-block border m-3"
            style={{ height: "250px" }}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.authors.join(", ")}</p>
            <div className="mt-auto d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary"
                onClick={handleAddToWishlist}
              >
                Wishlist
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={handleClickToBorrow}
              >
                Borrow
              </button>
              <Link className="btn btn-secondary" to={`/books/${book._id}`}>
                View Book Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
