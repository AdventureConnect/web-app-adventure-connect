import { createSlice, current } from "@reduxjs/toolkit";
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
      // total = total + 1;
    },
    //updating state to get rid of current match
    removeMatch: (state, { payload }) => {
      const currentState = current(state);
      const newMatchList = currentState.matchList.filter(
        (user) => user.name !== payload.name
      );
      return {
        ...state,
        matchList: [...newMatchList],
      };
    },
  },
});
// console.log("user: ", user);
// return { ...state, matchList };

// console.log(matchSlice);
/**
 * eporting actions
 */
export const { addMatch, removeMatch } = matchSlice.actions;

/**
 * exporting reducers
 */

export default matchSlice.reducer;
