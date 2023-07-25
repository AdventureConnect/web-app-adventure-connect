import axios from "axios";
const API_URL = "/api/signup";

// register user

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log("response.data: ", response.data);
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
  logout,
};

export default authService;
