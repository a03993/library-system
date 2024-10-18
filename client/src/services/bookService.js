import axios from "axios";
const API_URL = "http://localhost:5001/api/books";

class BookService {
  getBooks() {
    return axios.get(API_URL + "/list");
  }

  getBookDetail(id) {
    return axios.get(API_URL + "/" + id);
  }
}

export default new BookService();
