import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  matches: [],
  amount: 0,
  isLoading: true,
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
});

// console.log(matchSlice);

export default matchSlice.reducer;
