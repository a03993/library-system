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
    <div>
      <h2>Your Borrowing Records</h2>
      {records.length === 0 ? (
        <p>No borrowing records found.</p>
      ) : (
        <ul>
          {records.map((record) => (
            <li key={record._id}>
              <h3>{record.bookId.title}</h3>
              <p>Author: {record.bookId.authors.join(", ")}</p>
              <p>
                Borrow Date: {new Date(record.borrowDate).toLocaleDateString()}
              </p>
              <Link to={`/books/${record.bookId._id}`}>
                <img
                  src={record.bookId.imageLinks.thumbnail}
                  alt={record.bookId.title}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowingRecord;
