import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePageComponent from "./components/HomePage";
import RegisterComponent from "./components/Register";
import LoginComponent from "./components/Login";
import BookDetails from "./components/BookDetails";
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
            <Route index element={<HomePageComponent />}></Route>
            <Route path="/register" element={<RegisterComponent />}></Route>
            <Route
              path="/login"
              element={<LoginComponent setCurrentUser={setCurrentUser} />}
            ></Route>
            <Route path="/books/:id" element={<BookDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
