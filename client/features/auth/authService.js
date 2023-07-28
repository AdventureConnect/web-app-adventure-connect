import axios from "axios";
const API_URL_SIGNUP = "/api/signup";
const API_URL_LOGIN = "/api/login";

const API_URL_USER = "/api/user";

// register user

const getUser = async (user_id) => {
  const response = await axios.get(API_URL_USER);
  if (response.data) return response.data;
  else return "User not found";
};

const register = async (userData) => {
  const response = await axios.post(API_URL_SIGNUP, userData);
  console.log("response.data: ", response.data.user._id);
  if (response.data) {
    localStorage.setItem("user_id", JSON.stringify(response.data.user._id));
  }
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);
  console.log("response.data: ", response.data.user);
  if (response.data) {
    localStorage.setItem("user_id", JSON.stringify(response.data.user._id));
    const userInfo = {
      name: response.data.user.name,
      bio: response.data.user.bio,
      interests: response.data.user.interests,
      matches: response.data.user.matches,
    };
    sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
  }
  return response.data;
};

// user logout
const logout = async () => {
  const response = await axios.post("/api/logout");
  localStorage.clear();
  sessionStorage.clear();
};

const authService = {
  register,
  login,
  getUser,
  logout,
};

export default authService;
