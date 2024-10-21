import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BookService from "../services/bookService";
import UserService from "../services/userService";

const BookCard = ({ book, currentUser }) => {
  const [isReturned, setIsReturned] = useState(book.status.isReturned);
  const [borrower, setBorrower] = useState(book.status.borrower);

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
      window.alert("Failed to add to wishlist. Please try again.");
    }
  };

  const handleClickToBorrowOrReturn = async () => {
    if (!currentUser) {
      return window.alert("Please login first!");
    }

    try {
      if (!isReturned) {
        const response = await BookService.returnBook(
          currentUser.user._id,
          book._id
        );
        if (response.status === 200) {
          window.alert("Book returned successfully!");
          setIsReturned(true);
          setBorrower(null);
        }
      } else {
        const response = await BookService.borrowBook(
          currentUser.user._id,
          book._id
        );
        if (response.status === 201) {
          window.alert("Book borrowed successfully!");
          setIsReturned(false);
          setBorrower(currentUser.user._id);
        }
      }
    } catch (error) {
      window.alert("Failed to borrow or return book. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row g-3">
        <div className="card">
          <img
            src={book.imageLinks.smallThumbnail}
            alt={book.title}
            className="mx-auto img-fluid d-block border m-3"
            style={{ height: "250px" }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{book.title}</h5>
            <p className="card-text">{book.authors.join(", ")}</p>
            <div className="d-flex flex-wrap">
              <button
                className="btn btn-outline-secondary m-1"
                onClick={handleAddToWishlist}
              >
                Wishlist
              </button>
              <button
                className={`btn ${
                  !isReturned
                    ? currentUser?.user._id === borrower
                      ? "btn-warning m-1"
                      : "btn-secondary m-1 disabled"
                    : "btn-outline-secondary m-1"
                }`}
                onClick={handleClickToBorrowOrReturn}
              >
                {!isReturned
                  ? currentUser?.user._id === borrower
                    ? "Return"
                    : "Borrowed"
                  : "Borrow"}
              </button>
              <Link
                className="btn btn-outline-info m-1"
                to={`/books/${book._id}`}
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
