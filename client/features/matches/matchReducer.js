import { createSlice } from "@reduxjs/toolkit";
import matchList from "../../match-components/matchlist.js";

const initialState = {
  matchList: matchList,
  total: 5,
  isLoading: true,
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
});

// console.log(matchSlice);

export default matchSlice.reducer;
