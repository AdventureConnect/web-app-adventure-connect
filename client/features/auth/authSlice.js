/**
 * auth slice for state management
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// // persist user ID in local storage > need to implement saving user info to local storage @Chandler

const user_id = JSON.parse(localStorage.getItem("user_id"));
const user = JSON.parse(sessionStorage.getItem("userInfo"));

const initialState = {
  user: user ? user : null, // for user object
  user_id: user_id ? user_id : null,
  userToken: null, // for storing the JWT in cookies
  isError: null,
  isSuccess: false, // for monitoring the registration process.
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      // state.user = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
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
        state.isSuccess = true;
        state.user = action.payload.user;
      };
    [register.rejected],
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      };
    [login.pending],
      (state) => {
        state.isLoading = true;
      };
    [login.fulfilled],
      (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        sessionStorage.setItem("success", state.isSuccess);
        // sessionStorage.setItem("error", isError)
      };
    [login.rejected],
      (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      };
    [logout.fulfilled],
      (state, action) => {
        state.user = null;
      };
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
