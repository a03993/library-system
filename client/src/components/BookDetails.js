import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookService from "../services/bookService";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    BookService.getBookDetail(id)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={book.imageLinks.thumbnail}
            alt={book.title}
            className="mx-auto d-block border m-3 rounded"
            style={{ width: "70%", height: "auto" }}
          />
        </div>
        <div className="col-md-8">
          <h1>{book.title}</h1>
          <h2 className="text-muted">{book.subtitle}</h2>
          <p className="mt-3">{book.description}</p>
          <p>
            <strong>Author:</strong> {book.authors.join(", ")}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Published Date:</strong>{" "}
            {new Date(book.publishedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
