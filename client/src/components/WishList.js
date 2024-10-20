import React, { useState, useEffect } from "react";
import UserService from "../services/userService";
import { Link } from "react-router-dom";

const Wishlist = ({ currentUser }) => {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await UserService.getWishlist(currentUser.user._id);
        setWishlist(response.data.wishlist);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching wishlist:", err);
      }
    };

    if (currentUser) {
      fetchWishlist();
    }
  }, [currentUser]);

  const handleRemove = async (bookId) => {
    try {
      const response = await UserService.removeBookFromWishlist(
        currentUser.user._id,
        bookId
      );
      setWishlist(response.data.wishlist);
      window.alert("Book removed from wishlist!");
    } catch (err) {
      console.error("Error removing book from wishlist:", err);
      window.alert("Failed to remove book. Please try again.");
    }
  };

  if (!currentUser) {
    return <div>Please log in to view your wishlist.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Oops...Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>
                <img src={book.imageLinks.smallThumbnail} alt={book.title} />
              </Link>
              <h3>{book.title}</h3>
              <p>{book.authors.join(", ")}</p>
              <button onClick={() => handleRemove(book._id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
