import { createSlice } from "@reduxjs/toolkit";
import userList from "../../match-components/userlist.js";
import matchList from "../../match-components/matchList.js";

const initialState = {
  matchList: matchList,
  total: 0,
  // isLoading: true,
};

const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    // add a match to state, passing in the payload of information from the liked user profile
    addMatch: ({ matchList, total }, { payload }) => {
      matchList = matchList.push(payload);
      total = total + 1;
    },
    removeMatch: ({ matchList, total }, { payload }) => {
      // need to update to search and remove
      matchList = matchList.filter((user) => user !== payload);
    },
  },
});

// console.log(matchSlice);
/**
 * eporting actions
 */
export const { addMatch, removeMatch } = matchSlice.actions;

/**
 * exporting reducers
 */

export default matchSlice.reducer;
