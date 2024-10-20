import React from "react";
import BookList from "./BookList";

const HomePage = ({ currentUser }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <BookList currentUser={currentUser} />
    </div>
  );
};

export default HomePage;
