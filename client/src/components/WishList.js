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
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((book) => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>
                <img src={book.imageLinks.smallThumbnail} alt={book.title} />
              </Link>
              <h3>{book.title}</h3>
              <p>{book.authors.join(", ")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
