import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div>
      <img src={book.imageLinks.smallThumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.authors.join(", ")}</p>
      <button>Add to WishList</button>
      <button>Borrow</button>
    </div>
  );
};

export default BookCard;
