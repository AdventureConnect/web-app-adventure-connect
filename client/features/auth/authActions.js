import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const backendURL = "http://127.0.0.1:3000";

const registerUser = () => {
  createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        await axios.post(
          `${backendURL}/api/signup`,
          { name, email, password },
          config
        );
      } catch (error) {
        // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );
};

export default registerUser;
