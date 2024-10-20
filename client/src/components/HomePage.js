import React from "react";
import BookList from "./BookList";

const HomePage = ({ currentUser }) => {
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Home Page</h1>
      <BookList currentUser={currentUser} />
    </div>
  );
};

export default HomePage;
