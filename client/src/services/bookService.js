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
}

const bookServiceInstance = new BookService();
export default bookServiceInstance;
