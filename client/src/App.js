import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePageComponent from "./components/HomePage";
import RegisterComponent from "./components/Register";
import LoginComponent from "./components/Login";
import BookDetailsComponent from "./components/BookDetails";
import BorrowingRecordComponent from "./components/BorrowingRecord";
import WishListComponent from "./components/WishList";
import UserService from "./services/userService";

function App() {
  let [currentUser, setCurrentUser] = useState(UserService.getCurrentUser());
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route
              index
              element={<HomePageComponent currentUser={currentUser} />}
            ></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
            <Route
              path="/login"
              element={<LoginComponent setCurrentUser={setCurrentUser} />}
            ></Route>
            <Route path="/books/:id" element={<BookDetailsComponent />} />
            <Route
              path="/borrowings/:userId"
              element={<BorrowingRecordComponent currentUser={currentUser} />}
            />
            <Route
              path="/wishlist/:userId"
              element={<WishListComponent currentUser={currentUser} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
