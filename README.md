# Library Borrowing System

Welcome to the Library Borrowing System! This project is designed to help users browse, borrow, and manage books within a library. Users can register, log in, and view their profiles, while administrators can manage the library's collection of books.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)

## Features

- **User Registration and Authentication**: Secure user registration and login using JWT.
- **Profile Management**: Users can view and update their profiles.
- **Book Management**: Users can browse available books and manage their borrowing status.
- **Wishlist Functionality**: Users can add or remove books from their wishlist.
- **Responsive Design**: Built with Bootstrap for a user-friendly interface.

## Technologies Used

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **HTTP Client**: Axios

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/library-borrowing-system.git
   ```
2. **Navigate to the server directory**:
   ```bash
   cd library-borrowing-system/server
   ```
3. **nstall dependencies**:
   ```bash
   npm install
   ```
4. **Set up your environment variables**:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   PASSPORT_SECRET=your_jwt_secret
   ```
5. **Run the server**:
   ```bash
   cd server
   nodemon index.js
   ```
6. **Install client dependencies**:
   ```bash
   cd client
   ```
7. **nstall dependencies**:
   ```bash
   npm install
   ```
8. **Run the client**:
   ```bash
   npm start
   ```

## Usage

- Visit http://localhost:3000 to access the application.
- Register a new user account or log in with an existing account.
- Browse books, manage your wishlist, and view your profile.

## API Endpoints

- User Registration: POST /api/user/register
- User Login: POST /api/user/login
- Add to Wishlist: POST /api/user/wishlist/add
- Remove from Wishlist: POST /api/user/wishlist/remove
- Get User Wishlist: GET /api/user/wishlist/:userId
- Add Book: POST /api/books/addBook
- Get All Books: GET /api/books
- Update Book Status: PUT /api/books/:bookId

## Database Schema

User
- name: String (required)
- email: String (required, unique)
- password: String (required)
- wishlist: Array of Book IDs

Book
- title: String (required)
- author: String (required)
- isbn: String (required, unique)
- isBorrowed: Boolean (default: false)

