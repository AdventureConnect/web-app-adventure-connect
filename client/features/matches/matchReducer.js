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
  reducers: {
    addMatch: (state, payload) => {
      state.matchList = matchList.push({
        name: "Pie",
        interests: ["hiking", "biking"],
        zipCode: "20015",
      });
    },
  },
});

// console.log(matchSlice);

export const { addMatch } = matchSlice.actions; // reducers property/obj is the action
export default matchSlice.reducer; //slice is the reducer
