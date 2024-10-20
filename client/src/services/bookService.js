import axios from "axios";
const API_URL = "http://localhost:5001/api/books";

class BookService {
  getBooks(searchTerm = "") {
    return axios.get(API_URL + "/list", {
      params: { searchedTitle: searchTerm },
    });
  }

  getBookDetail(id) {
    return axios.get(API_URL + "/" + id);
  }

  borrowBook(userId, bookId) {
    return axios.post(API_URL + "/borrow", {
      userId,
      bookId,
    });
  }

  returnBook(userId, bookId) {
    return axios.post(API_URL + "/return", {
      userId,
      bookId,
    });
  }

  getBorrowingRecords(userId) {
    return axios.get(API_URL + "/borrowings/" + userId);
  }
}

export default new BookService();
