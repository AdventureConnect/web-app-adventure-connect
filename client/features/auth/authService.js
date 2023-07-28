import axios from "axios";
const API_URL_SIGNUP = "/api/signup";
const API_URL_LOGIN = "/api/login";

// register user

const register = async (userData) => {
  const response = await axios.post(API_URL_SIGNUP, userData);
  console.log("response.data: ", response.data);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// user logout
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
