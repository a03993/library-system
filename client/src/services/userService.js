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

  addToWishlist(userId, bookId) {
    return axios.post(API_URL + "/wishlist/add", { userId, bookId });
  }

  getWishlist(userId) {
    return axios.get(API_URL + "/wishlist/" + userId);
  }

  removeBookFromWishlist(userId, bookId) {
    return axios.post(API_URL + "/wishlist/remove", { userId, bookId });
  }

  changePassword(userId, currentPassword, newPassword) {
    return axios.post(API_URL + "/change-password", {
      userId,
      currentPassword,
      newPassword,
    });
  }
}

export default new UserService();
