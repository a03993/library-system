import React, { useEffect, useState } from "react";
import BookService from "../services/bookService";
import { Link } from "react-router-dom";

const BorrowingRecord = ({ currentUser }) => {
  const userId = currentUser.user._id;
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowingRecords = async () => {
      try {
        const response = await BookService.getBorrowingRecords(userId);
        setRecords(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching borrowing records:", err);
      }
    };

    fetchBorrowingRecords();
  }, [userId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center mb-4">Your Borrowing Records</h2>
      {records.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No borrowing records found.
        </div>
      ) : (
        <ul className="list-unstyled">
          {records.map((record) => (
            <li key={record._id}>
              <div className="card mb-2">
                <div className="row g-10">
                  <div className="col-md-2">
                    <Link to={`/books/${record.bookId._id}`}>
                      <img
                        src={record.bookId.imageLinks.thumbnail}
                        alt={record.bookId.title}
                        className="mx-auto d-block border m-3"
                      />
                    </Link>
                  </div>
                  <div className="col-md-10">
                    <div className="card-body">
                      <h5 className="card-title">{record.bookId.title}</h5>
                      <p className="card-text">
                        <strong>Author:</strong>{" "}
                        {record.bookId.authors.join(", ")}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          Borrow Date:{" "}
                          {new Date(record.borrowDate).toLocaleDateString()}
                        </small>
                      </p>
                      <Link
                        to={`/books/${record.bookId._id}`}
                        className="btn btn-primary"
                      >
                        View Book Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowingRecord;
