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
   git clone https://github.com/a03993/mingliu-library-system.git
   ```
2. **Navigate to the server directory**:
   ```bash
   cd mingliu-library-system/server
   ```
3. **Set up your environment variables**:
   ```bash
   export MONGO_URI=mongodb+srv://a03993a:zZt9SZm9UnOwyzTN@library.cbkti.mongodb.net/
   export PASSPORT_SECRET=library_system_by_tina
   ```
4. **install dependencies**:
   ```bash
   npm install
   ```
5. **Run the server**:
   ```bash
   nodemon index.js
   ```
6. **Install client dependencies**:
   ```bash
   cd ../client
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

### User Routes

1. **User Registration**
   - **Method**: `POST /api/user/register`
   - **Description**: Registers a new user.
   - **Request Body**:
     ```json
     { "name": "string", "email": "string", "password": "string" }
     ```
2. **User Login**
   - **Method**: `POST /api/user/login`
   - **Description**: Logs in a user and returns a JWT.
   - **Request Body**:
     ```json
     { "email": "string", "password": "string" }
     ```
3. **Add to Wishlist**
   - **Method**: `POST /api/user/wishlist/add`
   - **Description**: Adds a book to the user's wishlist.
   - **Request Body**:
     ```json
     { "userId": "ObjectId", "bookId": "ObjectId" }
     ```
4. **Remove from Wishlist**

   - **Method**: `POST /api/user/wishlist/remove`
   - **Description**: Removes a book from the user's wishlist.
   - **Request Body**:
     ```json
     { "userId": "ObjectId", "bookId": "ObjectId" }
     ```

5. **Get User Wishlist**

   - **Method**: `GET /api/user/wishlist/:userId`
   - **Description**: Fetches the wishlist for the specified user.
   - **Params**: `userId` (as part of URL path)

6. **Change Password**
   - **Method**: `POST /api/user/change-password`
   - **Description**: Changes the user password.
   - **Request Body**:
     ```json
     {
       "userId": "ObjectId",
       "currentPassword": "string",
       "newPassword": "string"
     }
     ```

### Book Routes

1. **Add Book**

   - **Method**: `POST /api/books/addBook`
   - **Description**: Adds a new book to the library.
   - **Request Body**: Book details including title, authors, publisher, etc.
     ```json
     {
       "title": "string",
       "subtitle": "string",
       "authors": ["string"],
       "publisher": "string",
       "publishedDate": "string",
       "description": "string",
       "industryIdentifiers": [{ "type": "string", "identifier": "string" }],
       "imageLinks": { "smallThumbnail": "string", "thumbnail": "string" },
       "language": "string"
     }
     ```

2. **List Books**

   - **Method**: `GET /api/books/list`
   - **Description**: Retrieves a list of books, with an optional search query.
   - **Query Params**: `searchedTitle` (optional)

3. **Get Book Details**

   - **Method**: `GET /api/books/:id`
   - **Description**: Retrieves detailed information about a specific book.
   - **Params**: `id` (as part of URL path)

4. **Borrow Book**

   - **Method**: `POST /api/books/borrow`
   - **Description**: Marks a book as borrowed by a user.
   - **Request Body**:
     ```json
     { "userId": "ObjectId", "bookId": "ObjectId" }
     ```

5. **Return Book**

   - **Method**: `POST /api/books/return`
   - **Description**: Marks a book as returned by the user.
   - **Request Body**:
     ```json
     { "userId": "ObjectId", "bookId": "ObjectId" }
     ```

6. **Get User Borrowing Records**
   - **Method**: `GET /api/books/borrowings/:userId`
   - **Description**: Retrieves borrowing records of a specific user.
   - **Params**: `userId` (as part of URL path)

## Database Schema

### User Schema

- **name**: `String` (required)  
  The name of the user.

- **email**: `String` (required, unique)  
  The email address of the user. Must be unique and formatted as a valid email.

- **password**: `String` (required)  
  The user's password. Stored securely using hashing.

- **wishlist**: `Array` of Book Object IDs  
  A list of books the user has added to their wishlist.

- **createdAt**: `Date`  
  The date and time when the user account was created. Defaults to the current date and time.

### Book Schema

- **title**: `String` (required)  
  The title of the book.

- **subtitle**: `String`  
  The subtitle of the book (if available).

- **authors**: `Array` of `String` (required)  
  A list of authors of the book. At least one author is required.

- **publisher**: `String`  
  The publisher of the book.

- **publishedDate**: `Date`  
  The date when the book was published.

- **description**: `String`  
  A brief description or summary of the book.

- **industryIdentifiers**: `Array` of ISBN IDs  
  A list of industry identifiers such as ISBN for the book.

- **imageLinks**: `Object`  
  Contains links to images for the book's cover.

  - **smallThumbnail**: `String` (required)  
    URL to the small-sized thumbnail of the book cover.
  - **thumbnail**: `String` (required)  
    URL to the full-sized thumbnail of the book cover.

- **language**: `String`  
  The language in which the book is written.

- **status**: `Object`  
  Tracks the borrowing status of the book.
  - **isReturned**: `Boolean` (default: true)  
    Indicates whether the book has been returned or not.
  - **borrower**: `User Object ID` (default: null)  
    Refers to the user who has currently borrowed the book. If null, the book is available for borrowing.
