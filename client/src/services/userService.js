import axios from "axios";
const API_URL = "http://localhost:5001/api/user";

class UserService {
  register(name, email, password) {
    return axios.post(API_URL + "/register", {
      name,
      email,
      password,
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }
}

export default new UserService();
