/**
 * importing configureStore to add redux store to react App
 * Chandler
 */

import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "../features/matches/matchReducer";

export const store = configureStore({
  reducer: {
    matches: matchReducer,
  },
});
