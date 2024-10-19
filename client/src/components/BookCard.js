import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div>
      <Link to={`/books/${book._id}`}>
        <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      </Link>

      <h3>{book.title}</h3>
      <p>{book.authors.join(", ")}</p>
      <button>Add to WishList</button>
      <button>Borrow</button>
    </div>
  );
};

export default BookCard;
