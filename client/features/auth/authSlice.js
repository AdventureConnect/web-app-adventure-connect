/**
 * auth slice for state management
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// // get user from local storage > need to implement saving user info to local storage @Chandler

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null, // for user object
  error: null,
  success: false, // for monitoring the registration process.
  isLoading: false,
  userToken: null, // for storing the JWT
  message: "",
};

export const register = () => {
  createAsyncThunk("auth/register", async (user, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  //async reducers go in "extra reducers"
  extraReducers: () => {
    [register.pending],
      (state) => {
        state.isLoading = true;
      };
    [register.fulfilled],
      (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
      };
    [register.rejected],
      (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      };
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
